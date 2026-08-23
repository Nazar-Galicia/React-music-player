import type {FC} from "react";
import MusicLyricsVisualiser from "../../components/MusicLyricsVisualiser/MusicLyricsVisualiser.tsx";
import AudioContextProvider from "../../context/AudioContext.tsx";

const Visualiser: FC = () => {
    return (
        <div className='lyrics'>
            <AudioContextProvider>
                <MusicLyricsVisualiser />
            </AudioContextProvider>
        </div>
    )
}

export default Visualiser;