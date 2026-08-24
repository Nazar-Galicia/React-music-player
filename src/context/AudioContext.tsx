import {createContext, type FC, type ReactNode, type Ref, type RefObject, useMemo} from "react";
import {useAudioVisualiser} from "../hooks/useAudioVisualiser.ts";
import {useLocation} from "react-router-dom";

interface AudioContextProps {
    visualiserRef: Ref<HTMLCanvasElement | null>,
    songThumbnailRef: Ref<HTMLImageElement | null>,
    audio: RefObject<HTMLAudioElement | null>,
    duration: number,
}
interface AudioProviderProps {
    children: ReactNode,
}

export const AudioContext = createContext<AudioContextProps | null>(null);

const AudioContextProvider: FC<AudioProviderProps> = (props) => {
    const {
        children,
    } = props

    const location = useLocation();

    const {
        audioUrl,
        duration,
    } = location.state

    const {
        visualiserRef,
        songThumbnailRef,
        audio,
    } = useAudioVisualiser(audioUrl)

    const value: AudioContextProps = useMemo(() => {
        return {
            visualiserRef,
            songThumbnailRef,
            audio,
            duration,
        }
    }, [
        visualiserRef,
        songThumbnailRef,
        audio,
        duration,
    ])

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioContextProvider