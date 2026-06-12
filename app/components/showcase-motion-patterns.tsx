import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Cursor, usePointerPosition } from 'motion-plus/react';
import { ClientOnly } from '~/utils/client-only';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type CursorTrailImage = {
  label: string;
  image: string;
  color?: string;
};

type TrailItem = {
  id: number;
  x: number;
  y: number;
  imageIndex: number;
  velocityX: number;
  velocityY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function CursorTrailVelocity({
  images,
  className = '',
  imageSize = 156,
  spawnDistance = 86,
  velocityFactor = 0.065,
  title,
  eyebrow,
  description,
}: {
  images: CursorTrailImage[];
  className?: string;
  imageSize?: number;
  spawnDistance?: number;
  velocityFactor?: number;
  title: string;
  eyebrow: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  const pointer = usePointerPosition();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInside = useRef(false);
  const distance = useRef<number | undefined>(undefined);
  const imageIndex = useRef(0);
  const idCounter = useRef(0);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [trailItems, setTrailItems] = useState<TrailItem[]>([]);

  const pointerDistance = useTransform(() => {
    const x = pointer.x.get();
    const y = pointer.y.get();
    const previousX = pointer.x.getPrevious() ?? x;
    const previousY = pointer.y.getPrevious() ?? y;
    const deltaX = x - previousX;
    const deltaY = y - previousY;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  });

  useEffect(
    () => () => {
      timers.current.forEach(timer => clearTimeout(timer));
    },
    []
  );

  useMotionValueEvent(pointerDistance, 'change', latest => {
    if (reduceMotion || images.length === 0 || !isInside.current) return;

    if (distance.current === undefined) {
      distance.current = 0;
      return;
    }

    distance.current += latest;

    if (distance.current < spawnDistance) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const localX = pointer.x.get() - rect.left;
    const localY = pointer.y.get() - rect.top;

    if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) return;

    const nextItem: TrailItem = {
      id: idCounter.current++,
      x: localX - imageSize / 2,
      y: localY - imageSize / 2,
      imageIndex: imageIndex.current,
      velocityX: clamp(pointer.x.getVelocity(), -2400, 2400),
      velocityY: clamp(pointer.y.getVelocity(), -2400, 2400),
    };

    setTrailItems(current => [...current.slice(-9), nextItem]);
    imageIndex.current = (imageIndex.current + 1) % images.length;
    distance.current = 0;

    const timer = setTimeout(() => {
      setTrailItems(current => current.filter(item => item.id !== nextItem.id));
    }, 940);

    timers.current.push(timer);
  });

  return (
    <motion.div
      ref={containerRef}
      data-motion-pattern="cursor-trail-velocity"
      onPointerEnter={() => {
        isInside.current = true;
      }}
      onPointerLeave={() => {
        isInside.current = false;
        distance.current = undefined;
      }}
      className={`relative isolate min-h-[28rem] overflow-hidden rounded-[2rem] border ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:54px_54px] opacity-40" />
      <div className="relative z-20 max-w-xl p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] opacity-60">{eyebrow}</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
        <p className="opacity-62 mt-4 max-w-md text-sm leading-7">{description}</p>
      </div>

      <AnimatePresence>
        {trailItems.map(item => {
          const source = images[item.imageIndex];

          return (
            <motion.figure
              key={item.id}
              className="border-white/18 pointer-events-none absolute z-10 overflow-hidden rounded-[1.25rem] border bg-white shadow-[0_24px_70px_rgba(0,0,0,0.26)]"
              style={{
                left: item.x,
                top: item.y,
                width: imageSize,
                willChange: 'transform, opacity',
              }}
              initial={{ opacity: 0, scale: 0.72, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.72, rotate: 5 }}
              transition={{
                duration: 0.12,
                x: { type: 'inertia', velocity: item.velocityX * velocityFactor },
                y: { type: 'inertia', velocity: item.velocityY * velocityFactor },
                opacity: { duration: 0.22 },
              }}
            >
              <img src={source.image} alt="" className="h-28 w-full object-cover" />
              <figcaption className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#13221F]">
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: source.color ?? '#0EA5E9' }}
                />
                {source.label}
              </figcaption>
            </motion.figure>
          );
        })}
      </AnimatePresence>

      <div className="border-white/12 pointer-events-none absolute bottom-5 right-5 z-20 rounded-full border bg-black/25 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] opacity-70">
        move cursor for trail
      </div>
    </motion.div>
  );
}

function usePointerReaction(axis: 'x' | 'y', measurement: 'innerWidth' | 'innerHeight') {
  const pointer = usePointerPosition();
  const [viewportSize, setViewportSize] = useState(1);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const updateSize = () => setViewportSize(window[measurement]);
    const markMoved = () => {
      setHasMoved(true);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('pointermove', markMoved, { passive: true, once: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', markMoved);
    };
  }, [measurement]);

  const reaction = useTransform(() => {
    if (!viewportSize || !hasMoved) return 0;
    const latest = pointer[axis].get();

    return 34 - (latest / viewportSize) * 68;
  });

  return useSpring(reaction, {
    stiffness: 190,
    damping: 72,
    mass: 0.7,
  });
}

export function FloatingTargetButton({
  href,
  text,
  image,
  accent = '#6EE7B7',
  className = '',
}: {
  href: string;
  text: string;
  image: string;
  accent?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = usePointerReaction('x', 'innerWidth');
  const y = usePointerReaction('y', 'innerHeight');
  const originX = useTransform(x, [30, -30], [0, 1]);
  const originY = useTransform(y, [30, -30], [0, 1]);
  const ringText = `${text} • ${text} • `;

  return (
    <>
      <motion.a
        data-motion-pattern="floating-target"
        href={href}
        initial={false}
        animate="idle"
        whileHover="hover"
        whileTap="pressed"
        style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
        className={`relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full ${className}`}
        aria-label={text}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-white/35"
          variants={{ pressed: { scale: 0.92 } }}
        >
          <motion.span
            className="absolute inset-2 rounded-full bg-cover bg-center"
            style={{
              originX,
              originY,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.18)), url(${image})`,
              willChange: 'transform',
            }}
            variants={{
              idle: { scale: 0 },
              hover: { scale: 1.08 },
            }}
            transition={{ type: 'spring', stiffness: 230, damping: 24 }}
          />
        </motion.span>
        <motion.span
          className="absolute inset-0 font-black uppercase text-white"
          animate={reduceMotion ? undefined : { transform: ['rotate(0deg)', 'rotate(360deg)'] }}
          transition={reduceMotion ? undefined : { duration: 14, ease: 'linear', repeat: Infinity }}
          variants={{
            idle: { letterSpacing: '0.16em' },
            hover: { letterSpacing: '0.04em' },
          }}
        >
          {ringText.split('').map((char, index, array) => (
            <span
              key={`${char}-${index}`}
              className="absolute left-1/2 top-1/2 text-[10px]"
              style={{
                transform: `rotate(${(index * 360) / array.length}deg) translateY(-78px)`,
                transformOrigin: '0 0',
              }}
            >
              {char}
            </span>
          ))}
        </motion.span>
        <span
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-xs font-black uppercase tracking-[0.12em] text-[#07110E]"
          style={{ backgroundColor: accent }}
        >
          Open
        </span>
      </motion.a>
      <ClientOnly>
        <Cursor style={{ width: 5, height: 5, backgroundColor: accent }} />
        <Cursor
          follow
          center={{ x: 0.5, y: 0.5 }}
          spring={{ stiffness: 1000, damping: 50 }}
          magnetic={{ snap: 0.9, padding: 0 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 200,
            border: `1px solid ${accent}`,
            backgroundColor: 'transparent',
          }}
          variants={{ magnetic: { opacity: 0 } }}
        />
      </ClientOnly>
    </>
  );
}

export function MotionLoadingProgress({
  label,
  tone = 'emerald',
  resetKey,
  className = '',
}: {
  label: string;
  tone?: 'emerald' | 'cyan' | 'amber';
  resetKey?: string | number;
  className?: string;
}) {
  const progress = useSpring(0, { stiffness: 90, damping: 22, mass: 0.7 });
  const colors = {
    emerald: 'from-emerald-300 via-cyan-300 to-orange-300',
    cyan: 'from-cyan-300 via-sky-300 to-violet-300',
    amber: 'from-amber-200 via-orange-300 to-rose-300',
  };

  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [progress, resetKey]);

  return (
    <div
      data-motion-pattern="loading-progress"
      className={`rounded-2xl border border-white/10 bg-black/20 p-4 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/55">
        <span>{label}</span>
        <span>simulated</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full origin-left rounded-full bg-gradient-to-r ${colors[tone]}`}
          style={{ scaleX: progress, willChange: 'transform' }}
        />
      </div>
    </div>
  );
}

