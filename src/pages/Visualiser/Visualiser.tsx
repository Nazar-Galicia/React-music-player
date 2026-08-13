import type {FC} from "react";
import MusicLyricsVisualiser from "../../components/MusicLyricsVisualiser/MusicLyricsVisualiser.tsx";

const Visualiser: FC = () => {
    return (
        <div className='lyrics'>
            <MusicLyricsVisualiser />
        </div>
    )
}

export default Visualiser;