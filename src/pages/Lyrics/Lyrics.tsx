import type {FC} from "react";
import MusicLyricsVisualiser from "../../components/MusicLyricsVisualiser/MusicLyricsVisualiser.tsx";

const Lyrics: FC = () => {
    return (
        <div className='lyrics'>
            <MusicLyricsVisualiser />
        </div>
    )
}

export default Lyrics;