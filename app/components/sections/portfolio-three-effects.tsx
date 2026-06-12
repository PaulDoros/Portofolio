import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

const CYBER_FRAME_COUNT = 150;
const CYBER_FRAME_BASE = '/images/cyber-sequence';
const CYBER_INITIAL_FRAME = 24;
const CYBER_STRIP_COUNT = 8;

type ThreeModule = typeof import('three');

function startHeroCanvasFallback(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return () => undefined;

  let raf = 0;
  let isActive = true;
  let dpr = 1;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  };

  const draw = () => {
    if (!isActive) return;

    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const elapsed = performance.now() / 1000;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const gradient = context.createRadialGradient(
      width * 0.62,
      height * 0.42,
      width * 0.04,
      width * 0.62,
      height * 0.42,
      width * 0.48
    );
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.34)');
    gradient.addColorStop(0.38, 'rgba(139, 92, 246, 0.12)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.save();
    context.globalCompositeOperation = 'screen';
    for (let index = 0; index < 92; index += 1) {
      const x = (Math.sin(index * 13.7 + elapsed * 0.8) * 0.5 + 0.5) * width;
      const y = (Math.cos(index * 8.3 + elapsed * 0.52) * 0.5 + 0.5) * height;
      const radius = 1.2 + ((index * 17) % 9);

      context.globalAlpha = 0.08 + ((index % 5) / 5) * 0.18;
      context.fillStyle = index % 3 === 0 ? '#f7c46a' : index % 2 === 0 ? '#00d4ff' : '#8b5cf6';
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 0.18;
    context.strokeStyle = '#00d4ff';
    context.lineWidth = 1;
    for (let index = 0; index < 22; index += 1) {
      const y = ((index * 73 + elapsed * 24) % (height + 140)) - 70;
      context.beginPath();
      context.moveTo(width * 0.38, y);
      context.bezierCurveTo(width * 0.48, y - 90, width * 0.72, y + 90, width * 0.92, y);
      context.stroke();
    }
    context.restore();

    raf = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resize);
  resize();
  draw();

  return () => {
    isActive = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  };
}

function disposeThreeObject(object: import('three').Object3D) {
  object.traverse(child => {
    const mesh = child as import('three').Object3D & {
      geometry?: { dispose: () => void };
      material?: { dispose: () => void } | Array<{ dispose: () => void }>;
    };

    mesh.geometry?.dispose();

    if (Array.isArray(mesh.material)) {
      for (const material of mesh.material) material.dispose();
    } else {
      mesh.material?.dispose();
    }
  });
}

