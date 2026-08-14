import {type FC, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    const audio = new Audio(audioUrl)

    const {
        visualiserRef,
    } = useAudioVisualiser()

    useEffect(() => {
        audio?.play()

        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, []);

    return (
        <div className='music-lyrics-visualisator'>
            <canvas ref={visualiserRef}></canvas>
        </div>
    )
}

export default MusicLyricsVisualiser