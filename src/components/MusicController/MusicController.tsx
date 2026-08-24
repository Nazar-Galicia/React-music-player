import {type FC, useCallback, useEffect, useRef, useState} from "react";
import './MusicController.css'
import {useAudio} from "../../hooks/useAudio.ts";
import playIcon from '../../assets/icons/playAudio.svg'
import pauseIcon from '../../assets/icons/pauseAudio.svg'

const MusicController: FC = () => {
    let hideTimer: number;
    const { audio, duration } = useAudio()

    const controllerRef = useRef<HTMLDivElement | null>(null)

    const mouseMoveHandler = (event: MouseEvent) => {
        const mouseY = event.clientY
        clearTimeout(hideTimer)

        if (mouseY >= window.innerHeight * 0.8) {
            controllerRef.current && controllerRef.current.classList.add('active-controller')
        } else {
            hideTimer = setTimeout(() => {
                controllerRef.current && controllerRef.current.classList.remove('active-controller')
            }, 600)
        }
    }

    const mouseLeaveHandler = () => {
        hideTimer = setTimeout(() => {
            controllerRef.current && controllerRef.current.classList.remove('active-controller')
        }, 600)
    }

    const [isPlaying, setIsPlaying] = useState<boolean>(true)

    const playAudio = useCallback(() => {
        if (audio.current) {
            setIsPlaying(prev => !prev)
        }
    }, [])

    const restartAudio = useCallback(() => {
        if (audio.current) {
            audio.current.currentTime = 0;
            audio.current.play().then(() => {
                setIsPlaying(true)
            })
        }
    }, [])

    useEffect(() => {
        if (audio.current) {
            !isPlaying ? audio.current.pause() : audio.current.play()
        }
    }, [isPlaying]);

    let frameId: number;

    const [songProgress, setSongProgress] = useState<number>(0)

    const handleSongCurrentTime = () => {
        if (
            audio.current &&
            audio.current.currentTime > 0 &&
            !audio.current.paused &&
            !audio.current.ended &&
            audio.current.readyState > 2
        ) {
            setSongProgress((audio.current.currentTime / duration) * 100)
        }

        frameId = requestAnimationFrame(handleSongCurrentTime)
    }

    useEffect(() => {
        handleSongCurrentTime()
        console.log(duration)
        return () => {
            cancelAnimationFrame(frameId)
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseleave', mouseLeaveHandler)

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
            document.removeEventListener('mouseleave', mouseLeaveHandler)
        }
    }, []);

    return (
        <div ref={controllerRef} className="music-controller active-controller">
            <div className="music-controller__timeline">
                <span className="music-controller__time">0:00</span>

                <input
                    className="music-controller__range"
                    type="range"
                    min="0"
                    max="100"
                    value={songProgress}
                    readOnly
                />

                <span className="music-controller__time">3:42</span>
            </div>

            <div className="music-controller__controls">

                <button className="music-controller__button music-controller__button--seek">
                    <span>↶</span>
                    <small>10</small>
                </button>

                <button onClick={playAudio} className="music-controller__button music-controller__button--play">
                    <img src={isPlaying ? pauseIcon : playIcon} alt=""/>
                </button>

                <button className="music-controller__button music-controller__button--seek">
                    <span>↷</span>
                    <small>10</small>
                </button>

                <button onClick={restartAudio} className="music-controller__button music-controller__button--restart">
                    ↻
                </button>

            </div>
        </div>
    )
}

export default MusicController