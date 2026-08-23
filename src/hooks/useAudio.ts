import {useContext} from "react";
import {AudioContext} from "../context/AudioContext.tsx";

export const useAudio = () => {
    const context = useContext(AudioContext);

    if (!context) throw new Error('audio context is missing');

    return context;
}