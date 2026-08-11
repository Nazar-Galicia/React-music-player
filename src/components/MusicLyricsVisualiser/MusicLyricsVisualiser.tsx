import {type FC, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

const MusicLyricsVisualiser: FC = () => {
    const {
        artist,
        trackName,
    } = useParams()

    const location = useLocation();

    const { audioUrl } = location.state

    useEffect(() => {
        console.log(artist, trackName)
    }, [])

    return (
        <div className='music-lyrics-visualisator'>
            <audio src={audioUrl} autoPlay></audio>
        </div>
    )
}

export default MusicLyricsVisualiser