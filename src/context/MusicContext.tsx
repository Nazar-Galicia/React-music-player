import {createContext, type FC, type ReactNode, useEffect, useMemo, useState} from "react";
import {musicMetaAPI} from "../api/musicMetaAPI.ts";

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

interface MusicContextProps {
    tracks: TrackData | null,
    setInputQuery: (query: string) => void,
}

interface MusicProviderProps {
    children: ReactNode,
}

export const MusicContext = createContext<MusicContextProps | null>(null);

const MusicContextProvider: FC<MusicProviderProps> = (props) => {
    const {
        children,
    } = props

    const [inputQuery, setInputQuery] = useState<string>('')

    const [tracks, setTracks] = useState<TrackData | null>(null)

    useEffect(() => {
        console.log(inputQuery)
        musicMetaAPI.getSongData(inputQuery).then(data => {
            setTracks(data)
        })
    }, [inputQuery]);

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    interface MusicContextData {
        setInputQuery: (query: string) => void
        tracks: TrackData | null,
    }

    const value: MusicContextData = useMemo(() => {
        return {
            setInputQuery,
            tracks,
        }
    }, [
        setInputQuery,
        tracks,
    ])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider