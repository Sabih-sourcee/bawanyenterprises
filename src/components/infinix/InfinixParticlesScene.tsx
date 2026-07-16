import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import type { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { prefersReducedMotion } from "@/src/lib/animations";

const FONT_URL =
  "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/helvetiker_bold.typeface.json";

const LINES = ["INFINIX", "X", "BAWANY ENTERPRISES"] as const;

function makeSpacedText(
  font: Font,
  text: string,
  size: number,
  depth: number,
  letterGap: number,
): {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    metalness: 0.12,
    roughness: 0.5,
  });
  disposables.push(material);

  let cursorX = 0;
  const spaceWidth = size * 0.5;

  for (const char of text) {
    if (char === " ") {
      cursorX += spaceWidth;
      continue;
    }

    const geometry = new TextGeometry(char, {
      font,
      size,
      depth,
      curveSegments: 8,
      bevelEnabled: false,
    });
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const charWidth = box.max.x - box.min.x;

    // Shift so left edge sits at cursorX
    geometry.translate(-box.min.x, -(box.min.y + box.max.y) / 2, -(box.min.z + box.max.z) / 2);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = cursorX;
    mesh.castShadow = true;
    group.add(mesh);
    disposables.push(geometry);

    cursorX += charWidth + letterGap;
  }

  // Center the whole group
  const totalWidth = cursorX - letterGap;
  group.children.forEach((child) => {
    child.position.x -= totalWidth / 2;
  });

  return { group, disposables };
}

export default function InfinixParticlesScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    let disposed = false;
    const disposables: Array<{ dispose: () => void }> = [];
    let textReady = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(3, 5, 8);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3);
    fill.position.set(-4, -1, 3);
    scene.add(fill);

    const textGroup = new THREE.Group();
    scene.add(textGroup);

    const pointer = { x: 0, y: 0 };
    const motion = { float: 0.2, tilt: 0.12, cam: 0.55 };

    const fitToViewport = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Stronger motion on desktop, softer on mobile
      const isMobile = w < 768;
      motion.float = isMobile ? 0.12 : 0.22;
      motion.tilt = isMobile ? 0.06 : 0.12;
      motion.cam = isMobile ? 0.25 : 0.55;

      if (!textReady) return;

      camera.position.z = isMobile ? 15 : w < 1100 ? 14 : 13;

      textGroup.scale.setScalar(1);
      const box = new THREE.Box3().setFromObject(textGroup);
      const size = new THREE.Vector3();
      box.getSize(size);
      if (size.x <= 0 || size.y <= 0) return;

      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleH = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleW = visibleH * camera.aspect;

      const scaleX = (visibleW * (isMobile ? 0.88 : 0.82)) / size.x;
      const scaleY = (visibleH * (isMobile ? 0.55 : 0.5)) / size.y;
      textGroup.scale.setScalar(Math.min(scaleX, scaleY));
    };

    const loader = new FontLoader();
    loader.load(FONT_URL, (font: Font) => {
      if (disposed) return;

      // Three equal-size lines, stacked and centered
      const letterSize = 0.85;
      const letterDepth = 0.14;
      const letterGap = 0.26;
      const lineGap = letterSize * 1.35;

      LINES.forEach((line, i) => {
        const { group: letters, disposables: letterDisposables } = makeSpacedText(
          font,
          line,
          letterSize,
          letterDepth,
          letterGap,
        );
        // Line 0 top, line 1 middle (X), line 2 bottom
        letters.position.y = (1 - i) * lineGap;
        textGroup.add(letters);
        disposables.push(...letterDisposables);
      });

      const shadowGeo = new THREE.PlaneGeometry(16, 3.2);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.06,
      });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -lineGap - 0.7;
      textGroup.add(shadow);
      disposables.push(shadowGeo, shadowMat);

      textReady = true;
      fitToViewport();
    });

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      textGroup.position.y = Math.sin(t * 0.85) * motion.float;
      textGroup.rotation.y =
        Math.sin(t * 0.32) * (motion.tilt * 0.85) + pointer.x * motion.tilt;
      textGroup.rotation.x =
        Math.sin(t * 0.26) * (motion.tilt * 0.35) - pointer.y * (motion.tilt * 0.45);

      camera.position.x += (pointer.x * motion.cam - camera.position.x) * 0.045;
      camera.position.y += (-pointer.y * (motion.cam * 0.55) - camera.position.y) * 0.045;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => fitToViewport();
    window.addEventListener("resize", onResize);
    // Orientation / mobile browser chrome changes
    window.addEventListener("orientationchange", onResize);
    fitToViewport();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (prefersReducedMotion()) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-[var(--page-pad)]"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2 text-center">
          {LINES.map((line) => (
            <span
              key={line}
              className="font-sans font-black text-[clamp(1.25rem,6vw,3.25rem)] text-jet-black/15 tracking-[0.12em] leading-none"
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="infinix-scene absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}
