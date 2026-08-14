import {type FC} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    const {
        visualiserRef,
    } = useAudioVisualiser(audioUrl)

    return (
        <div className='music-lyrics-visualisator'>
            <canvas ref={visualiserRef}></canvas>
        </div>
    )
}

export default MusicLyricsVisualiser