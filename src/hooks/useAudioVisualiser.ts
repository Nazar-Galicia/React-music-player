import { useEffect, useRef } from "react";

import { useToaster } from "./useToaster.ts";

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

/**
 * =========================================================================
 * CONFIG — ALL ADJUSTABLE VALUES COLLECTED HERE
 * =========================================================================
 * All "base" (BASE_*) values are calculated for desktop (wide screen).
 * On smaller screens (tablet/phone) they are automatically multiplied by
 * the `scale` coefficient (see getScale below), so you don't need to change
 * anything manually — just adjust the base numbers here, and the adaptation
 * will pick up these values across all screen sizes.
 */
const CONFIG = {
    // --- Particles (dispersing from center) ---
    PARTICLE_COUNT: 150, // number of particles on screen at once
    PARTICLE_SIZE_MIN: 1, // minimum particle size (px, before scale)
    PARTICLE_SIZE_MAX: 3, // maximum particle size (px, before scale)
    PARTICLE_SPEED_MIN: 0.5, // minimum movement speed from center
    PARTICLE_SPEED_MAX: 2, // maximum movement speed from center
    PARTICLE_ALPHA_MIN: 0.2, // minimum opacity
    PARTICLE_ALPHA_MAX: 1, // maximum opacity

    // --- Central circle ---
    BASE_CIRCLE_RADIUS: 100, // circle radius at rest (without bass), px, before scale
    BASS_RADIUS_BOOST: 100, // how much the circle "expands" from bass, px, before scale

    // --- Equalizer (bars around circle) ---
    BARS_COUNT: 200, // number of bars around the circle
    BAR_DISTANCE: 10, // distance from circle edge to bar start, px, before scale
    BAR_WIDTH: 4, // bar thickness, px, before scale
    BAR_HEIGHT_MULTIPLIER: 600, // maximum bar length, px, before scale
    BAR_HEIGHT_POWER: 2.5, // "sharpness" of bar reaction to volume (higher = sharper)
    ROTATION_SPEED: 0.002, // rotation speed of entire equalizer

    // --- Pulsing circles (ripples) ---
    RIPPLE_BASS_THRESHOLD: 1.15, // bass threshold at which a new circle appears
    RIPPLE_START_ALPHA: 0.6, // initial opacity of ripple circle
    RIPPLE_ALPHA_DECAY: 0.006, // ripple fade speed (lower = longer lifetime)
    RIPPLE_SPEED_BASE: 3, // base ripple expansion speed, px/frame, before scale
    RIPPLE_SPEED_BASS_MULTIPLIER: 4, // additional expansion speed from bass, before scale
    RIPPLE_LINE_WIDTH_BASE: 2, // base ripple line thickness, px, before scale
    RIPPLE_LINE_WIDTH_BASS_MULTIPLIER: 3, // additional line thickness from bass, px, before scale

    // --- Responsive ---
    // Scale is calculated from the smaller screen dimension (innerWidth or innerHeight)
    // relative to this "reference" value. For example, if REFERENCE_DIMENSION = 1000,
    // then on a 1000px smaller side scale = 1 (100%, as designed in BASE_* values above).
    // On a phone with 390px smaller side, scale ≈ 0.39, then clamped to MIN_SCALE
    // to prevent it from becoming too tiny.
    REFERENCE_DIMENSION: 1000,
    MIN_SCALE: 0.4, // minimum scale (so everything doesn't disappear on very narrow screens)
    MAX_SCALE: 1.15, // maximum scale (so it doesn't become gigantic on very large monitors)

    RESIZE_DEBOUNCE_MS: 150, // delay before recalculating dimensions after resize
};

