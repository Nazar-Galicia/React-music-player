import type {FC} from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer.tsx";

const Home: FC = () => {
    return (
        <div className='home'>
            <MusicPlayer />
        </div>
    )
}

export default Home