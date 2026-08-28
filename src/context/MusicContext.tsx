import {createContext, type FC, type ReactNode, type RefObject, useEffect, useMemo, useRef, useState} from "react";
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
    tracksListRef: RefObject<HTMLUListElement | null>,
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

    const tracksListRef = useRef<HTMLUListElement | null>(null)

    const {
        observerElementRef,
    } = useTracksObserver(() => { setPage(prev => prev + 1) })

    useEffect(() => {
        setPage(0)
        setTracks([])
        if (inputQuery.trim()) {
            musicAPI.getSongData(inputQuery, 0).then((data) => {
                setTracks(prev => {
                    const tracks = [...prev, ...data.data]

                    return tracks.filter(
                        (track, index, self) =>
                            index === self.findIndex(t => t.id === track.id)
                    )
                })
            })
        }
    }, [inputQuery]);

    useEffect(() => {
        console.log(tracks)
        if (tracksListRef.current) {
            console.log(tracks.length)
            if (tracks.length > 21) {
                tracksListRef.current.scrollBy({
                    top: 100,
                    behavior: "smooth",
                })
            }

            tracksListRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }
    }, [tracks]);

    useEffect(() => {
        console.log(page)
        if (inputQuery.trim()) {
            musicAPI.getSongData(inputQuery, page).then((data) => {
                setTracks(prev => {
                    const tracks = [...prev, ...data.data]

                    return tracks.filter(
                        (track, index, self) =>
                            index === self.findIndex(t => t.id === track.id)
                    )
                })
            })
        }
    }, [page])

    const value: MusicContextProps = useMemo(() => {
        return {
            setInputQuery,
            tracks,
            inputQuery,
            observerElementRef,
            tracksListRef,
        }
    }, [
        setInputQuery,
        tracks,
        inputQuery,
        observerElementRef,
        tracksListRef,
    ])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider