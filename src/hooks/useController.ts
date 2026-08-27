import {type ChangeEvent, type RefObject, useCallback, useEffect, useRef, useState} from "react";

export const useController = (
    audio: RefObject<HTMLAudioElement | null>,
    duration: number,
) => {
    let hideTimer: number;

    const controllerRef = useRef<HTMLDivElement | null>(null)
    const bottomGradientRef = useRef<HTMLDivElement | null>(null)

    const showHideController = (event: PointerEvent | MouseEvent) => {
        const mouseY = event.clientY
        clearTimeout(hideTimer)

        controllerRef.current && controllerRef.current.classList.add('active-controller')
        bottomGradientRef.current && bottomGradientRef.current.classList.add('active-gradient')

        if (mouseY <= window.innerHeight * 0.8) {
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

    if (audio.current) {
        audio.current.volume = songVolume / 100
    }

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
        document.addEventListener('mousemove', showHideController)
        document.addEventListener('mouseleave', mouseLeaveHandler)

        return () => {
            document.removeEventListener('mousemove', showHideController)
            document.removeEventListener('mouseleave', mouseLeaveHandler)
        }
    }, []);

    return {
        playAudio,
        restartAudio,
        songProgress,
        changeSongCurrentTime,
        changeVolume,
        controllerRef,
    }
}