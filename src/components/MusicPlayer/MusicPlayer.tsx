import {type FC, useEffect, useRef} from "react";
import './MusicPlayer.css'

const MusicPlayer: FC = () => {
    const isIntro: string = localStorage.getItem('isIntro') || 'false'
    const startSite = useRef<boolean>(false)

    const startIntro = (): void => {
        startSite.current = true
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
            <p className={`initial-text ${startSite.current ? 'initial-text-hide' : ''}`}>Click to start</p>
        </div>
    )
}

export default MusicPlayer