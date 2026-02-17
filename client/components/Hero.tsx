import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    id: 1,
    label: "Management Studies",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&h=900&fit=crop",
  },
  {
    id: 2,
    label: "Health Sciences",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1400&h=900&fit=crop",
  },
  {
    id: 3,
    label: "Hotel Management",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-943c28ab91c2?w=1400&h=900&fit=crop",
  },
  {
    id: 4,
    label: "Research & Innovation",
    imageUrl: "https://images.unsplash.com/photo-1533519227268-461353132943?w=1400&h=900&fit=crop",
  },
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [auto, setAuto] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.35 + 0.12,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,180,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,200,150,${0.1 * (1 - d / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => changeTo((current + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [auto, current]);

  const changeTo = (idx: number) => {
    setFade(false);
    setTimeout(() => { setCurrent(idx); setFade(true); }, 350);
  };

  return (
    <div
      className="relative w-full h-full min-h-[520px] overflow-hidden"
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* Background images */}
      {heroImages.map((img, i) => (
        <div
          key={img.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={img.imageUrl} alt={img.label} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Text overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-14 transition-opacity duration-400"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {/* Label pill */}
        <span
          className="mb-5 inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em]"
          style={{ background: "rgba(220,38,38,0.75)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
          {heroImages[current].label}
        </span>

        {/* Headline */}
        <h1
          className="text-white font-black leading-[1.08] mb-5"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          Welcome to<br />
          <span style={{ color: "#FCD34D" }}>Koshys Group</span><br />
          of Institutions{" "}
          <span className="text-red-400">(KGI)</span>
        </h1>

        <p className="text-gray-200 text-sm md:text-base max-w-xs leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Empowering students with quality education across management, health sciences, hotel management, and school programs.
        </p>

        {/* Stats row */}
        <div className="flex gap-5 flex-wrap">
          {[["5+", "Institutions"], ["30+", "Programs"], ["10K+", "Students"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center" style={{ borderLeft: "2px solid rgba(252,211,77,0.5)", paddingLeft: "12px" }}>
              <div className="text-yellow-300 font-black text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <button onClick={() => { changeTo((current - 1 + heroImages.length) % heroImages.length); setAuto(false); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
        aria-label="Previous">
        <ChevronLeft size={20} className="text-white" />
      </button>
      <button onClick={() => { changeTo((current + 1) % heroImages.length); setAuto(false); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
        aria-label="Next">
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => { changeTo(i); setAuto(false); }}
            className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? "#FCD34D" : "rgba(255,255,255,0.4)" }}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${((current + 1) / heroImages.length) * 100}%` }} />
      </div>
    </div>
  );
}
