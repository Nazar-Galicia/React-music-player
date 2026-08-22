import {VisualiserCONFIG as CONFIG} from "../config/visualiserConfig.ts";

interface Ripple {
    radius: number;
    maxRadius: number;
    alpha: number;
    lineWidth: number;
}

interface DrawRipplesParams {
    ctx: CanvasRenderingContext2D;
    ripples: Ripple[];
    normalizedBass: number;
    circleRadius: number;
    centerX: number;
    centerY: number;
    farthestCornerDist: number;
    scale: number;
}

let isPeak = false;

export const drawRipples = ({
                                ctx,
                                ripples,
                                normalizedBass,
                                circleRadius,
                                centerX,
                                centerY,
                                farthestCornerDist,
                                scale,
                            }: DrawRipplesParams) => {

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

        ctx.arc(
            centerX,
            centerY,
            ripple.radius,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            `rgba(255, 255, 255, ${ripple.alpha})`;

        ctx.lineWidth = ripple.lineWidth;

        ctx.stroke();

        ripple.radius +=
            (
                CONFIG.RIPPLE_SPEED_BASE +
                normalizedBass *
                CONFIG.RIPPLE_SPEED_BASS_MULTIPLIER
            ) * scale;

        ripple.alpha -= CONFIG.RIPPLE_ALPHA_DECAY;

        if (
            ripple.alpha <= 0 ||
            ripple.radius >= ripple.maxRadius
        ) {
            ripples.splice(i, 1);
        }
    }
};