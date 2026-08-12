import {createContext, type FC, type ReactNode, useEffect, useMemo, useState} from "react";
import {useFindMusic} from "../hooks/useFindMusic.tsx";

type TrackObject = {
    id: string,
    artwork: {'150x150': string},
    title: string,
    user: {name: string},
    duration: number
    stream: {url: string},
}

type TrackData = {
    data: TrackObject[]
}

interface MusicContextProps {
    tracks: TrackData | null,
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

    const {
        tracks,
    } = useFindMusic(inputQuery)

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    interface MusicContextData {
        setInputQuery: (query: string) => void
        tracks: TrackData | null,
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