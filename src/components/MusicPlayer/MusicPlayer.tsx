import {type FC, useEffect} from "react";
import './MusicPlayer.css'

const MusicPlayer: FC = () => {
    const isIntro: string = localStorage.getItem('isIntro') || 'false'
    let startSite: boolean = false

    const startIntro = (): void => {
        startSite = true
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
            <p className='initial-text'>Click to start</p>
        </div>
    )
}

export default MusicPlayer