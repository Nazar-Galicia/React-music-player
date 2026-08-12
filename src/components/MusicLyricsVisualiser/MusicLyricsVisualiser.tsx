import {type FC} from "react";
import {useLocation} from "react-router-dom";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    return (
        <div className='music-lyrics-visualisator'>
            <audio src={audioUrl} autoPlay></audio>
        </div>
    )
}

export default MusicLyricsVisualiser