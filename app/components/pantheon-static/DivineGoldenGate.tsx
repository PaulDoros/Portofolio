'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import * as THREE from 'three';

interface DivineGoldenGateProps {
  onComplete: () => void;
  onGateClick?: () => void;
  copy?: Partial<DivineGoldenGateCopy>;
}

export interface DivineGoldenGateCopy {
  ariaLabel: string;
  badgeMobile: string;
  badgeDesktop: string;
  eyebrow: string;
  title: string;
  titleMobileLines: string[];
  subtitle: string;
  cta: string;
}

const defaultGateCopy: DivineGoldenGateCopy = {
  ariaLabel: 'Open the portfolio gate',
  badgeMobile: 'AI systems, games, agents.',
  badgeDesktop: 'AI systems, games, agents, automation, and shipped product work.',
  eyebrow: 'Portfolio Gateway',
  title: 'Paul Doros Portfolio',
  titleMobileLines: ['Paul Doros', 'Portfolio'],
  subtitle: 'Projects, agents, games, and automation',
  cta: 'Click to Enter the Portfolio',
};

type OverlayParticle = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  scale?: number;
  color?: string;
};

type AnimatedShaderObject = THREE.Object3D & {
  material?: {
    uniforms?: {
      time?: { value: number };
    };
  };
};

type FloatingRune = {
  mesh: THREE.Object3D | AnimatedShaderObject;
  speed?: number;
  axis?: 'x' | 'y' | 'z';
  isShader?: boolean;
};

const GATE_OPEN_HOLD_MS = 1350;
const REDIRECT_AFTER_WHITE_FADE_MS = 180;
const WHITE_FADE_INCREMENT = 0.02;
const WHITE_FADE_COLOR = 0xf7efd9;

function browserSupportsWebGL() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

const ringVertexShader = `
  uniform float time;
  uniform float isFire;
  varying vec2 vUv;
  void main() {
      vUv = uv;
      vec3 pos = position;
      float speed = isFire > 0.5 ? 4.0 : 1.5;
      float disp = sin(pos.x * 5.0 + time * speed) * cos(pos.y * 5.0 + time * (speed*0.8)) * 0.2;
      pos += normal * disp;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const ringFragmentShader = `
  uniform float time;
  uniform float isFire;
  varying vec2 vUv;
  void main() {
      float t = time * (isFire > 0.5 ? 3.0 : 1.0);
      float pattern = sin(vUv.x * 12.0 + t) * cos(vUv.y * 12.0 - t);

      vec3 fireColor = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.8, 0.0), pattern + 0.5);
      vec3 iceColor = mix(vec3(0.0, 0.3, 1.0), vec3(0.6, 0.9, 1.0), pattern + 0.5);

      vec3 finalColor = isFire > 0.5 ? fireColor : iceColor;
      float alpha = 0.8 + 0.4 * pattern;

      gl_FragColor = vec4(finalColor * 2.0, alpha);
  }
`;

const runeVertexShader = `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const runeFragmentShader = `
  uniform float time;
  uniform float isFire;
  uniform sampler2D runeTexture;
  varying vec2 vUv;

  void main() {
      vec4 texColor = texture2D(runeTexture, vUv);
      if (texColor.r < 0.1) discard;

      float t = time * (isFire > 0.5 ? 3.0 : 1.0);
      float pattern = sin(vUv.x * 20.0 + t) * cos(vUv.y * 20.0 - t);

      vec3 fireColor = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.8, 0.0), pattern + 0.5);
      vec3 iceColor = mix(vec3(0.0, 0.3, 1.0), vec3(0.6, 0.9, 1.0), pattern + 0.5);
      vec3 finalColor = isFire > 0.5 ? fireColor : iceColor;

      gl_FragColor = vec4(finalColor * 3.0, 1.0);
  }
`;

const portalVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const portalFragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform float uOpenProgress;
  varying vec2 vUv;
  varying vec3 vPosition;

  float neb_rnd(vec2 p) {
    p = fract(p * vec2(12.9898, 78.233));
    p += dot(p, p + 34.56);
    return fract(p.x * p.y);
  }

  float neb_noise(in vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
    float a = neb_rnd(i);
    float b = neb_rnd(i + vec2(1.0, 0.0));
    float c = neb_rnd(i + vec2(0.0, 1.0));
    float d = neb_rnd(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float neb_fbm(vec2 p) {
    float t = 0.0, a = 1.0;
    mat2 m = mat2(1.0, -0.5, 0.2, 1.2);
    for (int i = 0; i < 5; i++) {
      t += a * neb_noise(p);
      p *= 2.0 * m;
      a *= 0.5;
    }
    return t;
  }

  float neb_clouds(vec2 p) {
    float d = 1.0, t = 0.0;
    for (float i = 0.0; i < 3.0; i++) {
      float a = d * neb_fbm(i * 10.0 + p.x * 0.2 + 0.2 * (1.0 + i) * p.y + d + i * i + p);
      t = mix(t, d, a);
      d = a;
      p *= 2.0 / (i + 1.0);
    }
    return t;
  }

  vec3 getNebulaColor(vec2 fragCoord, vec2 res, float t) {
    float MN = min(res.x, res.y);
    vec2 uv = (fragCoord - 0.5 * res) / MN;
    vec2 st = uv * vec2(2.0, 1.0);
    vec3 col = vec3(0.0);
    float bg = neb_clouds(vec2(st.x + t * 0.5, -st.y));
    uv *= 1.0 - 0.3 * (sin(t * 0.2) * 0.5 + 0.5);
    for (float i = 1.0; i < 12.0; i++) {
      uv += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i * i + t * 0.5 + 0.1 * uv.x);
      vec2 p = uv;
      float d = length(p);
      col += 0.00125 / d * (cos(sin(i) * vec3(1.0, 2.0, 3.0)) + 1.0);
      float b = neb_noise(i + p + bg * 1.731);
      col += 0.002 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
      col = mix(col, vec3(bg * 0.25, bg * 0.137, bg * 0.05), d);
    }
    return col;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 5; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }

  vec3 getFire(vec2 uv, float t) {
    vec2 p = uv * vec2(2.0, 3.5);
    p.y -= t * 1.5;

    float q = fbm(p - t * 0.4);
    vec2 r = vec2(fbm(p + q + t * 0.2 - p.x - p.y), fbm(p + q - t * 0.3));
    float f = fbm(p + r);

    f *= mix(1.2, 0.0, clamp(uv.y * 1.5 - 0.2, 0.0, 1.0));

    vec3 col = mix(vec3(0.05, 0.0, 0.0), vec3(0.6, 0.0, 0.0), f);
    col = mix(col, vec3(1.0, 0.3, 0.0), smoothstep(0.3, 0.6, f));
    col = mix(col, vec3(1.0, 0.8, 0.0), smoothstep(0.5, 0.8, f));
    col = mix(col, vec3(1.0, 1.0, 0.8), smoothstep(0.8, 1.0, f));

    return col;
  }

  vec3 getIce(vec2 uv, float t) {
    vec2 p = uv * vec2(3.0, 3.0);
    p.x += t * 0.05;
    p.y -= t * 0.1;

    float f = 0.0;
    float w = 0.5;
    vec2 p2 = p;

    for(int i = 0; i < 5; i++) {
      f += w * abs(noise(p2) * 2.0 - 1.0);
      p2 *= 2.0;
      w *= 0.5;
    }

    f = 1.0 - f;
    f = pow(f, 2.0);

    vec3 col = mix(vec3(0.0, 0.05, 0.15), vec3(0.0, 0.3, 0.6), f);
    col = mix(col, vec3(0.2, 0.7, 0.9), smoothstep(0.3, 0.7, f));
    col = mix(col, vec3(0.8, 0.95, 1.0), smoothstep(0.6, 1.0, f));
    col *= mix(1.0, 0.2, clamp(uv.y * 1.5, 0.0, 1.0));

    return col;
  }

  void main() {
    vec2 uv = vec2(vPosition.x / 150.0, vPosition.y / 150.0);
    float t = time * 0.8;

    float boundDistort = fbm(vec2(uv.y * 4.0, t * 0.5)) * 0.15;
    float splitDist = uOpenProgress * 2.5;

    vec2 fireUv = uv;
    fireUv.x += splitDist;
    vec2 iceUv = uv;
    iceUv.x -= splitDist;

    vec3 fireCol = getFire(fireUv, t);
    vec3 iceCol = getIce(iceUv, t);

    float leftEdge = boundDistort - splitDist;
    float rightEdge = boundDistort + splitDist;

    vec3 finalCol = vec3(0.0);
    vec3 starSky = getNebulaColor(gl_FragCoord.xy, resolution, time);

    if (uv.x < leftEdge) {
        finalCol = fireCol;
    } else if (uv.x > rightEdge) {
        finalCol = iceCol;
    } else {
        finalCol = starSky;
    }

    float distToLeft = abs(uv.x - leftEdge);
    float distToRight = abs(uv.x - rightEdge);
    float edgeDist = min(distToLeft, distToRight);

    float coreIntensity = exp(-edgeDist * 35.0);
    float coreNoise = fbm(vec2(uv.y * 15.0 - t * 3.0, t * 2.0));
    finalCol += vec3(1.0, 0.9, 0.8) * coreIntensity * (0.5 + 0.5 * coreNoise);

    float glowIntensity = exp(-edgeDist * 8.0);
    vec3 glowColor = mix(vec3(1.0, 0.2, 0.0), vec3(0.0, 0.6, 1.0), smoothstep(leftEdge, rightEdge, uv.x));
    if (splitDist > 0.05) {
        if (uv.x < boundDistort) glowColor = vec3(1.0, 0.2, 0.0);
        else glowColor = vec3(0.0, 0.6, 1.0);
    }

    finalCol += glowColor * glowIntensity * coreNoise;

    float bottomDarkness = smoothstep(0.1, -0.4, uv.y);
    finalCol = mix(finalCol, vec3(0.01, 0.01, 0.015), bottomDarkness);

    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

function getCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 220, 150, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 200, 100, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 180, 80, 0.0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createYinYangTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  const cx = 512;
  const cy = 512;
  const r = 480;
  ctx.clearRect(0, 0, 1024, 1024);

  ctx.fillStyle = '#221508';
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI / 2, Math.PI * 1.5);
  ctx.fill();

  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2);
  ctx.fill();

  ctx.fillStyle = '#221508';
  ctx.beginPath();
  ctx.arc(cx, cy - r / 2, r / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(cx, cy + r / 2, r / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(cx, cy - r / 2, r / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#221508';
  ctx.beginPath();
  ctx.arc(cx, cy + r / 2, r / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#3d2e1f');
  grad.addColorStop(0.15, '#5c4028');
  grad.addColorStop(0.5, '#7d5e3f');
  grad.addColorStop(0.85, '#5c4028');
  grad.addColorStop(1, '#3d2e1f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#000000';
  for (let i = 0; i < 3000; i += 1) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const w = Math.random() * 2 + 1;
    const h = Math.random() * 80 + 10;
    ctx.globalAlpha = Math.random() * 0.15;
    ctx.fillRect(x, y, w, h);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createEngravingTexture(type: 'door' | 'pillar' | 'arch') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';

  const runes =
    'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ✦✧❂※ΣΨζξΩ§ϗΔΘΛΞΠΦ';

  if (type === 'door') {
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, 944, 944);
    ctx.lineWidth = 6;
    ctx.strokeRect(70, 70, 884, 884);
    ctx.font = 'bold 45px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const columns = [140, 280, 420, 600, 740, 880];
    for (const x of columns) {
      for (let y = 140; y <= 880; y += 60) {
        if (x > 300 && x < 700 && y > 350 && y < 650) {
          continue;
        }

        ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, y);
      }
    }
  } else if (type === 'pillar') {
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#ffd700';
    for (let x = 0; x <= 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 150, 1024, 150);
    ctx.fillRect(0, 450, 1024, 150);
    ctx.fillRect(0, 750, 1024, 150);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 38px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let x = 32; x < 1024; x += 55) {
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 195);
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 255);
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 495);
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 555);
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 795);
      ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, 855);
    }
  } else {
    ctx.font = 'bold 90px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let y = 100; y < 1024; y += 250) {
      for (let x = 60; x < 1024; x += 120) {
        ctx.fillText(runes[Math.floor(Math.random() * runes.length)], x, y);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;

  if (type === 'arch') {
    tex.repeat.set(12, 1);
  } else if (type === 'pillar') {
    tex.repeat.set(2, 3);
  } else {
    tex.repeat.set(1, 3);
  }

  return tex;
}

function createStoneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 80;
    data[i] = Math.max(0, Math.min(255, data[i] + noise));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 4;
  for (let y = 0; y < 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    for (let x = 0; x < 512; x += 128) {
      const offset = y % 128 === 0 ? 0 : 64;
      ctx.beginPath();
      ctx.moveTo(x + offset, y);
      ctx.lineTo(x + offset, y + 64);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  return tex;
}

function buildOverlayParticles(count: number, type: 'ember' | 'snow'): OverlayParticle[] {
  return Array.from({ length: count }, () => ({
    left: type === 'ember' ? Math.random() * 45 : Math.random() * 45 + 55,
    size: Math.random() * (type === 'ember' ? 5 : 4) + (type === 'ember' ? 2 : 1),
    duration: Math.random() * (type === 'ember' ? 3 : 4) + 2,
    delay: Math.random() * 5,
    drift: (Math.random() - (type === 'ember' ? 0.2 : 0.8)) * 30,
    opacity: type === 'ember' ? 1 : Math.random() * 0.6 + 0.4,
    scale: type === 'snow' ? Math.random() * 0.5 + 0.5 : undefined,
    color: type === 'ember' ? (Math.random() > 0.7 ? '#fff' : '#ff5500') : '#ffffff',
  }));
}

export function DivineGoldenGate({
  onComplete,
  onGateClick,
  copy,
}: DivineGoldenGateProps) {
  const gateCopy = { ...defaultGateCopy, ...copy };
  const mountRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const sequenceTimeoutsRef = useRef<number[]>([]);
  const isOpeningRef = useRef(false);
  const completionTriggeredRef = useRef(false);
  const gateOpenHoldStartedAtRef = useRef<number | null>(null);
  const whiteFadeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animatedObjectsRef = useRef<AnimatedShaderObject[]>([]);

  const [uiVisible, setUiVisible] = useState(false);
  const [gateOpened, setGateOpened] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [embers, setEmbers] = useState<OverlayParticle[]>([]);
  const [snow, setSnow] = useState<OverlayParticle[]>([]);

  useEffect(() => {
    setEmbers(buildOverlayParticles(40, 'ember'));
    setSnow(buildOverlayParticles(80, 'snow'));
  }, []);

  useEffect(() => {
    if (!browserSupportsWebGL()) {
      setWebglFailed(true);
      setUiVisible(true);
      return undefined;
    }

    const cloudTexture = getCloudTexture();
    const woodTex = createWoodTexture();
    const doorRuneTex = createEngravingTexture('door');
    const pillarRuneTex = createEngravingTexture('pillar');
    const archRuneTex = createEngravingTexture('arch');
    const yinYangTex = createYinYangTexture();
    const stoneTex = createStoneTexture();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0e, 0.005);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 12, 55);

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      setUiVisible(true);
      return undefined;
    }

    try {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x0a0a0e);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;
    } catch {
      renderer.dispose();
      setWebglFailed(true);
      setUiVisible(true);
      return undefined;
    }

    const mountEl = mountRef.current;

    if (mountEl) {
      mountEl.appendChild(renderer.domElement);
    }

    const clock = new THREE.Clock();
    scene.add(new THREE.AmbientLight(0x404050, 0.8));

    const hemiLight = new THREE.HemisphereLight(0x88bbff, 0x334422, 0.6);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffddbb, 0.8);
    dirLight.position.set(30, 40, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -40;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.top = 40;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);

    const frontLight = new THREE.PointLight(0xfff0dd, 1.2, 200);
    frontLight.position.set(0, 15, 40);
    scene.add(frontLight);

    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uOpenProgress: { value: 0 },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const portalMesh = new THREE.Mesh(
      new THREE.SphereGeometry(300, 64, 64),
      portalMaterial
    );
    portalMesh.position.set(0, 0, 0);
    scene.add(portalMesh);

    const stairsGroup = new THREE.Group();
    const stairMat = new THREE.MeshStandardMaterial({
      color: 0x9a8b7a,
      roughness: 0.9,
      metalness: 0.1,
      map: stoneTex,
      bumpMap: stoneTex,
      bumpScale: 0.4,
    });

    const landing = new THREE.Mesh(new THREE.BoxGeometry(60, 2, 25), stairMat);
    landing.position.set(0, -0.5, 30);
    landing.castShadow = true;
    landing.receiveShadow = true;
    stairsGroup.add(landing);

    for (let i = 0; i < 15; i += 1) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(40, 1.5, 3.2), stairMat);
      step.position.set(0, i * 1.5, i * -2.5 + 20);
      step.castShadow = true;
      step.receiveShadow = true;
      stairsGroup.add(step);

      const lip = new THREE.Mesh(new THREE.BoxGeometry(40.5, 0.4, 3.6), stairMat);
      lip.position.set(0, i * 1.5 + 0.55, i * -2.5 + 20.2);
      lip.castShadow = true;
      lip.receiveShadow = true;
      stairsGroup.add(lip);

      const wallHeight = i * 1.5 + 7;
      const wallY = (i * 1.5 - 3) / 2;

      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(3, wallHeight, 3.2), stairMat);
      leftWall.position.set(-21.5, wallY, i * -2.5 + 20);
      leftWall.castShadow = true;
      leftWall.receiveShadow = true;
      stairsGroup.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(3, wallHeight, 3.2), stairMat);
      rightWall.position.set(21.5, wallY, i * -2.5 + 20);
      rightWall.castShadow = true;
      rightWall.receiveShadow = true;
      stairsGroup.add(rightWall);

      const capGeo = new THREE.BoxGeometry(3.5, 0.6, 3.6);
      const leftCap = new THREE.Mesh(capGeo, stairMat);
      leftCap.position.set(-21.5, i * 1.5 + 1.5, i * -2.5 + 20);
      leftCap.castShadow = true;
      leftCap.receiveShadow = true;
      stairsGroup.add(leftCap);

      const rightCap = new THREE.Mesh(capGeo, stairMat);
      rightCap.position.set(21.5, i * 1.5 + 1.5, i * -2.5 + 20);
      rightCap.castShadow = true;
      rightCap.receiveShadow = true;
      stairsGroup.add(rightCap);
    }

    const threshold = new THREE.Mesh(new THREE.BoxGeometry(44, 1.5, 12), stairMat);
    threshold.position.set(0, 21.0, -19.5);
    threshold.castShadow = true;
    threshold.receiveShadow = true;
    stairsGroup.add(threshold);
    scene.add(stairsGroup);

    const grassGeo = new THREE.ConeGeometry(0.12, 1.2, 3);
    grassGeo.translate(0, 0.6, 0);

    const customGrassUniforms = { time: { value: 0 } };
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x6a8d33,
      roughness: 0.8,
      metalness: 0.1,
    });

    grassMat.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.time = customGrassUniforms.time;
      shader.vertexShader = `uniform float time;\n${shader.vertexShader}`;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = vec3( position );
        vec4 worldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float windPhase = time * 1.5 + worldPos.x * 0.2 + worldPos.z * 0.2;
        float windStrength = 0.25 * position.y;
        transformed.x += sin(windPhase) * windStrength;
        transformed.z += cos(windPhase * 0.8) * windStrength;
        `
      );
    };

    const grassCount = 6000;
    const grassInstanced = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);
    grassInstanced.castShadow = true;
    grassInstanced.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let grassIdx = 0;

    for (let i = 0; i < 15; i += 1) {
      const stepY = i * 1.5 + 0.75;
      const stepZ = i * -2.5 + 20.2;
      const wallCapY = i * 1.5 + 1.8;

      for (let j = 0; j < 200; j += 1) {
        if (grassIdx >= grassCount) {
          break;
        }

        const isLeft = Math.random() > 0.5;
        const isOnWall = Math.random() > 0.4;
        let xPos: number;
        let yPos: number;

        if (isOnWall) {
          xPos = (isLeft ? -21.5 : 21.5) + (Math.random() - 0.5) * 2.5;
          yPos = wallCapY;
        } else {
          const edgeOffset = isLeft ? -1 : 1;
          xPos = (19 - Math.random() * 6) * edgeOffset;
          yPos = stepY;
        }

        const zPos = stepZ + (Math.random() - 0.5) * 3;
        dummy.position.set(xPos, yPos, zPos);
        dummy.rotation.set(
          (Math.random() - 0.5) * 0.5,
          Math.random() * Math.PI,
          (Math.random() - 0.5) * 0.5
        );
        const s = 0.5 + Math.random();
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        grassInstanced.setMatrixAt(grassIdx, dummy.matrix);
        grassIdx += 1;
      }
    }

    while (grassIdx < grassCount) {
      const xPos = (Math.random() - 0.5) * 58;
      const zPos = 18 + Math.random() * 24;
      if (Math.abs(xPos) < 12 && zPos < 35 && Math.random() > 0.15) {
        continue;
      }

      dummy.position.set(xPos, 0.5, zPos);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.5,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.5
      );
      const s = 0.6 + Math.random() * 1.4;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      grassInstanced.setMatrixAt(grassIdx, dummy.matrix);
      grassIdx += 1;
    }

    grassInstanced.instanceMatrix.needsUpdate = true;
    scene.add(grassInstanced);

    const stairLight = new THREE.PointLight(0xffeedd, 1.5, 120);
    stairLight.position.set(0, 10, 25);
    scene.add(stairLight);

    const floatingRunes: FloatingRune[] = [];

    const createOrnateGateLeaf = (isLeft: boolean) => {
      const gateGroup = new THREE.Group();
      const themeColor = isLeft ? 0xff4400 : 0x00aaff;

      const doorMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.85,
        map: woodTex,
        bumpMap: doorRuneTex,
        bumpScale: 0.15,
        emissiveMap: doorRuneTex,
        emissive: themeColor,
        emissiveIntensity: 1.0,
      });

      gateGroup.userData = { isLeft, doorMat };

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.75,
        roughness: 0.35,
        bumpMap: doorRuneTex,
        bumpScale: 0.05,
        emissive: 0x1a1100,
      });

      const panel = new THREE.Mesh(new THREE.BoxGeometry(14.0, 34.0, 1.5), doorMat);
      panel.castShadow = true;
      panel.receiveShadow = true;
      gateGroup.add(panel);

      gateGroup.add(new THREE.Mesh(new THREE.BoxGeometry(13.6, 33.6, 1.8), goldMat));
      gateGroup.add(new THREE.Mesh(new THREE.BoxGeometry(11.6, 31.6, 2.0), doorMat));

      const yySize = 8;
      const yyGeo = new THREE.PlaneGeometry(yySize / 2, yySize);
      const uvs = yyGeo.attributes.uv.array as unknown as number[];

      if (isLeft) {
        uvs[0] = 0;
        uvs[1] = 1;
        uvs[2] = 0.5;
        uvs[3] = 1;
        uvs[4] = 0;
        uvs[5] = 0;
        uvs[6] = 0.5;
        uvs[7] = 0;
      } else {
        uvs[0] = 0.5;
        uvs[1] = 1;
        uvs[2] = 1;
        uvs[3] = 1;
        uvs[4] = 0.5;
        uvs[5] = 0;
        uvs[6] = 1;
        uvs[7] = 0;
      }

      const yyMat = new THREE.MeshStandardMaterial({
        map: yinYangTex,
        transparent: true,
        alphaTest: 0.1,
        metalness: 0.9,
        roughness: 0.1,
        emissiveMap: yinYangTex,
        emissive: 0xffaa00,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide,
      });

      const yyMesh = new THREE.Mesh(yyGeo, yyMat);
      yyMesh.position.set(isLeft ? 5.0 : -5.0, 0, 1.6);
      gateGroup.add(yyMesh);

      const yyBack = new THREE.Mesh(
        yyGeo.clone(),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          side: THREE.DoubleSide,
          transparent: true,
          alphaTest: 0.1,
          map: yinYangTex,
        })
      );
      yyBack.position.set(isLeft ? 5.0 : -5.0, 0, 1.55);
      gateGroup.add(yyBack);

      const createOrnateSquare = (yPos: number) => {
        const sqGroup = new THREE.Group();
        const outFrame = new THREE.Mesh(new THREE.BoxGeometry(7.2, 5.6, 0.6), goldMat);
        outFrame.castShadow = true;
        sqGroup.add(outFrame);
        sqGroup.add(new THREE.Mesh(new THREE.BoxGeometry(5.6, 4.0, 0.8), doorMat));

        const centerDia = new THREE.Mesh(new THREE.OctahedronGeometry(1.8, 0), goldMat);
        centerDia.scale.set(1, 1, 0.4);
        centerDia.position.z = 0.5;
        sqGroup.add(centerDia);
        sqGroup.position.set(0, yPos, 1.0);
        return sqGroup;
      };

      gateGroup.add(createOrnateSquare(13.5));
      gateGroup.add(createOrnateSquare(-13.5));

      for (let i = 0; i < 3; i += 1) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(5.0, 0.15, 16, 4), goldMat);
        ring.rotation.z = Math.PI / 4;
        ring.position.set(0, -13 + i * 13, 1.1);
        gateGroup.add(ring);
      }

      return gateGroup;
    };

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-14.0, 38.5, -18);
    const leftGate = createOrnateGateLeaf(true);
    leftGate.position.set(7.0, 0, 0);
    leftHinge.add(leftGate);
    scene.add(leftHinge);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(14.0, 38.5, -18);
    const rightGate = createOrnateGateLeaf(false);
    rightGate.position.set(-7.0, 0, 0);
    rightHinge.add(rightGate);
    scene.add(rightHinge);

    const createOrnateColumn = (isLeft: boolean) => {
      const colGroup = new THREE.Group();
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        metalness: 0.75,
        roughness: 0.35,
      });
      const themeColor = isLeft ? 0xff4400 : 0x00aaff;
      const columnBodyMat = new THREE.MeshStandardMaterial({
        color: 0x221508,
        metalness: 0.8,
        roughness: 0.4,
        map: pillarRuneTex,
      });

      const base1 = new THREE.Mesh(new THREE.BoxGeometry(7, 2, 7), columnBodyMat);
      base1.position.y = 1;
      base1.castShadow = true;
      base1.receiveShadow = true;
      colGroup.add(base1);

      const base2 = new THREE.Mesh(new THREE.BoxGeometry(6, 2, 6), goldMat);
      base2.position.y = 3;
      colGroup.add(base2);

      const runeShaderMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          isFire: { value: isLeft ? 1.0 : 0.0 },
          runeTexture: { value: pillarRuneTex },
        },
        vertexShader: runeVertexShader,
        fragmentShader: runeFragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const shaftBody = new THREE.Mesh(
        new THREE.CylinderGeometry(2, 2.5, 30, 32),
        columnBodyMat
      );
      shaftBody.position.y = 19;
      shaftBody.castShadow = true;
      shaftBody.receiveShadow = true;
      colGroup.add(shaftBody);

      const shaftRunes = new THREE.Mesh(
        new THREE.CylinderGeometry(2.01, 2.51, 30, 32),
        runeShaderMat
      );
      shaftRunes.position.y = 19;
      colGroup.add(shaftRunes);
      animatedObjectsRef.current.push(shaftRunes as AnimatedShaderObject);

      for (let i = 0; i < 4; i += 1) {
        const ringGroup = new THREE.Group();
        ringGroup.position.y = 8 + i * 7;

        const ringShaderMat = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            isFire: { value: isLeft ? 1.0 : 0.0 },
          },
          vertexShader: ringVertexShader,
          fragmentShader: ringFragmentShader,
          transparent: true,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
        });

        const coreRing = new THREE.Mesh(
          new THREE.TorusGeometry(2.8, 0.25, 32, 64),
          ringShaderMat
        );
        coreRing.rotation.x = Math.PI / 2;
        ringGroup.add(coreRing);
        animatedObjectsRef.current.push(coreRing as AnimatedShaderObject);

        const pGeo = new THREE.BufferGeometry();
        const pCount = isLeft ? 500 : 400;
        const pPos = new Float32Array(pCount * 3);
        const pPhases = new Float32Array(pCount);

        for (let j = 0; j < pCount; j += 1) {
          const angle = Math.random() * Math.PI * 2;
          const radiusOffset = isLeft
            ? (Math.random() - 0.2) * 0.8
            : (Math.random() - 0.5) * 1.5;
          const r = 2.8 + radiusOffset;
          pPos[j * 3] = Math.cos(angle) * r;
          pPos[j * 3 + 1] = isLeft
            ? (Math.random() - 0.5) * 1.2
            : (Math.random() - 0.5) * 0.2;
          pPos[j * 3 + 2] = Math.sin(angle) * r;
          pPhases[j] = Math.random() * Math.PI * 2;
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('phase', new THREE.BufferAttribute(pPhases, 1));

        const shaderMat = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(themeColor) },
            isFire: { value: isLeft ? 1.0 : 0.0 },
          },
          vertexShader: `
            uniform float time;
            uniform float isFire;
            attribute float phase;
            varying float vAlpha;
            void main() {
                vec3 pos = position;
                if (isFire > 0.5) {
                    pos.y += sin(time * 4.0 + phase) * 0.5;
                    pos.x += cos(time * 3.0 + phase) * 0.2;
                    pos.z += sin(time * 3.0 + phase) * 0.2;
                    vAlpha = (sin(time * 6.0 + phase) + 1.0) * 0.5;
                } else {
                    pos.y += sin(time * 1.0 + phase) * 0.1;
                    vAlpha = (sin(time * 2.0 + phase) + 1.0) * 0.5;
                }
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = isFire > 0.5 ? (20.0 / -mvPosition.z) : (12.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform float isFire;
            varying float vAlpha;
            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if(dist > 0.5) discard;
                float alpha = isFire > 0.5 ? (0.5 - dist) * 2.0 * vAlpha : pow(1.0 - (dist * 2.0), 2.0) * vAlpha;
                gl_FragColor = vec4(color, alpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const ringMesh = new THREE.Points(pGeo, shaderMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringGroup.add(ringMesh);
        colGroup.add(ringGroup);

        floatingRunes.push({ mesh: ringGroup, speed: 0.015 * (i % 2 === 0 ? 1 : -1), axis: 'y' });
        floatingRunes.push({ mesh: ringMesh as AnimatedShaderObject, isShader: true });
      }

      const cap1 = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2, 2, 16), goldMat);
      cap1.position.y = 35;
      colGroup.add(cap1);

      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(6, 1.5, 6), goldMat);
      cap2.position.y = 36.75;
      colGroup.add(cap2);

      return colGroup;
    };

    const colL = createOrnateColumn(true);
    colL.position.set(-16, 21, -18);
    scene.add(colL);

    const colR = createOrnateColumn(false);
    colR.position.set(16, 21, -18);
    scene.add(colR);

    const archGroup = new THREE.Group();
    const archGoldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.75,
      roughness: 0.35,
      bumpMap: archRuneTex,
      bumpScale: 0.08,
    });
    const archDarkMat = new THREE.MeshStandardMaterial({
      color: 0x221508,
      metalness: 0.8,
      roughness: 0.4,
      bumpMap: archRuneTex,
      bumpScale: 0.15,
      emissiveMap: archRuneTex,
      emissive: 0xffcc00,
      emissiveIntensity: 0.5,
    });
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0xffea00,
      emissive: 0xffaa00,
      emissiveIntensity: 2.0,
    });

    const archTop = new THREE.Mesh(
      new THREE.TorusGeometry(16, 3, 32, 64, Math.PI),
      archGoldMat
    );
    archTop.castShadow = true;
    archGroup.add(archTop);

    const archInner = new THREE.Mesh(
      new THREE.TorusGeometry(13.5, 1.5, 32, 64, Math.PI),
      archDarkMat
    );
    archInner.position.z = 1.5;
    archGroup.add(archInner);

    const keystone = new THREE.Mesh(new THREE.BoxGeometry(4.5, 8, 8), archGoldMat);
    keystone.position.set(0, 16, 0);
    archGroup.add(keystone);

    for (let i = 1; i < 6; i += 1) {
      const angle = (Math.PI / 6) * i;
      const rMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), runeMat);
      rMesh.position.set(Math.cos(angle) * 13.5, Math.sin(angle) * 13.5, 2.5);
      archGroup.add(rMesh);
      floatingRunes.push({ mesh: rMesh, speed: 0.02, axis: 'y' });
    }

    const celestialGroup = new THREE.Group();
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xffea00,
      emissive: 0xff8800,
      emissiveIntensity: 2.5,
      metalness: 0.8,
      roughness: 0.1,
    });
    const eye = new THREE.Mesh(new THREE.OctahedronGeometry(2.5, 0), eyeMat);
    eye.position.set(0, 6.5, 1.5);
    celestialGroup.add(eye);
    floatingRunes.push({ mesh: eye, speed: 0.01, axis: 'y' });

    const astroRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.15, 16, 64), archGoldMat);
    astroRing1.position.copy(eye.position);
    astroRing1.rotation.x = Math.PI / 2;
    celestialGroup.add(astroRing1);
    floatingRunes.push({ mesh: astroRing1, speed: 0.008, axis: 'x' });

    const astroRing2 = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.1, 16, 64), archGoldMat);
    astroRing2.position.copy(eye.position);
    astroRing2.rotation.y = Math.PI / 4;
    celestialGroup.add(astroRing2);
    floatingRunes.push({ mesh: astroRing2, speed: -0.012, axis: 'z' });

    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.25, 3.5, 4), archGoldMat);
      ray.position.set(Math.cos(angle) * 7.5, 6.5 + Math.sin(angle) * 7.5, 1.5);
      ray.rotation.z = angle - Math.PI / 2;
      celestialGroup.add(ray);
    }

    archGroup.add(celestialGroup);
    archGroup.position.set(0, 58.5, -18);
    scene.add(archGroup);

    const createCloud = (y: number, zOffset: number, scaleMult = 1, opacity = 0.1) => {
      const cloud = new THREE.Mesh(
        new THREE.PlaneGeometry(50 * scaleMult, 50 * scaleMult),
        new THREE.MeshBasicMaterial({
          map: cloudTexture,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          color: 0xffeecc,
        })
      );
      cloud.position.set(
        (Math.random() - 0.5) * 120 * scaleMult,
        y,
        zOffset + (Math.random() - 0.5) * 20
      );
      cloud.rotation.z = Math.random() * Math.PI;
      cloud.scale.set(1 + Math.random(), 1 + Math.random(), 1);
      return cloud;
    };

    for (let i = 0; i < 40; i += 1) {
      scene.add(createCloud(Math.random() * 30 + 10, -20, 1, 0.1));
    }

    for (let i = 0; i < 40; i += 1) {
      const c = createCloud(Math.random() * 10 - 5, (Math.random() - 0.5) * 60, 2, 0.02);
      c.rotation.x = -Math.PI / 4 + Math.random() * 0.2;
      scene.add(c);
    }

    const pGeometry = new THREE.BufferGeometry();
    const pCount = 3000;
    const posArray = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 150;
      posArray[i + 1] = Math.random() * 80;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }
    pGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particles = new THREE.Points(
      pGeometry,
      new THREE.PointsMaterial({
        size: 0.4,
        color: 0xffe066,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(particles);

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();
      portalMaterial.uniforms.time.value = delta;
      customGrassUniforms.time.value = delta;

      const leftDoorMat = leftGate.userData.doorMat as THREE.MeshStandardMaterial;
      const rightDoorMat = rightGate.userData.doorMat as THREE.MeshStandardMaterial;
      leftDoorMat.emissiveIntensity = 1.0 + Math.sin(delta * 4.0) * 0.5;
      const icePulse = Math.sin(delta * 3.0) * 0.4 + Math.cos(delta * 7.0) * 0.2;
      rightDoorMat.emissiveIntensity = 1.0 + icePulse;

      animatedObjectsRef.current.forEach((obj) => {
        if (obj.material?.uniforms?.time) {
          obj.material.uniforms.time.value = delta;
        }
      });

      floatingRunes.forEach((rune) => {
        if (rune.axis === 'y' && typeof rune.speed === 'number') {
          rune.mesh.rotation.y += rune.speed;
        }
        if (rune.axis === 'z' && typeof rune.speed === 'number') {
          rune.mesh.rotation.z += rune.speed;
        }
        if (rune.axis === 'x' && typeof rune.speed === 'number') {
          rune.mesh.rotation.x += rune.speed;
        }
        if (rune.isShader) {
          const shaderMesh = rune.mesh as AnimatedShaderObject;
          if (shaderMesh.material?.uniforms?.time) {
            shaderMesh.material.uniforms.time.value = delta;
          }
        }
      });

      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.1 + Math.random() * 0.1;
        if (positions[i + 1] > 100) {
          positions[i + 1] = 0;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;

      if (isOpeningRef.current) {
        if (portalMaterial.uniforms.uOpenProgress.value < 1.0) {
          portalMaterial.uniforms.uOpenProgress.value = Math.min(
            1,
            portalMaterial.uniforms.uOpenProgress.value + 0.002
          );
        }

        if (leftHinge.rotation.y < Math.PI / 1.5) {
          leftHinge.rotation.y += 0.004;
          rightHinge.rotation.y -= 0.004;
        }

        if (camera.position.z > -10) {
          camera.position.z -= 0.3;
          camera.position.y =
            12 + (38 - 12) * Math.pow(1 - (camera.position.z + 10) / 65, 2);
          camera.lookAt(0, 38, -18);
        } else {
          if (gateOpenHoldStartedAtRef.current === null) {
            gateOpenHoldStartedAtRef.current = performance.now();
          }

          const gateOpenHoldElapsed =
            performance.now() - gateOpenHoldStartedAtRef.current;

          if (gateOpenHoldElapsed >= GATE_OPEN_HOLD_MS) {
            whiteFadeRef.current = Math.min(
              1,
              whiteFadeRef.current + WHITE_FADE_INCREMENT
            );
          }

          renderer.setClearColor(WHITE_FADE_COLOR, whiteFadeRef.current);
          camera.lookAt(0, 38, -18);

          if (whiteFadeRef.current >= 1 && !completionTriggeredRef.current) {
            completionTriggeredRef.current = true;
            const completionTimeout = window.setTimeout(() => {
              onComplete();
            }, REDIRECT_AFTER_WHITE_FADE_MS);
            sequenceTimeoutsRef.current.push(completionTimeout);
          }
        }
      } else {
        renderer.setClearColor(0x0a0a0e, 1);
        gateOpenHoldStartedAtRef.current = null;
        whiteFadeRef.current = 0;
        camera.position.x += (mouseRef.current.x * 8 - camera.position.x) * 0.05;
        const targetY = Math.max(-8.0, -mouseRef.current.y * 22 + 10);
        camera.position.y += (targetY - camera.position.y) * 0.05;
        const lookAtY = 32 + (10 - camera.position.y) * 0.6;
        camera.lookAt(0, lookAtY, -18);
      }

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      portalMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX - window.innerWidth / 2) * 0.005;
      mouseRef.current.y = (e.clientY - window.innerHeight / 2) * 0.005;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    const timer = window.setTimeout(() => {
      setUiVisible(true);
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(timer);

      sequenceTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      sequenceTimeoutsRef.current = [];

      if (requestRef.current !== null) {
        window.cancelAnimationFrame(requestRef.current);
      }

      renderer.dispose();

      if (mountEl?.contains(renderer.domElement)) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, [onComplete]);

  const handleGateClick = () => {
    if (gateOpened) {
      return;
    }

    setGateOpened(true);
    setUiVisible(false);
    isOpeningRef.current = true;
    completionTriggeredRef.current = false;
    gateOpenHoldStartedAtRef.current = null;
    whiteFadeRef.current = 0;
    onGateClick?.();

    if (webglFailed) {
      const completionTimeout = window.setTimeout(() => {
        onComplete();
      }, 950);
      sequenceTimeoutsRef.current.push(completionTimeout);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    handleGateClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={gateCopy.ariaLabel}
      className="relative h-screen w-full cursor-pointer overflow-hidden bg-[#050508] font-cinzel outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      onClick={handleGateClick}
      onKeyDown={handleKeyDown}
    >
      <style>{`
        .pantheon-divine-gate-breathe {
          animation: pantheon-divine-gate-breathe 3s infinite ease-in-out;
        }

        @keyframes pantheon-divine-gate-breathe {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-5px);
          }
        }

        @keyframes pantheon-divine-gate-ember-rise {
          0% {
            transform: translateY(120vh) translateX(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) translateX(calc(var(--drift) * 1vw))
              scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes pantheon-divine-gate-snow-fall {
          0% {
            transform: translateY(-10vh) translateX(0) scale(var(--scale))
              rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--max-opacity);
          }
          100% {
            transform: translateY(110vh) translateX(calc(var(--drift) * 1vw))
              scale(var(--scale)) rotate(360deg);
            opacity: 0;
          }
        }

        .pantheon-divine-gate-ember {
          animation: pantheon-divine-gate-ember-rise linear infinite;
        }

        .pantheon-divine-gate-snow {
          animation: pantheon-divine-gate-snow-fall linear infinite;
        }

      `}</style>

      {webglFailed ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_50%_25%,rgba(255,215,0,0.14),transparent_25%),radial-gradient(circle_at_20%_78%,rgba(255,85,0,0.16),transparent_28%),radial-gradient(circle_at_80%_78%,rgba(0,170,255,0.15),transparent_28%),#050508]">
          <div className="absolute left-1/2 top-[18%] h-[68%] w-[42rem] max-w-[82vw] -translate-x-1/2 rounded-t-full border border-[#D4AF37]/40 bg-[linear-gradient(180deg,rgba(255,215,0,0.16),rgba(6,8,12,0.88)_38%,rgba(2,3,5,0.96))] shadow-[0_0_75px_rgba(212,175,55,0.22)]" />
          <div
            className={`absolute left-1/2 top-[23%] h-[57%] w-[16rem] max-w-[36vw] origin-left rounded-tl-[14rem] border border-[#D4AF37]/40 bg-[linear-gradient(110deg,rgba(92,48,12,0.86),rgba(15,15,22,0.94))] shadow-[inset_-22px_0_42px_rgba(0,0,0,0.5),0_0_34px_rgba(255,85,0,0.16)] transition duration-1000 ${
              gateOpened ? '-translate-x-[132%] rotate-[-5deg]' : '-translate-x-full'
            }`}
          />
          <div
            className={`absolute left-1/2 top-[23%] h-[57%] w-[16rem] max-w-[36vw] origin-right rounded-tr-[14rem] border border-[#D4AF37]/40 bg-[linear-gradient(250deg,rgba(42,67,88,0.84),rgba(15,15,22,0.94))] shadow-[inset_22px_0_42px_rgba(0,0,0,0.5),0_0_34px_rgba(0,170,255,0.14)] transition duration-1000 ${
              gateOpened ? 'translate-x-[32%] rotate-[5deg]' : ''
            }`}
          />
          <div
            className={`absolute left-1/2 top-[47%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/35 bg-black/35 shadow-[0_0_65px_rgba(212,175,55,0.28)] transition duration-700 ${
              gateOpened ? 'scale-[3] opacity-10' : 'opacity-80'
            }`}
          />
        </div>
      ) : (
        <div ref={mountRef} className="pointer-events-none absolute inset-0 z-0" />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-screen opacity-60">
        {embers.map((particle, index) => (
          <div
            key={`ember-${index}`}
            className="pantheon-divine-gate-ember absolute bottom-0 rounded-full"
            style={
              {
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size + 2}px ${particle.size + 2}px ${particle.color}`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                '--drift': particle.drift,
              } as CSSProperties
            }
          />
        ))}

        {snow.map((particle, index) => (
          <div
            key={`snow-${index}`}
            className="pantheon-divine-gate-snow absolute top-0 rounded-full bg-white"
            style={
              {
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                boxShadow: '0 0 6px 2px rgba(150,220,255,0.6)',
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                '--drift': particle.drift,
                '--scale': particle.scale ?? 1,
                '--max-opacity': particle.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <div
          className={`transition-all duration-1000 ease-in-out flex flex-col items-center ${
            gateOpened ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        >
          <div
            className="mb-8 mt-12 transition-all duration-700 ease-out"
            style={{ opacity: uiVisible ? 1 : 0, transform: `translateY(${uiVisible ? 0 : -16}px)` }}
          >
            <div className="mx-auto flex max-w-[calc(100vw-2rem)] items-center justify-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/10 px-4 py-3 text-xs shadow-[0_0_20px_rgba(255,165,0,0.2)] backdrop-blur-md sm:px-6 sm:text-sm">
              <div className="flex">
                <span className="text-yellow-300">✨</span>
              </div>
              <span className="text-center tracking-wide text-orange-100">
                <span className="sm:hidden">{gateCopy.badgeMobile}</span>
                <span className="hidden sm:inline">{gateCopy.badgeDesktop}</span>
              </span>
              <div className="flex">
                <span className="text-amber-300">✨</span>
              </div>
            </div>
          </div>

          <div
            className="text-center transition-all duration-900 ease-out"
            style={{
              opacity: uiVisible ? 1 : 0,
              transform: `translateY(${uiVisible ? 0 : 24}px)`,
              filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.55))',
            }}
          >
            <p className="mx-auto mb-3 max-w-[calc(100vw-2rem)] text-[0.68rem] uppercase tracking-[0.18em] text-[rgba(255,234,112,0.72)] sm:text-[0.88rem] sm:tracking-[0.46rem]">
              {gateCopy.eyebrow}
            </p>
            <h1 className="max-w-[calc(100vw-2rem)] text-[clamp(1.45rem,6vw,4rem)] uppercase tracking-[0.08em] text-[#ffd700] sm:tracking-[0.45rem]">
              <span className="block sm:hidden">
                {gateCopy.titleMobileLines.map(line => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <span className="hidden sm:inline">{gateCopy.title}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[calc(100vw-2rem)] text-[0.9rem] uppercase tracking-[0.16em] text-[#ffea70] sm:text-[1.2rem] sm:tracking-[0.32rem]">
              {gateCopy.subtitle}
            </p>
          </div>
        </div>

        <div
          className={`pantheon-divine-gate-breathe absolute bottom-10 text-[0.8rem] uppercase tracking-[4px] text-[rgba(255,234,112,0.6)] transition-opacity duration-1000 ease-in-out ${
            uiVisible && !gateOpened ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {gateCopy.cta}
        </div>
      </div>
    </div>
  );
}
