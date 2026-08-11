import type {FC} from "react";
import {useMusicBackground} from "../../hooks/useMusicBackground.ts";
import MusicBackgroundLine from "../MusicBackgroundLine/MusicBackgroundLine.tsx";
import './MusicBackground.css'

interface MusicBackgroundProps {
    startSite: boolean;
    isIntro: string;
}

const MusicBackground: FC<MusicBackgroundProps> = (props) => {
    const {
        startSite,
        isIntro,
    } = props

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