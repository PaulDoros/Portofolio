import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollingEffects() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values based on scroll
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  // Mouse tracking
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Mouse parallax transforms
  const mouseX =
    (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.01;
  const mouseY =
    (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.01;

  return (
    <>
      {/* Scroll Progress Indicator - Positioned below nav */}
      <motion.div
        className="fixed left-0 right-0 top-[67px] z-40 h-1 origin-left bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80"
        style={{ scaleX: smoothProgress }}
      />

      {/* Background Geometric Shapes - Theme Aware */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Floating Orbs with Parallax */}
        <motion.div
          className="dark:from-blue-400/3 dark:to-purple-400/3 absolute h-64 w-64 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
          style={{
            x: mouseX * 20,
            y: mouseY * 20,
            y: y1,
            left: '10%',
            top: '20%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="dark:from-emerald-400/3 dark:to-cyan-400/3 absolute h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 blur-3xl"
          style={{
            x: mouseX * -15,
            y: mouseY * -15,
            y: y2,
            right: '15%',
            top: '40%',
          }}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
            delay: 5,
          }}
        />

        <motion.div
          className="dark:from-pink-400/3 dark:to-orange-400/3 absolute h-48 w-48 rounded-full bg-gradient-to-r from-pink-500/5 to-orange-500/5 blur-3xl"
          style={{
            x: mouseX * 10,
            y: mouseY * 10,
            y: y3,
            left: '60%',
            bottom: '20%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            delay: 10,
          }}
        />

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            x: mouseX * 5,
            y: mouseY * 5,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Geometric Shapes with Mouse Parallax */}
        <motion.div
          className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full border border-blue-500/10 dark:border-blue-400/5"
          style={{
            x: mouseX * 30,
            y: mouseY * 30,
            rotate,
            scale,
          }}
        />

        <motion.div
          className="absolute right-1/3 top-1/2 h-24 w-24 border border-purple-500/10 dark:border-purple-400/5"
          style={{
            x: mouseX * -25,
            y: mouseY * -25,
            rotate: rotate,
          }}
          animate={{
            borderRadius: ['0%', '25%', '50%', '25%', '0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/2 h-16 w-16 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 dark:from-emerald-400/5 dark:to-cyan-400/5"
          style={{
            x: mouseX * 20,
            y: mouseY * 20,
          }}
          animate={{
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            borderRadius: ['0%', '50%', '0%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Particle System */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-blue-500/20 dark:bg-blue-400/10"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + i * 8}%`,
              x: mouseX * (i + 1) * 2,
              y: mouseY * (i + 1) * 2,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Morphing Blob */}
        <motion.div
          className="dark:from-violet-400/3 dark:to-purple-400/3 absolute right-1/4 top-1/4 h-72 w-72 bg-gradient-to-r from-violet-500/5 to-purple-500/5 blur-2xl"
          style={{
            x: mouseX * -10,
            y: mouseY * -10,
          }}
          animate={{
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
            ],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: mouseX * 5,
            y: mouseY * 5,
          }}
        >
          <svg className="h-full w-full opacity-[0.02] dark:opacity-[0.01]">
            <motion.path
              d="M0,100 Q150,50 300,100 T600,100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-blue-500"
              animate={{
                d: [
                  'M0,100 Q150,50 300,100 T600,100',
                  'M0,150 Q150,100 300,50 T600,150',
                  'M0,100 Q150,50 300,100 T600,100',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              d="M100,200 Q250,150 400,200 T700,200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-purple-500"
              animate={{
                d: [
                  'M100,200 Q250,150 400,200 T700,200',
                  'M100,250 Q250,200 400,150 T700,250',
                  'M100,200 Q250,150 400,200 T700,200',
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </svg>
        </motion.div>

        {/* Scroll-triggered Elements */}
        <motion.div
          className="absolute left-10 top-1/2 h-8 w-8 rounded-full border-2 border-blue-500/20 dark:border-blue-400/10"
          style={{
            y: y1,
            x: mouseX * 15,
          }}
          animate={{
            scale: [1, 1.2, 1],
            borderColor: [
              'rgba(59, 130, 246, 0.2)',
              'rgba(147, 51, 234, 0.2)',
              'rgba(59, 130, 246, 0.2)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-10 h-6 w-6 bg-emerald-500/20 dark:bg-emerald-400/10"
          style={{
            y: y2,
            x: mouseX * -12,
          }}
          animate={{
            rotate: [0, 180, 360],
            borderRadius: ['0%', '50%', '0%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="pointer-events-none fixed z-40 h-4 w-4 rounded-full bg-blue-500/20 mix-blend-difference dark:bg-blue-400/10"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
}
