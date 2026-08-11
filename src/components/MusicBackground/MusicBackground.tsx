import {type FC, useContext} from "react";
import {useMusicBackground} from "../../hooks/useMusicBackground.ts";
import MusicBackgroundLine from "../MusicBackgroundLine/MusicBackgroundLine.tsx";
import './MusicBackground.css'
import {IntroContext} from "../../context/IntroContext.tsx";

const MusicBackground: FC = () => {
    const introContext = useContext(IntroContext)

    if (!introContext) {
        throw new Error('intro context is missing')
    }

    const {
        isIntro,
        startSite,
    } = introContext

    const {
        lines,
        removeLine,
    } = useMusicBackground(isIntro, startSite)

    return (
        <div className='music-background'>
            {
                lines?.map((line) => (
                    <MusicBackgroundLine key={line.id} lineObj={line} removeLine={removeLine} />
                ))
            }
        </div>
    )
}

export default MusicBackground