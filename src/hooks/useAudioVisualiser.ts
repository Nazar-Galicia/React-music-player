import {useEffect, useRef} from "react";

export const useAudioVisualiser = () => {
    const audioContext = useRef<AudioContext | null>(null)
    const audioAnalyser = useRef<AnalyserNode | null>(null)
    const audioFrequencyData = useRef<Uint8Array<ArrayBuffer> | null>(null)
    const visualiserRef = useRef<HTMLCanvasElement | null>(null)
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null)

    useEffect(() => {
        audioContext.current = new AudioContext()
        audioAnalyser.current = audioContext.current.createAnalyser()
        audioAnalyser.current.fftSize = 2048;
        audioFrequencyData.current = new Uint8Array(audioAnalyser.current.frequencyBinCount);

        console.log(visualiserRef.current, audioFrequencyData)

        if (visualiserRef.current) {
            const ctx = visualiserRef.current.getContext('2d');

            visualiserRef.current.width = window.innerWidth;
            visualiserRef.current.height = window.innerHeight;

            const centerX = visualiserRef.current.width / 2;
            const centerY = visualiserRef.current.height / 2;

            const baseRadius = 100;

            let smoothBass = 0;

            if (ctx) {
                ctx.fillStyle = 'white'
                ctx.strokeStyle = '#ffffff'

                const animate = () => {
                    const analyser = audioAnalyser.current;
                    const frequencyData = audioFrequencyData.current;

                    if (!analyser || !frequencyData || !visualiserRef.current) {
                        requestAnimationFrame(animate);
                        return;
                    }

                    analyser.getByteFrequencyData(frequencyData);

                    let bass = 0;

                    for (let i = 0; i < 15; i++) {
                        bass += frequencyData[i];
                    }

                    bass /= 15;

                    smoothBass += (bass - smoothBass) * 0.15;

                    const circleRadius = baseRadius + smoothBass * 0.4;

                    ctx.clearRect(
                        0,
                        0,
                        visualiserRef.current.width,
                        visualiserRef.current.height
                    );

                    ctx.fillStyle = '#ffffff';

                    ctx.beginPath();
                    ctx.arc(
                        centerX,
                        centerY,
                        circleRadius,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();

                    const bars = 200;
                    const barDistance = 10;
                    const barWidth = 4;

                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = barWidth;

                    for (let i = 0; i < bars; i++) {
                        const value = frequencyData[i];

                        const angle = (i / bars) * Math.PI * 2;

                        const normalized = value / 255;
                        const barHeight = Math.pow(normalized, 1.5) * 250;

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

                    requestAnimationFrame(animate);
                };

                animate()

            }
        }

        return () => {
            audioSource.current?.disconnect();
            audioAnalyser.current?.disconnect();

            audioSource.current = null;
            audioAnalyser.current = null;
            audioFrequencyData.current = null;

            audioContext.current?.close();
            audioContext.current = null;
        };
    }, [])

    return {
        visualiserRef,
    }
}