export const useAudioVisualiser = (audioUrl: string) => {
    const { showMessage } = useToaster();

    const audio = useRef<HTMLMediaElement | null>(null);

    const audioContext = useRef<AudioContext | null>(null);
    const audioAnalyser = useRef<AnalyserNode | null>(null);
    const audioFrequencyData = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const visualiserRef = useRef<HTMLCanvasElement | null>(null);
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null);

    const retryAttempts = useRef<number>(0);

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
            if (retryAttempts.current < 3) {
                showMessage("Audio source error", () => {
                    newAudio.load();
                    retryAttempts.current += 1;
                });
            } else {
                showMessage("Cannot load audio. Please try again or choose another song");
                retryAttempts.current = 0;
            }
        };

        newAudio.addEventListener('error', handleError);
        newAudio.addEventListener('canplay', () => retryAttempts.current = 0);

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
            let isPeak = false;

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

                    const circleRadius = (CONFIG.BASE_CIRCLE_RADIUS + normalizedBass * CONFIG.BASS_RADIUS_BOOST) * scale;

                    if (songThumbnailRef.current) {
                        songThumbnailRef.current.style.width = `clamp(${normalizedBass * 2}vw, ${normalizedBass * 10}vw, ${normalizedBass * 12}vw)`;
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const bassBoostSpeed = normalizedBass * 2 * scale;
                    const bassBoostAlpha = Math.min(1, normalizedBass * 0.5);

                    for (let i = 0; i < particles.length; i++) {
                        const p = particles[i];

                        p.dist += p.speed * scale + bassBoostSpeed;

                        if (p.dist > maxDist) {
                            p.dist = 0;
                            p.angle = Math.random() * Math.PI * 2;
                        }

                        p.x = centerX + Math.cos(p.angle) * p.dist;
                        p.y = centerY + Math.sin(p.angle) * p.dist;

                        const fadeFactor = 1 - p.dist / maxDist;
                        const currentAlpha = Math.min(1, (p.alpha + bassBoostAlpha) * fadeFactor);

                        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, (p.size + normalizedBass) * scale, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    if (normalizedBass > CONFIG.RIPPLE_BASS_THRESHOLD) {
                        if (!isPeak) {
                            ripples.push({
                                radius: circleRadius,
                                maxRadius: farthestCornerDist,
                                alpha: CONFIG.RIPPLE_START_ALPHA,
                                lineWidth: (CONFIG.RIPPLE_LINE_WIDTH_BASE + normalizedBass * CONFIG.RIPPLE_LINE_WIDTH_BASS_MULTIPLIER) * scale
                            });
                            isPeak = true;
                        }
                    } else {
                        if (normalizedBass < CONFIG.RIPPLE_BASS_THRESHOLD) {
                            isPeak = false;
                        }
                    }

                    for (let i = ripples.length - 1; i >= 0; i--) {
                        const ripple = ripples[i];

                        ctx.beginPath();
                        ctx.arc(centerX, centerY, ripple.radius, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
                        ctx.lineWidth = ripple.lineWidth;
                        ctx.stroke();

                        ripple.radius += (CONFIG.RIPPLE_SPEED_BASE + normalizedBass * CONFIG.RIPPLE_SPEED_BASS_MULTIPLIER) * scale;
                        ripple.alpha -= CONFIG.RIPPLE_ALPHA_DECAY;

                        if (ripple.alpha <= 0 || ripple.radius >= ripple.maxRadius) {
                            ripples.splice(i, 1);
                        }
                    }

                    ctx.save();
                    ctx.shadowColor = `rgba(255, 255, 255, ${Math.min(1, normalizedBass + 0.5)})`;
                    ctx.shadowBlur = normalizedBass * 60 * scale;

                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();

                    const bars = CONFIG.BARS_COUNT;
                    const barDistance = CONFIG.BAR_DISTANCE * scale;
                    const barWidth = CONFIG.BAR_WIDTH * scale;

                    ctx.lineWidth = barWidth;
                    ctx.lineCap = 'round';

                    for (let i = 0; i < bars; i++) {
                        const value = frequencyData[i];
                        const angle = (i / bars) * Math.PI * 2 + rotation;
                        const normalized = value / 255;
                        const barHeight = Math.pow(normalized, CONFIG.BAR_HEIGHT_POWER) * CONFIG.BAR_HEIGHT_MULTIPLIER * scale;

                        if (barHeight <= 0) continue;

                        const startRadius = circleRadius + barDistance;
                        const endRadius = startRadius + barHeight;

                        const x1 = centerX + Math.cos(angle) * startRadius;
                        const y1 = centerY + Math.sin(angle) * startRadius;
                        const x2 = centerX + Math.cos(angle) * endRadius;
                        const y2 = centerY + Math.sin(angle) * endRadius;

                        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.8)');
                        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

                        ctx.strokeStyle = gradient;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }

                rotation += CONFIG.ROTATION_SPEED;
                animationFrameId = requestAnimationFrame(animate);
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