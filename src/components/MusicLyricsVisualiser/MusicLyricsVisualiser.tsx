import {type FC} from "react";
import {useLocation} from "react-router-dom";
import './MusicVisualiser.css'
import MusicController from "../MusicController/MusicController.tsx";
import {useAudio} from "../../hooks/useAudio.ts";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const {
        thumbnail,
    } = location.state

    const { songThumbnailRef, visualiserRef } = useAudio()

    return (
        <div className='music-lyrics-visualisator'>
            <img ref={songThumbnailRef} className='song-thumbnail' src={thumbnail} alt="song-thumbnail"/>
            <canvas className='visualiser__canvas' ref={visualiserRef}></canvas>
            <MusicController />
        </div>
    )
}

export default MusicLyricsVisualiser