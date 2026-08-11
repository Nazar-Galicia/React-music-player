import type {FC} from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer.tsx";
import IntroContextProvider from "../../context/IntroContext.tsx";

const Home: FC = () => {
    return (
        <div className='home'>
            <IntroContextProvider>
                <MusicPlayer />
            </IntroContextProvider>
        </div>
    )
}

export default Home