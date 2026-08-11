import {type FC, useContext} from "react";
import './TrackList.css'
import TrackCard from "../TrackCard/TrackCard.tsx";
import {MusicContext} from "../../context/MusicContext.tsx";

type TrackObject = {
    id: string,
    artwork: {'150x150': string},
    title: string,
    user: {name: string},
    duration: number
}

const TracksList: FC = () => {

    const musicContext = useContext(MusicContext)

    if (!musicContext) {
        throw new Error('music context is missing')
    }

    const {
        tracks,
    } = musicContext

    return (
        <ul className={`tracks-list ${tracks?.data.length === 0 ? 'track-list-hidden' : null}`}>
            {
                tracks && tracks.data.map((song: TrackObject) => (
                    <TrackCard
                        key={song.id}
                        image={song.artwork['150x150']}
                        title={song.title}
                        artist={song.user.name}
                        duration={song.duration}
                    />
                ))
            }
        </ul>
    )
}

export default TracksList