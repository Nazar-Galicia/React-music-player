import {useEffect, useRef} from "react";

export const useAudioVisualiser = (audioUrl: string) => {
    const audioContext = useRef<AudioContext | null>(null)
    const audioAnalyser = useRef<AnalyserNode | null>(null)
    const audioFrequencyData = useRef<Uint8Array<ArrayBuffer> | null>(null)
    const visualiserRef = useRef<HTMLCanvasElement | null>(null)
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null)

    const audio = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audio.current = new Audio()

        audio.current.crossOrigin = "anonymous";
        audio.current.src = audioUrl;

        audioContext.current = new AudioContext()
        audioAnalyser.current = audioContext.current.createAnalyser()
        audioAnalyser.current.fftSize = 2048;
        audioFrequencyData.current = new Uint8Array(audioAnalyser.current.frequencyBinCount);

        audioSource.current = audioContext.current.createMediaElementSource(audio.current)
        audioSource.current.connect(audioAnalyser.current).connect(audioContext.current.destination)

        audio.current?.play()

        console.log(visualiserRef.current, audioFrequencyData)

        return () => {
            audioSource.current?.disconnect();
            audioAnalyser.current?.disconnect();

            audioSource.current = null;
            audioAnalyser.current = null;
            audioFrequencyData.current = null;

            audioContext.current?.close();
            audioContext.current = null;
        };
    }, [audio])

    return {
        visualiserRef,
    }
}