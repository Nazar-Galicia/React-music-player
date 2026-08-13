import {type FC, useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const MusicLyricsVisualiser: FC = () => {
    const location = useLocation();

    const { audioUrl } = location.state

    const song = useRef<HTMLAudioElement | null>(new Audio(audioUrl))

    useEffect(() => {
        if (song.current) {
            song.current?.play().catch((error) => {
                console.log(error)
            })
        }

        return () => {
            if (song.current) {
                song.current?.pause()
                song.current.currentTime = 0
            }
        }
    }, []);

    return (
        <div className='music-lyrics-visualisator'></div>
    )
}

export default MusicLyricsVisualiser