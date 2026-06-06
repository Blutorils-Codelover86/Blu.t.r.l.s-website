// Blu.t.r.l.s // Ambient Audio Animation Matrix Integration
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("bg-oscilloscope");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let frame = 0;

    // Synchronize canvas buffer limits to perfectly fit the viewport size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Continuous Math Drawing Loop Sequence
    function paintBackgroundAnimation() {
        frame++;
        requestAnimationFrame(paintBackgroundAnimation);

        const w = canvas.width;
        const h = canvas.height;

        // Clear display frame
        ctx.clearRect(0, 0, w, h);

        // -------------------------------------------------------------
        // BACKGROUND EFFECT A: TRACE VECTOR OSCILLOSCOPE WAVEFORM
        // -------------------------------------------------------------
        ctx.strokeStyle = "#00f0ff"; // Retro Blue Trace Line
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
            // Replicates complex oscillator wave paths passing through a filter stack
            const fundamentalTone = Math.sin(x * 0.006 - frame * 0.02);
            const highHarmonic = Math.sin(x * 0.025 + frame * 0.05) * 0.3;

            // Subtly mimicking the compression pumping envelope shape from Daft Punk's homework gear
            const sidechainPump = Math.sin(x * 0.002 + frame * 0.01) * 0.5 + 0.5;

            const displacement = (fundamentalTone + highHarmonic) * sidechainPump * (h * 0.12);
            const y = (h * 0.4) + displacement; // Positions the wave sweep across the upper layout half

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();

        // -------------------------------------------------------------
        // BACKGROUND EFFECT B: AMBIENT SPECTROGRAM AUDIO BARS
        // -------------------------------------------------------------
        const totalBars = 24;
        const barWidth = w / totalBars;

        for (let i = 0; i < totalBars; i++) {
            // Modulate a soft, ongoing rhythm height curve per column
            const rhythmicPump = Math.sin(i * 0.4 + frame * 0.015) * 0.5 + 0.5;
            const transientPeak = Math.cos(i * 0.9 - frame * 0.04) * 0.2;
            const finalBarHeight = Math.max(0.1, rhythmicPump + transientPeak) * (h * 0.25);

            // Establish color ranges across the visual index
            let barColor = "#00f0ff"; // Base Cyan
            if (i > totalBars * 0.4) barColor = "#ffee00"; // Mid Section Gold
            if (i > totalBars * 0.75) barColor = "#ff007f"; // High Frequency Pink

            ctx.fillStyle = barColor;
            // Paints smooth indicator bars rising upwards right out of the footer base line
            ctx.fillRect(i * barWidth, h - finalBarHeight, barWidth - 8, finalBarHeight);
        }
    }

    // Fire ambient trace script sequences
    paintBackgroundAnimation();
});