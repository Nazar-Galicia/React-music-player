import {type FC} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";
import './MusicVisualiser.css'
import MusicController from "../MusicController/MusicController.tsx";
import AudioContextProvider from "../../context/AudioContext.tsx";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const {
        audioUrl,
        thumbnail,
    } = location.state

    const {
        visualiserRef,
        songThumbnailRef,
    } = useAudioVisualiser(audioUrl)

    return (
        <AudioContextProvider>
            <div className='music-lyrics-visualisator'>
                <img ref={songThumbnailRef} className='song-thumbnail' src={thumbnail} alt="song-thumbnail"/>
                <canvas className='visualiser__canvas' ref={visualiserRef}></canvas>
                <MusicController />
            </div>
        </AudioContextProvider>
    )
}

export default MusicLyricsVisualiser