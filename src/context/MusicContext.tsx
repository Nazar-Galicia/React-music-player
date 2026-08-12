import {createContext, type FC, type ReactNode, useEffect, useMemo, useState} from "react";
import {musicAPI} from "../api/musicAPI.ts";

export type TrackObject = {
    id: string,
    artwork: {'150x150': string},
    title: string,
    user: {name: string},
    duration: number
    stream: {url: string},
}

interface MusicContextProps {
    tracks: TrackObject[],
    setInputQuery: (query: string) => void,
    inputQuery: string,
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

    const [tracks, setTracks] = useState<TrackObject[]>([])

    useEffect(() => {
        if (inputQuery.trim()) {
            musicAPI.getSongData(inputQuery, 1).then((data) => {
                setTracks(data.data)
            })
        }
    }, [inputQuery]);

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    interface MusicContextData {
        setInputQuery: (query: string) => void
        tracks: TrackObject[],
        inputQuery: string,
    }

    const value: MusicContextData = useMemo(() => {
        return {
            setInputQuery,
            tracks,
            inputQuery,
        }
    }, [
        setInputQuery,
        tracks,
        inputQuery,
    ])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider