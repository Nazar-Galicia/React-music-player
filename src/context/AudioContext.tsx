import {createContext, type FC, type ReactNode, type Ref, useMemo} from "react";
import {useAudioVisualiser} from "../hooks/useAudioVisualiser.ts";
import {useLocation} from "react-router-dom";

interface AudioContextProps {
    visualiserRef: Ref<HTMLCanvasElement | null>,
    songThumbnailRef: Ref<HTMLImageElement | null>,
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
    } = location.state

    const {
        visualiserRef,
        songThumbnailRef,
    } = useAudioVisualiser(audioUrl)

    const value: AudioContextProps = useMemo(() => {
        return {
            visualiserRef,
            songThumbnailRef,
        }
    }, [
        visualiserRef,
        songThumbnailRef,
    ])

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioContextProvider