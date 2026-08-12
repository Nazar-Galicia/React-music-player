import {useEffect, useState} from "react";
import {musicAPI} from "../api/musicAPI.ts";

export const useFindMusic = (query: string) => {
    const [tracks, setTracks] = useState<TrackData | null>(null)

    useEffect(() => {
        console.log(query)
        if (query.trim()) {
            musicAPI.getSongData(query).then(data => {
                setTracks(data)
            })
        }
    }, [query]);

    return {
        tracks,
    }
}