export function MotionCopyButton({
  value,
  children = 'Copy link',
  copiedLabel = 'Copied',
  className = '',
}: {
  value: string;
  children?: ReactNode;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    []
  );

  return (
    <motion.button
      data-motion-pattern="copy-button"
      type="button"
      layout
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        if (timeout.current) clearTimeout(timeout.current);
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          void navigator.clipboard.writeText(value).catch(() => undefined);
        }
        setCopied(true);
        timeout.current = setTimeout(() => setCopied(false), 1600);
      }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border px-4 py-2 text-sm font-black ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? 'copied' : 'copy'}
          layout="position"
          initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(4px)', y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="inline-flex items-center gap-2"
        >
          {copied ? (
            <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.path
                d="M4 12l5 5L20 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              />
            </motion.svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect width="8" height="4" x="8" y="2" rx="1" stroke="currentColor" strokeWidth="2" />
              <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
          {copied ? copiedLabel : children}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function HoldToConfirmButton({
  label,
  confirmedLabel,
  onConfirm,
  className = '',
}: {
  label: string;
  confirmedLabel: string;
  onConfirm?: () => void;
  className?: string;
}) {
  const progress = useMotionValue(0);
  const [confirmed, setConfirmed] = useState(false);
  const controls = useRef<ReturnType<typeof animate> | null>(null);
  const { ringOpacity, ringPath, ringScale, fillX } = useTransform(progress, [0, 1], {
    ringOpacity: [0, 1],
    ringPath: [0, 1],
    ringScale: [1, 0.88],
    fillX: ['-112%', '0%'],
  });

  const reset = () => {
    if (confirmed) return;
    controls.current?.stop();
    controls.current = animate(progress, 0, { duration: 0.22 });
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <motion.button
        data-motion-pattern="hold-to-confirm"
        type="button"
        style={{ scale: ringScale }}
        onPointerDown={event => {
          event.preventDefault();
          setConfirmed(false);
          controls.current?.stop();
          progress.set(0);
          controls.current = animate(progress, 1, {
            duration: 1.25,
            ease: 'easeOut',
            onComplete: () => {
              setConfirmed(true);
              onConfirm?.();
            },
          });
        }}
        onPointerUp={reset}
        onPointerLeave={reset}
        className="relative isolate overflow-hidden rounded-full bg-white px-5 py-3 text-sm font-black text-[#07110E]"
      >
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-emerald-300 blur-lg"
          style={{ x: fillX, scale: 1.6 }}
        />
        {confirmed ? confirmedLabel : label}
      </motion.button>
      <motion.svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 100 100"
        style={{ opacity: ringOpacity }}
        aria-hidden="true"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#6EE7B7"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: ringPath, rotate: '-90deg', transformOrigin: 'center' }}
        />
      </motion.svg>
    </div>
  );
}
