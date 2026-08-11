import {type FC, useContext} from "react";
import './MusicPlayer.css'
import Intro from "../Intro/Intro.tsx";
import HeroSection from "../HeroSection/HeroSection.tsx";
import MusicBackground from "../MusicBackground/MusicBackground.tsx";
import {IntroContext} from "../../context/IntroContext.tsx";

const MusicPlayer: FC = () => {

    const introContext = useContext(IntroContext)

    if (!introContext) {
        throw new Error('intro context is missing')
    }

    const {
        isIntro,
        startSite,
    } = introContext

    return (
        <div className='music-player'>
            <MusicBackground />

            <p className={`initial-text ${startSite || isIntro === 'true' ? 'initial-text-hide' : ''}`}>Click to start</p>

            <Intro />

            <HeroSection />
        </div>
    )
}

export default MusicPlayer