import {type FC, useContext, useEffect, useRef} from "react";
import './Intro.css'
import whisperVoice from '@/assets/sounds/whisper-listen-everywhere.mp3'
import boomSwoosh from '@/assets/sounds/boom-swoosh.mp3'
import shortBass from '@/assets/sounds/short-bass.mp3'
import {IntroContext} from "../../context/IntroContext.tsx";

const Intro: FC = () => {
    const introContext = useContext(IntroContext)

    if (!introContext) {
        throw new Error('intro context is missing')
    }

    const {
        isIntro,
        startSite,
    } = introContext

    const whisper: HTMLAudioElement | null = new Audio(whisperVoice)
    const boom: HTMLAudioElement | null = new Audio(boomSwoosh)
    const bass: HTMLAudioElement | null = new Audio(shortBass)

    const listenRef = useRef<HTMLSpanElement | null>(null)
    const everywhereRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (startSite === true && isIntro === 'false') {
            setTimeout(() => {
                listenRef.current?.classList.remove('intro-word-hidden')
                whisper?.play()
                bass?.play()

                setTimeout(() => {
                    everywhereRef.current?.classList.remove('intro-word-hidden')

                    setTimeout(() => {
                        boom?.play()
                    }, 1000)

                    setTimeout(() => {
                        listenRef.current?.classList.add('intro-word-hidden')
                        everywhereRef.current?.classList.add('intro-word-hidden')

                        localStorage.setItem('isIntro', 'true')
                    }, 1750)
                }, 2000)
            }, 1000)
        }
    }, [startSite])

    return (
        <p className='intro-title'>
            <span ref={listenRef} className='intro-listen intro-word-hidden'>Listen. </span>
            <span ref={everywhereRef} className='intro-everywhere intro-word-hidden'>Everywhere.</span>
        </p>
    )
}

export default Intro