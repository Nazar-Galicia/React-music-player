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
export const VisualiserCONFIG = {
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