interface Particle {
    x: number;
    y: number;
    dist: number;
    speed: number;
    angle: number;
    alpha: number;
    size: number;
}

interface DrawParticlesParams {
    ctx: CanvasRenderingContext2D;
    particles: Particle[];
    normalizedBass: number;
    scale: number;
    centerX: number;
    centerY: number;
    maxDist: number;
}

export const drawParticles = ({
                                  ctx,
                                  particles,
                                  normalizedBass,
                                  scale,
                                  centerX,
                                  centerY,
                                  maxDist,
                              }: DrawParticlesParams) => {
    const bassBoostSpeed = normalizedBass * 2 * scale;
    const bassBoostAlpha = Math.min(1, normalizedBass * 0.5);

    for (const p of particles) {
        p.dist += p.speed * scale + bassBoostSpeed;

        if (p.dist > maxDist) {
            p.dist = 0;
            p.angle = Math.random() * Math.PI * 2;
        }

        p.x = centerX + Math.cos(p.angle) * p.dist;
        p.y = centerY + Math.sin(p.angle) * p.dist;

        const fadeFactor = 1 - p.dist / maxDist;

        const currentAlpha = Math.min(
            1,
            (p.alpha + bassBoostAlpha) * fadeFactor
        );

        ctx.fillStyle =
            `rgba(255, 255, 255, ${currentAlpha})`;

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            (p.size + normalizedBass) * scale,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
};