export function PortfolioThreeHeroCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let isActive = true;
    let cleanup: () => void = () => undefined;

    void import('three').then((THREE: ThreeModule) => {
      if (!isActive || !canvasRef.current) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const gl =
        canvas.getContext('webgl2', {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }) ??
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        });

      if (!gl) {
        cleanup = startHeroCanvasFallback(canvas);
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGLRenderingContext,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 80);
      camera.position.set(0, 0, 7.2);

      const group = new THREE.Group();
      scene.add(group);

      const particleCount = window.innerWidth < 768 ? 260 : 620;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const cyan = new THREE.Color('#00d4ff');
      const violet = new THREE.Color('#8b5cf6');
      const gold = new THREE.Color('#f7c46a');

      for (let index = 0; index < particleCount; index += 1) {
        const stride = index * 3;
        const radius = 2.2 + Math.random() * 5.8;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 5.2;

        positions[stride] = Math.cos(angle) * radius;
        positions[stride + 1] = height;
        positions[stride + 2] = Math.sin(angle) * radius - 1.4;

        const color = index % 5 === 0 ? gold : index % 2 === 0 ? cyan : violet;
        colors[stride] = color.r;
        colors[stride + 1] = color.g;
        colors[stride + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          size: 0.038,
          vertexColors: true,
          transparent: true,
          opacity: 0.82,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      group.add(particles);

      const linePositions = new Float32Array(180 * 2 * 3);
      for (let index = 0; index < 180; index += 1) {
        const stride = index * 6;
        const z = -2.4 - Math.random() * 3.8;
        const y = (Math.random() - 0.5) * 4.8;
        const x = (Math.random() - 0.5) * 10;

        linePositions[stride] = x;
        linePositions[stride + 1] = y;
        linePositions[stride + 2] = z;
        linePositions[stride + 3] = x + (Math.random() - 0.5) * 1.8;
        linePositions[stride + 4] = y + (Math.random() - 0.5) * 0.8;
        linePositions[stride + 5] = z + (Math.random() - 0.5) * 0.8;
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMesh = new THREE.LineSegments(
        lineGeometry,
        new THREE.LineBasicMaterial({
          color: '#00d4ff',
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
        })
      );
      group.add(lineMesh);

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.012, 8, 180),
        new THREE.MeshBasicMaterial({
          color: '#f7c46a',
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
        })
      );
      torus.rotation.x = Math.PI * 0.42;
      group.add(torus);

      const knot = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(1.05, 0.28, 180, 14)),
        new THREE.LineBasicMaterial({
          color: '#8b5cf6',
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending,
        })
      );
      knot.position.set(2.6, 0.1, -1.8);
      group.add(knot);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const onPointerMove = (event: PointerEvent) => {
        pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      resize();

      const clock = new THREE.Clock();
      let raf = 0;

      const render = () => {
        const elapsed = clock.getElapsedTime();
        const pointer = pointerRef.current;

        group.rotation.y += (pointer.x * 0.24 + elapsed * 0.035 - group.rotation.y) * 0.035;
        group.rotation.x +=
          (-pointer.y * 0.11 + Math.sin(elapsed * 0.45) * 0.04 - group.rotation.x) * 0.035;
        particles.rotation.z = elapsed * 0.018;
        lineMesh.rotation.y = -elapsed * 0.025;
        torus.rotation.z = elapsed * 0.18;
        knot.rotation.x = elapsed * 0.15;
        knot.rotation.y = elapsed * 0.2;

        renderer.render(scene, camera);

        if (!reduceMotion) raf = requestAnimationFrame(render);
      };

      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        disposeThreeObject(scene);
        renderer.dispose();
      };
    });

    return () => {
      isActive = false;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export function PortfolioProjectOrbitCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let isActive = true;
    let cleanup: () => void = () => undefined;

    void import('three').then((THREE: ThreeModule) => {
      if (!isActive || !canvasRef.current) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const gl =
        canvas.getContext('webgl2', {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }) ??
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        });

      if (!gl) {
        cleanup = startHeroCanvasFallback(canvas);
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl as WebGLRenderingContext,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
      camera.position.set(0, 0, 8.4);

      const group = new THREE.Group();
      scene.add(group);

      const colors = ['#f54e00', '#f7c46a', '#00d4ff', '#5e6ad2', '#6ee7b7'];
      const rings = [1.55, 2.35, 3.2, 4.05].map((radius, index) => {
        const ring = new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.TorusGeometry(radius, 0.006, 6, 180)),
          new THREE.LineBasicMaterial({
            color: colors[index % colors.length],
            transparent: true,
            opacity: index === 0 ? 0.18 : 0.12,
            blending: THREE.AdditiveBlending,
          })
        );
        ring.rotation.x = Math.PI * (0.28 + index * 0.08);
        ring.rotation.z = index * 0.38;
        group.add(ring);
        return ring;
      });

      const nodeGroup = new THREE.Group();
      group.add(nodeGroup);

      for (let index = 0; index < 14; index += 1) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[index % colors.length],
          transparent: true,
          opacity: index % 3 === 0 ? 0.72 : 0.48,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(
          index % 2 === 0
            ? new THREE.IcosahedronGeometry(0.055 + (index % 4) * 0.014, 0)
            : new THREE.BoxGeometry(0.09, 0.09, 0.09),
          material
        );
        const angle = (index / 14) * Math.PI * 2;
        const radius = 1.35 + (index % 5) * 0.55;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.7) * 0.55,
          Math.sin(angle) * radius
        );
        mesh.userData = { angle, radius, speed: 0.18 + (index % 6) * 0.025 };
        nodeGroup.add(mesh);
      }

      const linePositions = new Float32Array(nodeGroup.children.length * 2 * 3);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMesh = new THREE.LineSegments(
        lineGeometry,
        new THREE.LineBasicMaterial({
          color: '#00d4ff',
          transparent: true,
          opacity: 0.16,
          blending: THREE.AdditiveBlending,
        })
      );
      group.add(lineMesh);

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const onPointerMove = (event: PointerEvent) => {
        pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
        pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };

      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      resize();

      const clock = new THREE.Clock();
      let raf = 0;

      const render = () => {
        const elapsed = clock.getElapsedTime();
        const pointer = pointerRef.current;

        group.rotation.y +=
          (pointer.x * 0.18 + Math.sin(elapsed * 0.18) * 0.12 - group.rotation.y) * 0.035;
        group.rotation.x += (-pointer.y * 0.08 - group.rotation.x) * 0.035;
        nodeGroup.rotation.y = elapsed * 0.13;

        for (let index = 0; index < rings.length; index += 1) {
          const ring = rings[index];
          ring.rotation.z += 0.0015 + index * 0.0008;
          ring.rotation.y = Math.sin(elapsed * 0.18 + index) * 0.16;
        }

        for (let index = 0; index < nodeGroup.children.length; index += 1) {
          const child = nodeGroup.children[index];
          const mesh = child as import('three').Mesh;
          const { angle, radius, speed } = mesh.userData as {
            angle: number;
            radius: number;
            speed: number;
          };
          const nextAngle = angle + elapsed * speed;
          mesh.position.x = Math.cos(nextAngle) * radius;
          mesh.position.z = Math.sin(nextAngle) * radius;
          mesh.position.y = Math.sin(nextAngle * 1.8 + index) * 0.64;
          mesh.rotation.x = elapsed * 0.5;
          mesh.rotation.y = elapsed * 0.38;

          const stride = index * 6;
          linePositions[stride] = 0;
          linePositions[stride + 1] = 0;
          linePositions[stride + 2] = 0;
          linePositions[stride + 3] = mesh.position.x;
          linePositions[stride + 4] = mesh.position.y;
          linePositions[stride + 5] = mesh.position.z;
        }
        lineGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);

        if (!reduceMotion) raf = requestAnimationFrame(render);
      };

      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        disposeThreeObject(scene);
        renderer.dispose();
      };
    });

    return () => {
      isActive = false;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

function getCyberFrameSrc(frameIndex: number) {
  return `${CYBER_FRAME_BASE}/frame-${String(frameIndex + 1).padStart(3, '0')}.webp`;
}

function clampFrameIndex(frameIndex: number) {
  return Math.min(CYBER_FRAME_COUNT - 1, Math.max(0, frameIndex));
}

function drawScaledImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  mode: 'cover' | 'contain',
  scaleMultiplier: number,
  centerX: number,
  centerY: number
) {
  const scale =
    (mode === 'cover'
      ? Math.max(width / image.naturalWidth, height / image.naturalHeight)
      : Math.min(width / image.naturalWidth, height / image.naturalHeight)) * scaleMultiplier;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = width * centerX - drawWidth * 0.5;
  const y = height * centerY - drawHeight * 0.5;

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawCyberSequenceFrame(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number
) {
  context.clearRect(0, 0, width, height);

  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, '#030508');
  background.addColorStop(0.5, '#071323');
  background.addColorStop(1, '#100317');
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.68;
  context.filter = 'blur(10px) saturate(1.3) contrast(1.08) brightness(0.74)';
  drawScaledImage(context, image, width, height, 'cover', 1.04, 0.56, 0.48);
  context.restore();

  context.save();
  context.globalAlpha = 0.46;
  context.filter = 'saturate(1.14) contrast(1.08) brightness(0.9)';
  drawScaledImage(context, image, width, height, 'cover', 1, 0.58, 0.52);
  context.restore();

  context.save();
  context.globalAlpha = 0.94;
  context.shadowColor = 'rgba(0, 212, 255, 0.28)';
  context.shadowBlur = 22;
  context.filter = 'saturate(1.16) contrast(1.08) brightness(1.04)';
  drawScaledImage(
    context,
    image,
    width,
    height,
    'contain',
    width < 720 ? 1.05 : 1.08,
    width < 720 ? 0.52 : 0.56,
    width < 720 ? 0.52 : 0.55
  );
  context.restore();

  context.save();
  context.globalCompositeOperation = 'multiply';
  const leftShade = context.createLinearGradient(0, 0, width, 0);
  leftShade.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
  leftShade.addColorStop(0.36, 'rgba(0, 0, 0, 0.12)');
  leftShade.addColorStop(0.72, 'rgba(0, 0, 0, 0)');
  context.fillStyle = leftShade;
  context.fillRect(0, 0, width, height);
  context.restore();

  context.save();
  const vignette = context.createRadialGradient(
    width * 0.62,
    height * 0.46,
    width * 0.12,
    width * 0.5,
    height * 0.5,
    width * 0.78
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.68, 'rgba(0,0,0,0.14)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.78)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
  context.restore();
}

export function CyberPortraitSequence() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCacheRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const currentImageRef = useRef<HTMLImageElement | null>(null);
  const requestedFrameRef = useRef(0);
  const requestDrawRef = useRef<() => void>(() => undefined);
  const primeFrameRef = useRef<(frameIndex: number) => void>(() => undefined);
  const dprRef = useRef(1);
  const reduceMotion = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.12, 0.78, 1], [0, 1, 1, 0.35]);
  const stripY = useTransform(scrollYProgress, [0, 1], ['12%', '-18%']);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const nextFrame = reduceMotion
      ? CYBER_INITIAL_FRAME
      : clampFrameIndex(Math.round(latest * (CYBER_FRAME_COUNT - 1)));
    requestedFrameRef.current = nextFrame;
    primeFrameRef.current(nextFrame);
    requestDrawRef.current();
    setFrameIndex(current => (current === nextFrame ? current : nextFrame));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    let drawRaf = 0;
    let preloadTimer = 0;
    let preloadIndex = 0;
    let isActive = true;

    const findNearestLoadedFrame = (targetFrame: number) => {
      const direct = frameCacheRef.current[targetFrame];
      if (direct?.complete && direct.naturalWidth > 0) return direct;

      for (let offset = 1; offset < CYBER_FRAME_COUNT; offset += 1) {
        const previous = frameCacheRef.current[targetFrame - offset];
        if (previous?.complete && previous.naturalWidth > 0) return previous;

        const next = frameCacheRef.current[targetFrame + offset];
        if (next?.complete && next.naturalWidth > 0) return next;
      }

      return currentImageRef.current;
    };

    const draw = () => {
      drawRaf = 0;
      if (!isActive) return;

      const image = findNearestLoadedFrame(requestedFrameRef.current);
      if (!image) return;

      currentImageRef.current = image;
      const width = canvas.width / dprRef.current;
      const height = canvas.height / dprRef.current;

      context.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
      drawCyberSequenceFrame(context, image, width, height);
    };

    const requestDraw = () => {
      if (drawRaf || !isActive) return;
      drawRaf = requestAnimationFrame(draw);
    };

    const loadFrame = (frame: number) => {
      const boundedFrame = clampFrameIndex(frame);
      const existing = frameCacheRef.current[boundedFrame];

      if (existing) {
        if (
          existing.complete &&
          existing.naturalWidth > 0 &&
          boundedFrame === requestedFrameRef.current
        ) {
          currentImageRef.current = existing;
          requestDraw();
        }

        return existing;
      }

      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (!isActive) return;

        if (boundedFrame === requestedFrameRef.current || !currentImageRef.current) {
          currentImageRef.current = image;
          requestDraw();
        }
      };
      image.src = getCyberFrameSrc(boundedFrame);
      frameCacheRef.current[boundedFrame] = image;

      return image;
    };

    const primeFrames = (centerFrame: number) => {
      loadFrame(centerFrame);

      for (let offset = 1; offset <= 10; offset += 1) {
        loadFrame(centerFrame - offset);
        loadFrame(centerFrame + offset);
      }
    };

    const preloadFrames = () => {
      if (!isActive || reduceMotion) return;

      for (let batch = 0; batch < 6 && preloadIndex < CYBER_FRAME_COUNT; batch += 1) {
        loadFrame(preloadIndex);
        preloadIndex += 1;
      }

      if (preloadIndex < CYBER_FRAME_COUNT) {
        preloadTimer = window.setTimeout(preloadFrames, 45);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      requestDraw();
    };

    const initialFrame = reduceMotion ? CYBER_INITIAL_FRAME : requestedFrameRef.current;
    requestedFrameRef.current = initialFrame;
    setFrameIndex(initialFrame);
    primeFrameRef.current = primeFrames;
    requestDrawRef.current = requestDraw;
    window.addEventListener('resize', resize);
    resize();
    primeFrames(initialFrame);
    preloadFrames();

    return () => {
      isActive = false;
      primeFrameRef.current = () => undefined;
      requestDrawRef.current = () => undefined;
      cancelAnimationFrame(drawRaf);
      window.clearTimeout(preloadTimer);
      window.removeEventListener('resize', resize);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="cyber-sequence"
      className="portfolio-cyber-sequence"
      aria-label="Cybernetic identity sequence"
    >
      <div className="portfolio-cyber-sticky">
        <canvas ref={canvasRef} className="portfolio-cyber-canvas" />
        <div className="portfolio-cyber-shade" />

        <motion.div className="portfolio-cyber-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <span>Pantheon signal / identity sequence</span>
          <h2>Cybernetic systems identity.</h2>
          <p>
            AI products, agent fleets, game prototypes, and launch systems orbit the same operating
            principle: make the system visible, then make it shippable.
          </p>
        </motion.div>

        <div className="portfolio-cyber-readout">
          <span>{String(frameIndex + 1).padStart(3, '0')}</span>
          <span>/</span>
          <span>{CYBER_FRAME_COUNT}</span>
        </div>

        <motion.div className="portfolio-cyber-frame-strip" style={{ y: stripY }}>
          {Array.from({ length: CYBER_STRIP_COUNT }).map((_, index) => {
            const activeIndex = Math.min(
              CYBER_STRIP_COUNT - 1,
              Math.floor((frameIndex / Math.max(1, CYBER_FRAME_COUNT - 1)) * CYBER_STRIP_COUNT)
            );
            const active = activeIndex === index;

            return (
              <span
                key={index}
                className={active ? 'is-active' : undefined}
                style={{ '--strip-delay': `${index * 38}ms` } as CSSProperties}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
