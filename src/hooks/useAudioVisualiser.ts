import { useEffect, useRef } from "react";
import { useToaster } from "./useToaster.ts";
import {VisualiserCONFIG as CONFIG} from "../config/visualiserConfig.ts";
import {drawBars} from "../visualiser/drawBars.ts";
import {drawParticles} from "../visualiser/drawParticless.ts";
import {drawRipples} from "../visualiser/drawRipples.ts";
import {drawCircle} from "../visualiser/drawCircle.ts";

interface Particle {
    x: number;
    y: number;
    angle: number;
    dist: number;
    speed: number;
    size: number;
    alpha: number;
}

interface Ripple {
    radius: number;
    maxRadius: number;
    alpha: number;
    lineWidth: number;
}

export const useAudioVisualiser = (audioUrl: string) => {
    const { showMessage } = useToaster();

    const audio = useRef<HTMLMediaElement | null>(null);

    const audioContext = useRef<AudioContext | null>(null);
    const audioAnalyser = useRef<AnalyserNode | null>(null);
    const audioFrequencyData = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const visualiserRef = useRef<HTMLCanvasElement | null>(null);
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null);

    const songThumbnailRef = useRef<HTMLImageElement | null>(null);

    let animationFrameId: number;

    useEffect(() => {
        if (!audioUrl) return;

        const newAudio = new Audio();
        newAudio.crossOrigin = "anonymous";
        newAudio.src = audioUrl;
        newAudio.preload = "auto";

        audio.current = newAudio;

        const handleError = () => {
            showMessage("Audio source error", () => {
                newAudio.load();
            });
        };

        newAudio.addEventListener('error', handleError);
        // newAudio.addEventListener('canplay', () => retryAttempts.current = 0);

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
            console.warn("Autoplay blocked or interrupted:", error.message);
        });

        const ripples: Ripple[] = [];

        if (visualiserRef.current) {
            const canvas = visualiserRef.current;
            const ctx = canvas.getContext('2d');

            let centerX = 0;
            let centerY = 0;
            let maxDist = 0;
            let farthestCornerDist = 0;
            let scale = 1;

            const getScale = () => {
                const minSide = Math.min(window.innerWidth, window.innerHeight);
                const raw = minSide / CONFIG.REFERENCE_DIMENSION;
                return Math.min(CONFIG.MAX_SCALE, Math.max(CONFIG.MIN_SCALE, raw));
            };

            const recalcDimensions = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                centerX = canvas.width / 2;
                centerY = canvas.height / 2;
                maxDist = Math.hypot(centerX, centerY);

                farthestCornerDist = Math.hypot(
                    Math.max(centerX, canvas.width - centerX),
                    Math.max(centerY, canvas.height - centerY)
                );

                scale = getScale();
            };

            recalcDimensions();

            const particles: Particle[] = [];

            for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
                particles.push({
                    x: centerX,
                    y: centerY,
                    angle: Math.random() * Math.PI * 2,
                    dist: Math.random() * maxDist,
                    speed: CONFIG.PARTICLE_SPEED_MIN + Math.random() * (CONFIG.PARTICLE_SPEED_MAX - CONFIG.PARTICLE_SPEED_MIN),
                    size: CONFIG.PARTICLE_SIZE_MIN + Math.random() * (CONFIG.PARTICLE_SIZE_MAX - CONFIG.PARTICLE_SIZE_MIN),
                    alpha: CONFIG.PARTICLE_ALPHA_MIN + Math.random() * (CONFIG.PARTICLE_ALPHA_MAX - CONFIG.PARTICLE_ALPHA_MIN)
                });
            }

            let rotation = 0;

            let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
            const handleResize = () => {
                if (resizeTimeout) clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    recalcDimensions();
                }, CONFIG.RESIZE_DEBOUNCE_MS);
            };
            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', handleResize);

            const animate = () => {
                const analyser = audioAnalyser.current;
                const frequencyData = audioFrequencyData.current;

                if (analyser && frequencyData && ctx) {
                    analyser.getByteFrequencyData(frequencyData);

                    let bass = 0;

                    for (let i = 0; i < 15; i++) {
                        bass += frequencyData[i];
                    }

                    bass /= 15;

                    const normalizedBass = bass / 200;

                    if (songThumbnailRef.current) {
                        songThumbnailRef.current.style.width = `clamp(${normalizedBass * 2}vw, ${normalizedBass * 10}vw, ${normalizedBass * 12}vw)`;
                    }

                    const circleRadius =
                        (
                            CONFIG.BASE_CIRCLE_RADIUS +
                            normalizedBass * CONFIG.BASS_RADIUS_BOOST
                        ) * scale;

                    ctx.clearRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    drawParticles({
                        ctx,
                        particles,
                        normalizedBass,
                        scale,
                        centerX,
                        centerY,
                        maxDist,
                    });

                    drawRipples({
                        ctx,
                        ripples,
                        normalizedBass,
                        circleRadius,
                        centerX,
                        centerY,
                        farthestCornerDist,
                        scale,
                    });

                    drawCircle({
                        ctx,
                        centerX,
                        centerY,
                        radius: circleRadius,
                        normalizedBass,
                        scale,
                    });

                    drawBars({
                        ctx,
                        frequencyData,
                        centerX,
                        centerY,
                        circleRadius,
                        rotation,
                        scale,
                    });
                }

                rotation += CONFIG.ROTATION_SPEED;

                animationFrameId =
                    requestAnimationFrame(animate);
            };

            animate();
        }

        return () => {
            cancelAnimationFrame(animationFrameId)
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
        songThumbnailRef,
    };
};