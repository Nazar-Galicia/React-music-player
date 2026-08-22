import {VisualiserCONFIG as CONFIG} from "../config/visualiserConfig.ts";

interface DrawBarsParams {
    ctx: CanvasRenderingContext2D;
    frequencyData: Uint8Array;
    centerX: number;
    centerY: number;
    circleRadius: number;
    rotation: number;
    scale: number;
}

export const drawBars = ({
                             ctx,
                             frequencyData,
                             centerX,
                             centerY,
                             circleRadius,
                             rotation,
                             scale,
                         }: DrawBarsParams) => {
    const barDistance = CONFIG.BAR_DISTANCE * scale;
    const barWidth = CONFIG.BAR_WIDTH * scale;

    ctx.lineWidth = barWidth;
    ctx.lineCap = "round";

    for (let i = 0; i < CONFIG.BARS_COUNT; i++) {
        const value = frequencyData[i];

        const angle =
            (i / CONFIG.BARS_COUNT) * Math.PI * 2 + rotation;

        const normalized = value / 255;

        const barHeight =
            Math.pow(
                normalized,
                CONFIG.BAR_HEIGHT_POWER
            ) *
            CONFIG.BAR_HEIGHT_MULTIPLIER *
            scale;

        if (barHeight <= 0) continue;

        const startRadius =
            circleRadius + barDistance;

        const endRadius =
            startRadius + barHeight;

        const x1 =
            centerX + Math.cos(angle) * startRadius;

        const y1 =
            centerY + Math.sin(angle) * startRadius;

        const x2 =
            centerX + Math.cos(angle) * endRadius;

        const y2 =
            centerY + Math.sin(angle) * endRadius;

        const gradient =
            ctx.createLinearGradient(
                x1,
                y1,
                x2,
                y2
            );

        gradient.addColorStop(
            0,
            "rgba(255, 255, 255, 1)"
        );

        gradient.addColorStop(
            0.6,
            "rgba(255, 255, 255, 0.8)"
        );

        gradient.addColorStop(
            1,
            "rgba(255, 255, 255, 0.05)"
        );

        ctx.strokeStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
};