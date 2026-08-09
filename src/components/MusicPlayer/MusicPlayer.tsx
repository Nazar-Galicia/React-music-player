import {type FC, useEffect, useState} from "react";
import './MusicPlayer.css'
import Intro from "../Intro/Intro.tsx";

const MusicPlayer: FC = () => {
    const isIntro: string = localStorage.getItem('isIntro') || 'false'
    const [startSite, setStartSite] = useState<boolean>(false)

    const startIntro = (): void => {
        setStartSite(true)
        document.removeEventListener('click', startIntro)
    }

    useEffect(() => {
        if (isIntro === 'false') {
            document.addEventListener('click', startIntro)
        }

        return () => document.removeEventListener('click', startIntro)
    }, [])

    return (
        <div className='music-player'>
            <p className={`initial-text ${startSite || isIntro === 'true' ? 'initial-text-hide' : ''}`}>Click to start</p>

            <Intro />
        </div>
    )
}

export default MusicPlayer