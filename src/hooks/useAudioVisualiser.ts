import {useEffect, useRef} from "react";
import {useToaster} from "./useToaster.ts";

export const useAudioVisualiser = (audioUrl: string) => {
    const { showMessage } = useToaster()

    const audio = useRef<HTMLMediaElement | null>(null)

    const audioContext = useRef<AudioContext | null>(null)
    const audioAnalyser = useRef<AnalyserNode | null>(null)
    const audioFrequencyData = useRef<Uint8Array<ArrayBuffer> | null>(null)
    const visualiserRef = useRef<HTMLCanvasElement | null>(null)
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null)

    const retryAttempts = useRef<number>(0)

    useEffect(() => {
        if (!audioUrl) return;

        const newAudio = new Audio();
        newAudio.crossOrigin = "anonymous";
        newAudio.src = audioUrl;
        newAudio.preload = "auto";

        audio.current = newAudio;

        const handleError = () => {
            if (retryAttempts.current < 3) {
                showMessage("Error audio source", () => {
                    newAudio.load()
                    retryAttempts.current += 1
                });
            } else {
                showMessage("Cannot load audio. Please try latter or try another song")
                retryAttempts.current = 0
            }
        };

        newAudio.addEventListener('error', handleError);
        newAudio.addEventListener('canplay', () => retryAttempts.current = 0)

        const context = new AudioContext();
        audioContext.current = context;

        audioAnalyser.current = context.createAnalyser();
        audioAnalyser.current.fftSize = 2048;
        audioFrequencyData.current = new Uint8Array(audioAnalyser.current.frequencyBinCount);

        const source = context.createMediaElementSource(newAudio);
        audioSource.current = source;

        source.connect(audioAnalyser.current);
        audioAnalyser.current.connect(context.destination);

        newAudio.play().catch(error => {
            console.warn("Автовідтворення заблоковано або перервано:", error.message);
        });

        let animationFrameId: number;

        if (visualiserRef.current) {
            const ctx = visualiserRef.current.getContext('2d');
            visualiserRef.current.width = window.innerWidth;
            visualiserRef.current.height = window.innerHeight;

            const centerX = visualiserRef.current.width / 2;
            const centerY = visualiserRef.current.height / 2;
            const baseRadius = 100;
            let rotation = 0;

            const animate = () => {
                const analyser = audioAnalyser.current;
                const frequencyData = audioFrequencyData.current;

                if (analyser && frequencyData && visualiserRef.current && ctx) {
                    analyser.getByteFrequencyData(frequencyData);

                    let bass = 0;
                    for (let i = 0; i < 15; i++) {
                        bass += frequencyData[i];
                    }
                    bass /= 15;
                    const normalizedBass = bass / 200;

                    const circleRadius = baseRadius + normalizedBass * 100;

                    ctx.clearRect(0, 0, visualiserRef.current.width, visualiserRef.current.height);

                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
                    ctx.fill();

                    const bars = 200;
                    const barDistance = 10;
                    const barWidth = 4;

                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = barWidth;

                    for (let i = 0; i < bars; i++) {
                        const value = frequencyData[i];
                        const angle = (i / bars) * Math.PI * 2 + rotation;
                        const normalized = value / 255;
                        const barHeight = Math.pow(normalized, 2.5) * 600;

                        const startRadius = circleRadius + barDistance;
                        const endRadius = startRadius + barHeight;

                        const x1 = centerX + Math.cos(angle) * startRadius;
                        const y1 = centerY + Math.sin(angle) * startRadius;
                        const x2 = centerX + Math.cos(angle) * endRadius;
                        const y2 = centerY + Math.sin(angle) * endRadius;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }

                rotation += 0.002
                animationFrameId = requestAnimationFrame(animate);
            };

            animate();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            newAudio.removeEventListener('error', handleError);

            audioSource.current?.disconnect();
            audioAnalyser.current?.disconnect();

            audioSource.current = null;
            audioAnalyser.current = null;
            audioFrequencyData.current = null;

            if (audioContext.current && audioContext.current.state !== 'closed') {
                audioContext.current?.close();
                audioContext.current = null;
            }

            newAudio.pause();
            newAudio.currentTime = 0;
            audio.current = null;
        };
    }, [audioUrl]);

    return {
        visualiserRef,
    }
}