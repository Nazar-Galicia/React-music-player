import {type FC, useEffect, useState} from "react";
import {musicMetaAPI} from "../../api/musicMetaAPI.ts";
import './TrackList.css'
import TrackCard from "../TrackCard/TrackCard.tsx";

interface TracksListProps {
    query: string;
}
type TrackObject = {
    trackId: number,
    artworkUrl100: string,
    trackName: string,
    artistName: string,
    trackTimeMillis: number
}
type TrackData = {
    resultCount: number
    results: TrackObject[]
}
const TracksList: FC<TracksListProps> = (props) => {
    const {
        query,
    } = props

    const [tracks, setTracks] = useState<TrackData | null>(null)

    useEffect(() => {
        console.log(query)
        musicMetaAPI.getSongData(query).then(data => {
            setTracks(data)
        })
    }, [query]);

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    return (
        <ul className={`tracks-list ${tracks?.results.length === 0 ? 'track-list-hidden' : null}`}>
            {
                tracks && tracks.results.map((song) => (
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