import type {FC} from "react";
import {useMusicBackground} from "../../hooks/useMusicBackground.ts";
import MusicBackgroundLine from "../MusicBackgroundLine/MusicBackgroundLine.tsx";

const MusicBackground: FC = () => {
    const {
        lines,
        setExitLine,
    } = useMusicBackground()

    return (
        <div className='music-background'>
            {
                lines?.map((line) => (
                    <MusicBackgroundLine lineObj={line} setExitLine={setExitLine} />
                ))
            }
        </div>
    )
}

export default MusicBackground