interface DrawCircleParams {
    ctx: CanvasRenderingContext2D;
    centerX: number;
    centerY: number;
    radius: number;
    normalizedBass: number;
    scale: number;
}

export const drawCircle = ({
                               ctx,
                               centerX,
                               centerY,
                               radius,
                               normalizedBass,
                               scale,
                           }: DrawCircleParams) => {
    ctx.save();

    ctx.shadowColor = `rgba(
        255,
        255,
        255,
        ${Math.min(1, normalizedBass + 0.5)}
    )`;

    ctx.shadowBlur = normalizedBass * 60 * scale;

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
};