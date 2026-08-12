import {useEffect, useState} from "react";
import {musicAPI} from "../api/musicAPI.ts";
import type {TrackObject} from "../context/MusicContext.tsx";
import {lyricsSearchAPI} from "../api/lyricsSearchAPI.ts";

export const useFindMusic = (query: string) => {
    const [tracks, setTracks] = useState<TrackObject[]>([])

    useEffect(() => {
        console.log(query)
        if (query.trim()) {
            musicAPI.getSongData(query).then(data => {
                setTracks([])
                data.data.forEach((song: TrackObject) => {
                    lyricsSearchAPI.searchLyrics(song.title).then((lyrics) => {
                        if (lyrics.length !== 0) {
                            setTracks(prev => [...prev, song])
                        }
                    })
                })
            })
        }
    }, [query]);

    useEffect(() => {
        console.log(tracks);
    }, [tracks]);

    return {
        tracks,
    }
}