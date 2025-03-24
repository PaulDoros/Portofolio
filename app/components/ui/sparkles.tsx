'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  className,
  particleDensity,
}: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  className?: string;
  particleDensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [noise, setNoise] = useState<(x: number, y: number, z: number) => number>();
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      originX: number;
      originY: number;
    }>
  >([]);

  useEffect(() => {
    setNoise(createNoise3D());
  }, []);

  useEffect(() => {
    if (!noise) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      const particleCount = Math.floor(
        ((canvas.width * canvas.height) / (1920 * 1080)) * (particleDensity || 50)
      );
      const newParticles = [];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = 0;
        const vy = 0;
        const radius = Math.random() * (maxSize || 2) + (minSize || 0.5);
        newParticles.push({
          x,
          y,
          vx,
          vy,
          radius,
          originX: x,
          originY: y,
        });
      }

      setParticles(newParticles);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [noise, particleDensity, minSize, maxSize]);

  useEffect(() => {
    if (!noise || particles.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((particle, i) => {
        // Create the noise values for this particle and frame
        const n = noise(
          particle.originX * 0.005,
          particle.originY * 0.005,
          performance.now() * 0.00005 * (speed || 1)
        );

        // Use noise to set velocity with a max speed determined by the particle's radius
        const maxSpeed = 2 - particle.radius * 0.5; // Smaller particles move faster
        particle.vx = Math.cos(n * Math.PI * 2) * maxSpeed;
        particle.vy = Math.sin(n * Math.PI * 2) * maxSpeed;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Keep particles within bounds
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particle.x = particle.originX;
          particle.y = particle.originY;
        }

        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor || '#FFFFFF';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [background, noise, particles, particleColor, speed]);

  return <canvas ref={canvasRef} id={id} className={className} />;
};
