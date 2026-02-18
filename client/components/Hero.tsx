'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Loader, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

// Assets
import managementImg from '/public/Management.png';
import healthImg from '/public/Health.png';
import hotelImg from '/public/Hotel.mgmt.png';
import researchImg from '/public/research.png';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyjho59uS7yLSETGdJZoL-Dr1V1BAbW2UeQcOgP8eIOCap37DDMHXe84_UYT-RTVJ1m/exec';

const heroImages = [
  { id: 1, label: 'Management Studies', url: managementImg },
  { id: 2, label: 'Health Sciences', url: healthImg },
  { id: 3, label: 'Hotel Management', url: hotelImg },
  { id: 4, label: 'Research & Innovation', url: researchImg },
];

const PROGRAM_LEVELS = ['Undergraduate (UG)', 'Postgraduate (PG)', 'Nursing', 'Allied Health Sciences', 'Diploma', 'PhD'];
const PROGRAMS_BY_LEVEL = {
  'Undergraduate (UG)': ['BBA', 'B.Com', 'BCA', 'BSc', 'B.Sc Forensic Science', 'BVA - Animation', 'BVA - Applied Arts', 'BVA - Interior Design', 'B.Com Logistics', 'BCA Advanced'],
  'Postgraduate (PG)': ['MBA', 'MCA', 'M.Com', 'MSc'],
  'Nursing': ['GNM', 'B.Sc Nursing', 'PBBSc', 'M.Sc Nursing'],
  'Allied Health Sciences': ['B.Sc MLT', 'B.Sc Radiology', 'B.Sc Physiotherapy', 'B.Sc Renal Dialysis', 'B.Sc Respiratory', 'B.Sc AT & OT', 'B.Sc MIT'],
  'Diploma': ['Diploma in Management', 'Diploma in Healthcare', 'Hotel Management'],
  'PhD': ['PhD in Management', 'PhD in Science', 'PhD in Healthcare'],
};

// Particle Hook
function useParticles(ref) {
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.5 + .5, a: Math.random() * .3 + .1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,170,${p.a})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [ref]);
}

const I = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition backdrop-blur-sm";
const S = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition";
const L = "block text-[10px] font-bold text-white/60 mb-1 uppercase tracking-widest";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(true);
  const [auto, setAuto] = useState(true);
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const [fd, setFd] = useState({ name: '', mobile: '', email: '', programLevel: '', program: '', captchaAnswer: '', authorization: false });
  const [errors, setErrors] = useState({});
  const [progs, setProgs] = useState([]);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaOk, setCaptchaOk] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => go((cur + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [auto, cur]);

  const go = (i) => { setFade(false); setTimeout(() => { setCur(i); setFade(true); }, 350); };

  const validate = () => {
    const e = {};
    if (!fd.name) e.name = "Name required";
    if (!/^[6-9]\d{9}$/.test(fd.mobile)) e.mobile = "Invalid mobile";
    if (!/^\S+@\S+\.\S+$/.test(fd.email)) e.email = "Invalid email";
    if (!fd.program) e.program = "Select program";
    if (!captchaOk) e.captchaAnswer = "Verify CAPTCHA";
    if (!fd.authorization) e.authorization = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitReg = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const generatedId = 'KGI' + Date.now().toString().slice(-7);
      const body = new FormData();
      body.append('applicationId', generatedId);
      body.append('name', fd.name);
      body.append('mobile', fd.mobile);
      body.append('email', fd.email);
      body.append('program', fd.program);
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', body });
      setAppId(generatedId);
      setDone(true);
    } catch {
      setErrors({ form: "Network error. Try again." });
    } finally { setLoading(false); }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 72px)' }}>
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover scale-105" />
        </div>
      ))}
      
      {/* ── Overlays & Particles ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      <div className="relative z-20 w-full flex items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          
          {/* LEFT CONTENT */}
          <div className="flex-1 transition-opacity duration-400" style={{ opacity: fade ? 1 : 0 }}>
            <span className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: 'rgba(220,38,38,0.8)', backdropFilter: 'blur(8px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
              {heroImages[cur].label}
            </span>
            <h1 className="text-white font-black leading-[1.1] mb-5" style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
              Welcome to <span className="text-yellow-400">Koshys Group</span> <br /> of Institutions
            </h1>
            <p className="text-gray-200 text-sm md:text-lg max-w-md leading-relaxed mb-8">
              Empowering leaders since 2003 through Excellence in Management and Health Sciences.
            </p>
            <div className="flex gap-8">
              {[['5+', 'Institutes'], ['30+', 'Programs'], ['10K+', 'Students']].map(([v, l]) => (
                <div key={l} className="border-l-2 border-yellow-400/50 pl-4">
                  <div className="text-yellow-300 font-black text-2xl" style={{ fontFamily: "'Playfair Display',serif" }}>{v}</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT GLASS FORM */}
          <div className="w-full max-w-[400px]">
            <div className="rounded-3xl p-1" style={{ 
              background: 'rgba(15,15,15,0.4)', 
              backdropFilter: 'blur(24px) saturate(160%)', 
              border: '1px solid rgba(255,255,255,0.12)', 
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)' 
            }}>
              <div className="p-6">
                {done ? (
                  <div className="text-center py-10">
                    <CheckCircle size={50} className="text-green-400 mx-auto mb-4" />
                    <h2 className="text-xl text-white font-serif mb-2">Application Received!</h2>
                    <p className="text-yellow-400 font-mono text-lg">{appId}</p>
                    <button onClick={() => window.location.reload()} className="text-white/40 text-xs underline mt-6">Register another</button>
                  </div>
                ) : (
                  <form onSubmit={submitReg} className="space-y-4">
                    <h2 className="text-white font-serif text-xl">Admissions 2025-26</h2>
                    
                    <div>
                      <label className={L}>Full Name</label>
                      <input className={I} placeholder="As per marks card" onChange={e => setFd({...fd, name: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={L}>Mobile</label>
                        <input className={I} maxLength={10} onChange={e => setFd({...fd, mobile: e.target.value})} />
                      </div>
                      <div>
                        <label className={L}>Email</label>
                        <input className={I} type="email" onChange={e => setFd({...fd, email: e.target.value})} />
                      </div>
                    </div>

                    <div>
                      <label className={L}>Course</label>
                      <select className={S} onChange={e => setFd({...fd, program: e.target.value})}>
                        <option value="">Select Program</option>
                        {Object.values(PROGRAMS_BY_LEVEL).flat().map(p => <option key={p} value={p} className="text-black">{p}</option>)}
                      </select>
                    </div>

                    {/* CAPTCHA Box */}
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-white/50">Solve: {captcha.question}</span>
                        {captchaOk && <CheckCircle size={12} className="text-green-400" />}
                      </div>
                      <div className="flex gap-2">
                        <input className={I} placeholder="Answer" onChange={e => setFd({...fd, captchaAnswer: e.target.value})} />
                        <button type="button" onClick={() => setCaptchaOk(fd.captchaAnswer === captcha.answer)} className="bg-yellow-500 px-3 rounded-lg text-black text-[10px] font-bold">Verify</button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input type="checkbox" className="mt-1 accent-red-600" onChange={e => setFd({...fd, authorization: e.target.checked})} />
                      <p className="text-[9px] text-white/50 leading-tight">I authorize KGI to contact me via Email/SMS/WhatsApp. This overrides DND.</p>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-red-800 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                      {loading ? <Loader className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                      Submit Application
                    </button>
                    {errors.name && <p className="text-center text-red-400 text-[10px]">{errors.name}...</p>}
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
