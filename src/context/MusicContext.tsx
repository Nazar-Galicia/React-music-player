import {createContext, type FC, type ReactNode, useEffect, useMemo, useState} from "react";
import {musicAPI} from "../api/musicAPI.ts";

type TrackObject = {
    id: string,
    artwork: {'150x150': string},
    title: string,
    user: {name: string},
    duration: number
}

type TrackData = {
    data: TrackObject[]
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
        musicAPI.getSongData(inputQuery).then(data => {
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