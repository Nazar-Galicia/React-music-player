import {type ChangeEvent, type FC, useCallback, useEffect, useRef, useState} from "react";
import './MusicController.css'
import {useAudio} from "../../hooks/useAudio.ts";
import playIcon from '../../assets/icons/playAudio.svg'
import pauseIcon from '../../assets/icons/pauseAudio.svg'

const MusicController: FC = () => {
    let hideTimer: number;
    const { audio, duration } = useAudio()

    const controllerRef = useRef<HTMLDivElement | null>(null)
    const bottomGradientRef = useRef<HTMLDivElement | null>(null)

    const mouseMoveHandler = (event: MouseEvent) => {
        const mouseY = event.clientY
        clearTimeout(hideTimer)

        if (mouseY >= window.innerHeight * 0.8) {
            controllerRef.current && controllerRef.current.classList.add('active-controller')
            bottomGradientRef.current && bottomGradientRef.current.classList.add('active-gradient')
        } else {
            hideTimer = setTimeout(() => {
                controllerRef.current && controllerRef.current.classList.remove('active-controller')
                bottomGradientRef.current && bottomGradientRef.current.classList.remove('active-gradient')
            }, 600)
        }
    }

    const mouseLeaveHandler = () => {
        hideTimer = setTimeout(() => {
            controllerRef.current && controllerRef.current.classList.remove('active-controller')
            bottomGradientRef.current && bottomGradientRef.current.classList.remove('active-gradient')
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

    const [songProgress, setSongProgress] = useState<number>(0)
    const [songVolume, setSongVolume] = useState<number>(Number(localStorage.getItem('songVolume')) || 70);

    const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
        setSongVolume(Number(event.target.value))
    }

    useEffect(() => {
        if (audio.current) {
            audio.current.volume = songVolume / 100
        }
        localStorage.setItem('songVolume', String(songVolume))
    }, [songVolume]);

    const frameId = useRef<number>(0);

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

        frameId.current = requestAnimationFrame(handleSongCurrentTime)
    }

    const changeSongCurrentTime = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setSongProgress(value);

        if (audio.current && duration > 0) {
            audio.current.currentTime = (value / 100) * duration;

            if (audio.current.paused) {
                audio.current.play().then(() => {
                    setIsPlaying(true)
                })
            }
        }
    }

    useEffect(() => {
        frameId.current = requestAnimationFrame(handleSongCurrentTime)
        console.log(duration)
        return () => {
            if (frameId.current !== null) {
                cancelAnimationFrame(frameId.current);
            }
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

    const formatSongTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div ref={controllerRef} className="music-controller active-controller">
                <div className="music-controller__timeline">
                    <span className="music-controller__time">{
                        audio.current ? formatSongTime(audio.current.currentTime) : '00:00'
                    }</span>

                    <input
                        className="music-controller__range"
                        type="range"
                        min="0"
                        max="100"
                        step="0.01"
                        value={songProgress}
                        onChange={changeSongCurrentTime}
                    />

                    <span className="music-controller__time">{formatSongTime(duration)}</span>
                </div>

                <div className="music-controller__controls">

                    <button
                        onClick={() => {
                            if (audio.current) {
                                audio.current.currentTime -= 10

                                if (audio.current.paused) {
                                    audio.current.play().then(() => {
                                        setIsPlaying(true)
                                    })
                                }
                            }
                        }}
                        className="music-controller__button music-controller__button--seek"
                    >
                        <span>↶</span>
                        <small>10</small>
                    </button>

                    <button onClick={playAudio} className="music-controller__button music-controller__button--play">
                        <img src={isPlaying ? pauseIcon : playIcon} alt=""/>
                    </button>

                    <button
                        onClick={() => {
                            if (audio.current) {
                                audio.current.currentTime += 10

                                if (audio.current.paused) {
                                    audio.current.play().then(() => {
                                        setIsPlaying(true)
                                    })
                                }
                            }
                        }}
                        className="music-controller__button music-controller__button--seek"
                    >
                        <span>↷</span>
                        <small>10</small>
                    </button>

                    <button onClick={restartAudio} className="music-controller__button music-controller__button--restart">
                        ↻
                    </button>

                    <div className="music-controller__volume">
                        <svg
                            className="music-controller__volume-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 9V15H8L13 19V5L8 9H4Z"
                                fill="currentColor"
                            />
                            <path
                                d="M16 9C17 10 17 14 16 15"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                            <path
                                d="M18.5 6.5C21 9 21 15 18.5 17.5"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>

                        <input
                            className="music-controller__volume-range"
                            type="range"
                            min="0"
                            max="100"
                            value={songVolume}
                            onChange={changeVolume}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div ref={bottomGradientRef} className="bottom-gradient active-gradient" />
        </>
    )
}

export default MusicController