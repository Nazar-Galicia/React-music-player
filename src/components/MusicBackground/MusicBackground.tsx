import type {FC} from "react";
import {useMusicBackground} from "../../hooks/useMusicBackground.ts";
import MusicBackgroundLine from "../MusicBackgroundLine/MusicBackgroundLine.tsx";
import './MusicBackground.css'

const MusicBackground: FC = () => {
    const {
        lines,
        removeLine,
    } = useMusicBackground()

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