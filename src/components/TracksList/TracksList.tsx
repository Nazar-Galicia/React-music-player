import {type FC, useContext} from "react";
import './TrackList.css'
import TrackCard from "../TrackCard/TrackCard.tsx";
import {MusicContext} from "../../context/MusicContext.tsx";

type TrackObject = {
    trackId: number,
    artworkUrl100: string,
    trackName: string,
    artistName: string,
    trackTimeMillis: number
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
        <ul className={`tracks-list ${tracks?.results.length === 0 ? 'track-list-hidden' : null}`}>
            {
                tracks && tracks.results.map((song: TrackObject) => (
                    <TrackCard
                        key={song.trackId}
                        image={song.artworkUrl100}
                        title={song.trackName}
                        artist={song.artistName}
                        duration={song.trackTimeMillis}
                    />
                ))
            }
        </ul>
    )
}

export default TracksList