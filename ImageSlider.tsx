'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderImage {
  id: number;
  url: string;
  alt: string;
  label: string;
}

const SLIDER_IMAGES: SliderImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=800&fit=crop',
    alt: 'KGI Campus - Management Studies',
    label: 'Management Studies',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&h=800&fit=crop',
    alt: 'KGI Campus - Health Sciences',
    label: 'Health Sciences',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    alt: 'KGI Campus - Academic Excellence',
    label: 'Academic Excellence',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1549920175-816de91a03d3?w=1200&h=800&fit=crop',
    alt: 'KGI Campus - Student Life',
    label: 'Student Life',
  },
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticles(canvasRef);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
        setFadeIn(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFadeIn(true);
    }, 300);
    setAutoPlay(false);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % SLIDER_IMAGES.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Background images */}
      {SLIDER_IMAGES.map((image, index) => (
        <div
          key={image.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 z-10" />

      {/* Interactive particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full pointer-events-none" />

      {/* Text Content */}
      <div
        className="absolute inset-0 z-30 flex flex-col justify-center px-8 md:px-12 transition-opacity duration-500"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        <span className="inline-block bg-red-600/80 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit backdrop-blur-sm">
          {SLIDER_IMAGES[currentSlide].label}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-snug mb-4 drop-shadow-lg">
          Welcome to<br />
          <span className="text-red-400">Koshys Group</span> of<br />
          Institutions <span className="text-red-300">(KGI)</span>
        </h2>

        <p className="text-sm md:text-base text-gray-200 max-w-xs md:max-w-sm leading-relaxed drop-shadow">
          Empowering students with quality education across management, health sciences, hotel management, and school programs.
        </p>

        <div className="flex gap-3 mt-6 flex-wrap">
          {[{ label: 'Institutions', value: '5+' }, { label: 'Programs', value: '30+' }, { label: 'Students', value: '10K+' }].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-300 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Buttons */}
      <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-lg" aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex gap-2 items-center">
        {SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-500 w-7 h-2.5' : 'bg-white/50 hover:bg-white/80 w-2.5 h-2.5'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-40">
        <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${((currentSlide + 1) / SLIDER_IMAGES.length) * 100}%` }} />
      </div>
    </div>
  );
}
