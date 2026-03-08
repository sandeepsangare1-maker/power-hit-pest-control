import { useEffect, useRef } from "react";

const COCKROACH_COUNT = 10;
const FLEE_RADIUS = 140;
const FLEE_SPEED = 11;
const CRAWL_SPEED = 0.7;
const DIRECTION_CHANGE_MIN = 60; // frames
const DIRECTION_CHANGE_MAX = 180; // frames

interface Roach {
  id: number;
  x: number;
  y: number;
  // crawl direction (unit vector)
  vx: number;
  vy: number;
  speed: number;
  size: number;
  phase: number; // random offset for leg animation
  // direction change timer
  dirTimer: number;
  dirInterval: number;
  // flee state
  isFleeing: boolean;
  fleeVx: number;
  fleeVy: number;
  // permanently gone after fleeing off-screen
  gone: boolean;
  // facing angle (radians)
  angle: number;
}

function randAngle() {
  return Math.random() * Math.PI * 2;
}

function makeRoach(id: number, W: number, H: number): Roach {
  const angle = randAngle();
  return {
    id,
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.cos(angle),
    vy: Math.sin(angle),
    speed: CRAWL_SPEED + Math.random() * 0.5,
    size: 28 + Math.floor(Math.random() * 18),
    phase: Math.random() * Math.PI * 2,
    dirTimer: Math.floor(Math.random() * DIRECTION_CHANGE_MAX),
    dirInterval:
      DIRECTION_CHANGE_MIN +
      Math.floor(Math.random() * (DIRECTION_CHANGE_MAX - DIRECTION_CHANGE_MIN)),
    isFleeing: false,
    fleeVx: 0,
    fleeVy: 0,
    gone: false,
    angle,
  };
}

export default function CrawlingCockroaches() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roachesRef = useRef<Roach[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const dimsRef = useRef({ W: 0, H: 0, offsetX: 0, offsetY: 0 });

  // Apply spray-can cursor to the canvas element's parent (hero section)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const prev = parent.style.cursor;
    parent.style.cursor =
      "url('/assets/generated/spray-cursor-transparent.dim_64x64.png') 10 10, crosshair";
    return () => {
      parent.style.cursor = prev;
    };
  }, []);

  // Mouse tracking relative to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Resize + init canvas to match parent (hero section) size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const W = parent.offsetWidth;
      const H = parent.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      dimsRef.current = { W, H, offsetX: 0, offsetY: 0 };

      if (roachesRef.current.length === 0) {
        roachesRef.current = Array.from({ length: COCKROACH_COUNT }, (_, i) =>
          makeRoach(i, W, H),
        );
      } else {
        for (const r of roachesRef.current) {
          r.x = Math.max(0, Math.min(W, r.x));
          r.y = Math.max(0, Math.min(H, r.y));
        }
      }
    };

    const timeout = setTimeout(update, 100);
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      const { W, H } = dimsRef.current;
      frameRef.current += 1;
      const t = frameRef.current;

      ctx.clearRect(0, 0, W, H);

      const mouse = mouseRef.current;

      for (const r of roachesRef.current) {
        // Permanently gone — skip drawing
        if (r.gone) continue;

        const dx = r.x - mouse.x;
        const dy = r.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < FLEE_RADIUS) {
          // Start fleeing away from cursor
          const ang = Math.atan2(dy, dx);
          r.fleeVx = Math.cos(ang) * FLEE_SPEED;
          r.fleeVy = Math.sin(ang) * FLEE_SPEED;
          r.isFleeing = true;
          r.angle = ang;
        }

        if (r.isFleeing) {
          r.x += r.fleeVx;
          r.y += r.fleeVy;
          // Slight deceleration after initial burst
          r.fleeVx *= 0.97;
          r.fleeVy *= 0.97;

          // Update facing angle while moving fast
          const fspeed = Math.sqrt(r.fleeVx * r.fleeVx + r.fleeVy * r.fleeVy);
          if (fspeed > 0.5) {
            r.angle = Math.atan2(r.fleeVy, r.fleeVx);
          }

          // Once they go off-screen bounds, mark as permanently gone
          const margin = r.size * 2;
          if (
            r.x < -margin ||
            r.x > W + margin ||
            r.y < -margin ||
            r.y > H + margin
          ) {
            r.gone = true;
            continue;
          }
        } else {
          // Normal crawl within hero bounds
          r.dirTimer++;
          if (r.dirTimer >= r.dirInterval) {
            r.dirTimer = 0;
            r.dirInterval =
              DIRECTION_CHANGE_MIN +
              Math.floor(
                Math.random() * (DIRECTION_CHANGE_MAX - DIRECTION_CHANGE_MIN),
              );
            const wobble = (Math.random() - 0.5) * Math.PI;
            const newAngle = r.angle + wobble;
            r.vx = Math.cos(newAngle);
            r.vy = Math.sin(newAngle);
            r.angle = newAngle;
          }

          r.x += r.vx * r.speed;
          r.y += r.vy * r.speed;

          // Bounce off hero section edges (stay inside banner)
          if (r.x < 20) {
            r.x = 20;
            r.vx = Math.abs(r.vx);
            r.angle = Math.atan2(r.vy, r.vx);
          }
          if (r.x > W - 20) {
            r.x = W - 20;
            r.vx = -Math.abs(r.vx);
            r.angle = Math.atan2(r.vy, r.vx);
          }
          if (r.y < 20) {
            r.y = 20;
            r.vy = Math.abs(r.vy);
            r.angle = Math.atan2(r.vy, r.vx);
          }
          if (r.y > H - 20) {
            r.y = H - 20;
            r.vy = -Math.abs(r.vy);
            r.angle = Math.atan2(r.vy, r.vx);
          }
        }

        drawCockroach(ctx, r, t);
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
}

// ── Drawing ────────────────────────────────────────────────────────────────────

function drawCockroach(ctx: CanvasRenderingContext2D, r: Roach, t: number) {
  ctx.save();
  ctx.translate(r.x, r.y);

  // Rotate so cockroach faces its movement direction
  ctx.rotate(r.angle + Math.PI / 2);

  const s = r.size;

  // Subtle shadow under body
  ctx.save();
  ctx.translate(s * 0.04, s * 0.06);
  ctx.scale(1, 0.35);
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.3, s * 0.48, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fill();
  ctx.restore();

  // Abdomen
  ctx.beginPath();
  ctx.ellipse(0, s * 0.14, s * 0.27, s * 0.42, 0, 0, Math.PI * 2);
  const bodyGrad = ctx.createRadialGradient(
    -s * 0.06,
    0,
    s * 0.04,
    0,
    s * 0.14,
    s * 0.44,
  );
  bodyGrad.addColorStop(0, "#c0722a");
  bodyGrad.addColorStop(0.5, "#8B4513");
  bodyGrad.addColorStop(1, "#4a200a");
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.strokeStyle = "#2e1200";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Abdomen center stripe (wing line)
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.1);
  ctx.lineTo(0, s * 0.52);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Pronotum (thorax shield)
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.1, s * 0.22, s * 0.2, 0, 0, Math.PI * 2);
  const thoraxGrad = ctx.createRadialGradient(
    -s * 0.04,
    -s * 0.14,
    0,
    0,
    -s * 0.1,
    s * 0.22,
  );
  thoraxGrad.addColorStop(0, "#9e5420");
  thoraxGrad.addColorStop(1, "#5a2a08");
  ctx.fillStyle = thoraxGrad;
  ctx.fill();
  ctx.strokeStyle = "#2e1200";
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.34, s * 0.13, s * 0.13, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#3d1a06";
  ctx.fill();
  ctx.strokeStyle = "#1a0800";
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Eyes
  ctx.fillStyle = "#e62200";
  ctx.beginPath();
  ctx.arc(-s * 0.07, -s * 0.37, s * 0.038, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(s * 0.07, -s * 0.37, s * 0.038, 0, Math.PI * 2);
  ctx.fill();
  // Eye highlights
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.beginPath();
  ctx.arc(-s * 0.062, -s * 0.385, s * 0.013, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(s * 0.078, -s * 0.385, s * 0.013, 0, Math.PI * 2);
  ctx.fill();

  // Antennae (wiggle based on t and phase)
  const antWiggle = Math.sin(t * 0.14 + r.phase) * 0.28;
  ctx.strokeStyle = "#2a1000";
  ctx.lineWidth = 1.0;
  // Left antenna
  ctx.beginPath();
  ctx.moveTo(-s * 0.07, -s * 0.42);
  ctx.quadraticCurveTo(
    -s * 0.28 + antWiggle * s * 0.14,
    -s * 0.72,
    -s * 0.46 + antWiggle * s * 0.22,
    -s * 0.95,
  );
  ctx.stroke();
  // Right antenna
  ctx.beginPath();
  ctx.moveTo(s * 0.07, -s * 0.42);
  ctx.quadraticCurveTo(
    s * 0.28 - antWiggle * s * 0.14,
    -s * 0.72,
    s * 0.46 - antWiggle * s * 0.22,
    -s * 0.95,
  );
  ctx.stroke();

  // Legs — 3 pairs, animated with crawl wave
  ctx.strokeStyle = "#2e1200";
  ctx.lineWidth = 1.1;

  const legPairs: Array<[number, number, number, number]> = [
    [-s * 0.12, -s * 0.08, -1, 0],
    [-s * 0.15, s * 0.08, -1, 1],
    [-s * 0.13, s * 0.24, -1, 2],
    [s * 0.12, -s * 0.08, 1, 0],
    [s * 0.15, s * 0.08, 1, 1],
    [s * 0.13, s * 0.24, 1, 2],
  ];

  for (const [lx, ly, side, idx] of legPairs) {
    const gaitPhase = (idx % 2 === 0 ? 0 : Math.PI) * side;
    const swing = Math.sin(t * 0.16 + r.phase + gaitPhase) * 0.18;
    const liftY = Math.sin(t * 0.16 + r.phase + gaitPhase) * s * 0.04;

    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.quadraticCurveTo(
      lx + side * s * 0.24 + swing * s * 0.08,
      ly + s * 0.1 - liftY,
      lx + side * s * 0.4 + swing * s * 0.16,
      ly + s * 0.24 - liftY * 0.5,
    );
    ctx.stroke();
  }

  // Panic speed lines when fleeing fast
  if (r.isFleeing) {
    const fspeed = Math.sqrt(r.fleeVx * r.fleeVx + r.fleeVy * r.fleeVy);
    if (fspeed > 2.5) {
      const lineLen = Math.min(fspeed * 4, s * 1.4);
      ctx.save();
      ctx.globalAlpha = Math.min(0.7, fspeed / 12);
      ctx.strokeStyle = "#ff4400";
      ctx.lineWidth = 1.3;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * s * 0.12, s * 0.5);
        ctx.lineTo(i * s * 0.18, s * 0.5 + lineLen);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  ctx.restore();
}
