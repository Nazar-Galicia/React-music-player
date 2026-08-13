import {type FC, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import {useAudioVisualiser} from "../../hooks/useAudioVisualiser.ts";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    // const song = useRef<HTMLAudioElement | null>(new Audio(audioUrl))

    // if(!song) throw new Error('song not found')

    const {
        visualiserRef,
    } = useAudioVisualiser(audioUrl)

    // useEffect(() => {
    //     if (song.current) {
    //         song.current?.play().catch((error) => {
    //             console.log(error)
    //         })
    //     }
    //
    //     return () => {
    //         if (song.current) {
    //             song.current?.pause()
    //             song.current.currentTime = 0
    //         }
    //     }
    // }, []);

    return (
        <div className='music-lyrics-visualisator'>
            <canvas ref={visualiserRef}></canvas>
        </div>
    )
}

export default MusicLyricsVisualiser