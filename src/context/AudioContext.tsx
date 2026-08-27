import {type ChangeEvent, createContext, type FC, type ReactNode, type Ref, type RefObject, useMemo} from "react";
import {useAudioVisualiser} from "../hooks/useAudioVisualiser.ts";
import {useLocation} from "react-router-dom";
import {useController} from "../hooks/useController.ts";

interface AudioContextProps {
    visualiserRef: Ref<HTMLCanvasElement | null>,
    songThumbnailRef: Ref<HTMLImageElement | null>,
    audio: RefObject<HTMLAudioElement | null>,
    duration: number,
    playAudio: () => void,
    restartAudio: () => void,
    songProgress: number,
    changeSongCurrentTime: (event: ChangeEvent<HTMLInputElement>) => void,
    changeVolume: (event: ChangeEvent<HTMLInputElement>) => void,
    controllerRef: RefObject<HTMLDivElement | null>,
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

    const {
        playAudio,
        restartAudio,
        songProgress,
        changeSongCurrentTime,
        changeVolume,
        controllerRef,
    } = useController(audio, duration)

    const value: AudioContextProps = useMemo(() => {
        return {
            visualiserRef,
            songThumbnailRef,
            audio,
            duration,
            playAudio,
            restartAudio,
            songProgress,
            changeSongCurrentTime,
            changeVolume,
            controllerRef,
        }
    }, [
        visualiserRef,
        songThumbnailRef,
        audio,
        duration,
        playAudio,
        restartAudio,
        songProgress,
        changeSongCurrentTime,
        changeVolume,
        controllerRef,
    ])

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioContextProvider