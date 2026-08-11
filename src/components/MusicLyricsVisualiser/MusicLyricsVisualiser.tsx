import {type FC, useEffect} from "react";
import {useParams} from "react-router-dom";

const MusicLyricsVisualiser: FC = () => {
    const {
        artist,
        trackName,
    } = useParams()

    useEffect(() => {
        console.log(artist, trackName)
    }, [])

    return (
        <div className='music-lyrics-visualisator'></div>
    )
}

export default MusicLyricsVisualiser