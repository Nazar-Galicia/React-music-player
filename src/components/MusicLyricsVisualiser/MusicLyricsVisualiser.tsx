import {type FC, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    const audio = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const newAudio = new Audio(audioUrl)

        audio.current = newAudio

        if (newAudio) {
            newAudio.play().catch(error => console.log(error.message))
        }

        return () => {
            if (newAudio) {
                newAudio.pause()
                newAudio.currentTime = 0
                audio.current = null
            }
        }
    }, []);

    const {
        visualiserRef,
    } = useAudioVisualiser()

    return (
        <div className='music-lyrics-visualisator'>
            <canvas ref={visualiserRef}></canvas>
        </div>
    )
}

export default MusicLyricsVisualiser