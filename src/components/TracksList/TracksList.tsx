import {type FC, useEffect, useState} from "react";
import {musicMetaAPI} from "../../api/musicMetaAPI.ts";

interface TracksListProps {
    query: string;
}

const TracksList: FC<TracksListProps> = (props) => {
    const {
        query,
    } = props

    const [tracks, setTracks] = useState(null)

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
        <div className='tracks-list'></div>
    )
}

export default TracksList