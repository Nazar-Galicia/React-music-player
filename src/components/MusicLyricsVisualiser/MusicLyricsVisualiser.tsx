import {type FC} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";
import './MusicVisualiser.css'

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const {
        audioUrl,
        thumbnail,
    } = location.state

    const {
        visualiserRef,
    } = useAudioVisualiser(audioUrl)

    return (
        <div className='music-lyrics-visualisator'>
            <img className='song-thumbnail' src={thumbnail} alt="song-thumbnail"/>
            <canvas className='visualiser__canvas' ref={visualiserRef}></canvas>
        </div>
    )
}

export default MusicLyricsVisualiser