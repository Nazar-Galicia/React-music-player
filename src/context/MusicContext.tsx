import {createContext, type FC, type ReactNode, type RefObject, useEffect, useMemo, useState} from "react";
import {musicAPI} from "../api/musicAPI.ts";
import {useTracksObserver} from "../hooks/useTracksObserver.ts";

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
    observerElementRef: RefObject<HTMLDivElement | null>,
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
    const [page, setPage] = useState<number>(0)

    const {
        observerElementRef,
    } = useTracksObserver(() => { setPage(prev => prev + 1) })

    useEffect(() => {
        setPage(0)
        setTracks([])
        if (inputQuery.trim()) {
            musicAPI.getSongData(inputQuery, 0).then((data) => {
                setTracks(prev => [...prev, ...data.data])
            })
        }
    }, [inputQuery]);

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    useEffect(() => {
        console.log(page)
        if (inputQuery.trim()) {
            musicAPI.getSongData(inputQuery, page).then((data) => {
                setTracks(prev => [...prev, ...data.data])
            })
        }
    }, [page])

    const value: MusicContextProps = useMemo(() => {
        return {
            setInputQuery,
            tracks,
            inputQuery,
            observerElementRef,
        }
    }, [
        setInputQuery,
        tracks,
        inputQuery,
        observerElementRef,
    ])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider