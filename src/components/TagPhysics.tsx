import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { prefersReducedMotion } from "@/src/lib/animations";

/* Buzz footer ".tag-canvas" mechanic: when the footer scrolls into view,
   pill-shaped bodies drop into a Matter.js world rendered on a canvas
   (canvas.physics-canvas on Buzz). Pills collide, settle, and can be
   dragged with the mouse. */

const TAGS = [
  "PTA Approved",
  "Official Imports",
  "Bawany Mobiles",
  "Intro Technology",
  "Infinix Pakistan",
  "Genuine Warranty",
  "Legal Channels",
  "Nationwide Reach",
  "Authentic Devices",
  "Dealer Network",
];

interface PillBody {
  body: Matter.Body;
  label: string;
  width: number;
  height: number;
  accent: boolean;
}

export default function TagPhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || prefersReducedMotion()) return;

    let engine: Matter.Engine | null = null;
    let runner: Matter.Runner | null = null;
    let rafId = 0;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
      const world = engine.world;

      // Static bounds: floor + walls (ceiling open so pills fall in)
      const wallOpts = { isStatic: true, restitution: 0.2, friction: 0.4 };
      Matter.Composite.add(world, [
        Matter.Bodies.rectangle(W / 2, H + 30, W + 200, 60, wallOpts),
        Matter.Bodies.rectangle(-30, H / 2, 60, H * 3, wallOpts),
        Matter.Bodies.rectangle(W + 30, H / 2, 60, H * 3, wallOpts),
      ]);

      // Measure pill sizes from label text
      const fontSize = W < 640 ? 13 : 16;
      const font = `700 ${fontSize}px "Hanken Grotesk", sans-serif`;
      ctx.font = font;
      const pills: PillBody[] = TAGS.map((label, i) => {
        const textW = ctx.measureText(label.toUpperCase()).width;
        const width = textW + fontSize * 2.2;
        const height = fontSize * 2.6;
        const x = 60 + Math.random() * Math.max(W - 120 - width, 10);
        const y = -80 - i * 90 - Math.random() * 60;
        const body = Matter.Bodies.rectangle(x, y, width, height, {
          chamfer: { radius: height / 2 },
          restitution: 0.35,
          friction: 0.3,
          frictionAir: 0.012,
          angle: (Math.random() - 0.5) * 0.6,
        });
        return { body, label, width, height, accent: i % 3 === 0 };
      });
      Matter.Composite.add(world, pills.map((p) => p.body));

      // Mouse drag — Buzz lets you toss the pills around
      const mouse = Matter.Mouse.create(canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, render: { visible: false } },
      });
      Matter.Composite.add(world, mouseConstraint);
      // Keep page scroll working over the canvas
      mouse.element.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (const pill of pills) {
          const { position, angle } = pill.body;
          ctx.save();
          ctx.translate(position.x, position.y);
          ctx.rotate(angle);

          const r = pill.height / 2;
          ctx.beginPath();
          ctx.roundRect(-pill.width / 2, -pill.height / 2, pill.width, pill.height, r);
          if (pill.accent) {
            ctx.fillStyle = "#64ff00";
            ctx.fill();
            ctx.fillStyle = "#000000";
          } else {
            ctx.strokeStyle = "rgba(255,255,255,0.6)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
          }
          ctx.fillText(pill.label.toUpperCase(), 0, 1);
          ctx.restore();
        }
        rafId = requestAnimationFrame(draw);
      };
      draw();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      if (runner) Matter.Runner.stop(runner);
      if (engine) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[360px] md:h-[480px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 touch-none" aria-hidden="true" />
    </div>
  );
}
