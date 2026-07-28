"use client";

import React, { useEffect, useRef } from "react";

export interface InteractiveBackgroundProps {
  className?: string;
  /** Grid spacing in px between squares */
  step?: number;
  /** Speed of ripple wave expansion in px/s */
  rippleSpeed?: number;
}

/**
 * Interactive pixel field background matching Unlumen Pixel Background effect.
 *
 * On cursor entry, a ripple wave of square pixels expands outward from the cursor
 * position, spreading across the entire page. Squares glow as the wave passes
 * through them, defaulting to a permanent visible idle grid state.
 */
export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  className,
  step = 10,
  rippleSpeed = 800,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Square pixel appearance
    const SQ_R = 180;
    const SQ_G = 180;
    const SQ_B = 180;
    const IDLE_ALPHA = 0; // 0 opacity when no hover is happening
    const MAX_ALPHA = 0.35; // 35% (0.35) opacity on hover
    const SQUARE_SIZE = 2; // Exact 2px geometric squares

    interface PixelSquare {
      x: number;
      y: number;
      currentAlpha: number;
    }

    let squares: PixelSquare[] = [];

    // Ripple state — each ripple is a wave expanding from a point
    interface Ripple {
      originX: number;
      originY: number;
      radius: number; // current outer edge of the wave
      startTime: number;
      maxRadius: number; // diagonal of the viewport
    }

    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999, entered: false };
    let lastRippleTime = 0;

    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width === 0 || height === 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      const newSquares: PixelSquare[] = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          newSquares.push({
            x: c * step,
            y: r * step,
            currentAlpha: IDLE_ALPHA, // Start at visible idle state
          });
        }
      }
      squares = newSquares;
    };

    initGrid();

    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    resizeObserver.observe(canvas);

    // --- Pointer tracking ---
    const handlePointerMove = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX: number;
      let clientY: number;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;

      // Spawn ripples as cursor moves (throttled)
      const now = performance.now();
      if (now - lastRippleTime > 60) {
        // ~16 ripples/sec max
        const maxDiag = Math.sqrt(width * width + height * height);
        ripples.push({
          originX: mouse.x,
          originY: mouse.y,
          radius: 0,
          startTime: now,
          maxRadius: maxDiag,
        });
        lastRippleTime = now;

        // Limit ripple count to avoid memory growth
        if (ripples.length > 30) {
          ripples.shift();
        }
      }

      if (!mouse.entered) {
        mouse.entered = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.entered = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // --- Render loop ---
    const RIPPLE_WIDTH = 250; // Width of the wave band in px
    const FADE_SPEED = 0.025; // How fast squares fade out after wave passes

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const len = squares.length;

      // Update ripple radii
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        const elapsed = (now - rip.startTime) * 0.001;
        rip.radius = elapsed * rippleSpeed;

        // Remove ripples that have fully expanded and faded
        if (rip.radius > rip.maxRadius + RIPPLE_WIDTH * 2) {
          ripples.splice(r, 1);
        }
      }

      for (let i = 0; i < len; i++) {
        const sq = squares[i];

        // Calculate target alpha from all active ripples (defaulting to permanent idle grid visibility)
        let targetAlpha = IDLE_ALPHA;

        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const dx = sq.x - rip.originX;
          const dy = sq.y - rip.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Square is within the wave band
          const innerEdge = rip.radius - RIPPLE_WIDTH;
          const outerEdge = rip.radius;

          if (dist >= innerEdge && dist <= outerEdge) {
            // Position within the wave (0 = inner edge, 1 = outer edge)
            const pos = (dist - innerEdge) / RIPPLE_WIDTH;
            // Bell curve intensity — brightest in the middle of the wave
            const intensity = Math.sin(pos * Math.PI);
            targetAlpha = Math.max(targetAlpha, MAX_ALPHA * intensity);
          }
          // Squares that the wave has already passed — leave a subtle residue
          else if (dist < innerEdge) {
            // Residue fades based on how far the wave has gone past
            const passedDist = innerEdge - dist;
            const residue = Math.max(
              0,
              MAX_ALPHA * 0.4 * Math.exp(-passedDist * 0.003)
            );
            targetAlpha = Math.max(targetAlpha, residue);
          }
        }

        // Smooth interpolation
        if (targetAlpha > sq.currentAlpha) {
          sq.currentAlpha += (targetAlpha - sq.currentAlpha) * 0.3;
        } else {
          sq.currentAlpha += (targetAlpha - sq.currentAlpha) * FADE_SPEED;
        }

        // Only draw squares that are at least slightly visible
        if (sq.currentAlpha > 0.005) {
          ctx.fillStyle = `rgba(${SQ_R},${SQ_G},${SQ_B},${sq.currentAlpha.toFixed(3)})`;
          // Draw crisp geometric squares snapped to integer pixel coordinates to prevent circular anti-aliasing blur
          ctx.fillRect(
            Math.round(sq.x),
            Math.round(sq.y),
            SQUARE_SIZE,
            SQUARE_SIZE
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [step, rippleSpeed]);

  return (
    <div
      data-hero-bg
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden ${className || ""}`}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
};

InteractiveBackground.displayName = "InteractiveBackground";
