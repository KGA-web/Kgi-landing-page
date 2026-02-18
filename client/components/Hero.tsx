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
  { id: 1, label: 'Management Studies',    url: managementImg },
  { id: 2, label: 'Health Sciences',       url: healthImg },
  { id: 3, label: 'Hotel Management',      url: hotelImg },
  { id: 4, label: 'Research & Innovation', url: researchImg },
];

const PROGRAMS_BY_LEVEL = {
  'Undergraduate (UG)': ['BBA', 'B.Com', 'BCA', 'BSc', 'B.Sc Forensic Science', 'BVA - Animation', 'BVA - Applied Arts', 'BVA - Interior Design', 'B.Com Logistics', 'BCA Advanced'],
  'Postgraduate (PG)': ['MBA', 'MCA', 'M.Com', 'MSc'],
  'Nursing': ['GNM', 'B.Sc Nursing', 'PBBSc', 'M.Sc Nursing'],
  'Allied Health Sciences': ['B.Sc MLT', 'B.Sc Radiology', 'B.Sc Physiotherapy', 'B.Sc Renal Dialysis', 'B.Sc Respiratory', 'B.Sc AT & OT', 'B.Sc MIT'],
  'Diploma': ['Diploma in Management', 'Diploma in Healthcare', 'Hotel Management'],
  'PhD': ['PhD in Management', 'PhD in Science', 'PhD in Healthcare'],
};

// ── Particle Hook ──
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

// ── Styles (Glassmorphism) ──
const I = "w-full px-3 py-2.5 text-xs rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition backdrop-blur-sm";
const S = "w-full px-3 py-2.5 text-xs rounded-lg border border-white/20 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition";
const L = "block text-[10px] font-bold text-white/80 mb-1.5 uppercase tracking-widest";

// ── Math Captcha Logic ──
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

  // Form State
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const [fd, setFd] = useState({ name: '', mobile: '', email: '', program: '', captchaAnswer: '', authorization: false });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaOk, setCaptchaOk] = useState(false);

  // Auto Slider
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => go((cur + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [auto, cur]);

  const go = (i) => { setFade(false); setTimeout(() => { setCur(i); setFade(true); }, 350); };

  // Validation
  const validate = () => {
    const e = {};
    if (!fd.name) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(fd.mobile)) e.mobile = "Invalid mobile number";
    if (!/^\S+@\S+\.\S+$/.test(fd.email)) e.email = "Invalid email address";
    if (!fd.program) e.program = "Please select a program";
    if (!captchaOk) e.captchaAnswer = "Please verify captcha";
    if (!fd.authorization) e.authorization = "Authorization required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit Logic (Direct to Sheet, No OTP)
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
      setErrors({ form: "Network error. Please try again." });
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#050505]" style={{ minHeight: 'calc(100vh - 72px)' }}
         onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      
      {/* ── Background Slider ── */}
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover scale-105" />
        </div>
      ))}
      
      {/* ── REDUCED SHADE / LIGHTER GRADIENTS ── */}
      {/* Changed from black/90 to black/60 for a lighter look */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60" />

      {/* ── Main Layout ── */}
      <div className="relative z-20 w-full flex items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: Branding Text */}
          <div className="flex-1 transition-all duration-700 ease-out" 
               style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(10px)' }}>
            
            <span className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10"
              style={{ background: 'rgba(220,38,38,0.6)', backdropFilter: 'blur(10px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
              {heroImages[cur].label}
            </span>

            <h1 className="text-white font-black leading-[1.05] mb-6 drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Koshys Group</span> <br /> 
              <span className="text-white font-light">of Institutions</span>
            </h1>

            <p className="text-gray-100 text-base md:text-lg max-w-lg leading-relaxed mb-10 opacity-90 border-l-2 border-yellow-500/60 pl-5">
              Empowering the next generation of leaders through excellence in Management, Health Sciences, and Innovation.
            </p>

            <div className="flex gap-8">
              {[['5+', 'Institutions'], ['30+', 'Programs'], ['10K+', 'Students']].map(([v, l]) => (
                <div key={l} className="group cursor-default">
                  <div className="text-yellow-400 font-black text-3xl transition-transform group-hover:-translate-y-1" style={{ fontFamily: "'Playfair Display',serif" }}>{v}</div>
                  <div className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Glass Form Card (No OTP) */}
          <div className="w-full lg:w-[400px] lg:flex-shrink-0">
            <div className="rounded-2xl overflow-hidden transition-all hover:scale-[1.01] duration-500"
              style={{ 
                background: 'rgba(20, 20, 20, 0.4)', // Very light transparent black
                backdropFilter: 'blur(20px) saturate(140%)', // Heavy blur for glass effect
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
              }}>
              
              <div className="p-6">
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.2em]">Admissions 2025</span>
                  <h2 className="text-xl text-white font-serif font-bold mt-1">Apply Now</h2>
                </div>

                {done ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">Application Sent!</h3>
                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <p className="text-[10px] text-white/50 uppercase">Application ID</p>
                      <p className="text-yellow-400 font-mono text-xl tracking-wider">{appId}</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="text-white/60 text-xs hover:text-white underline">Apply for another student</button>
                  </div>
                ) : (
                  <form onSubmit={submitReg} className="space-y-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className={L}>Student Name</label>
                      <input className={I} placeholder="As per marks card" 
                        value={fd.name} onChange={e => setFd({...fd, name: e.target.value})} />
                      {errors.name && <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</p>}
                    </div>

                    {/* Mobile & Email */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={L}>Mobile</label>
                        <input className={I} maxLength={10} placeholder="10 Digits"
                          value={fd.mobile} onChange={e => setFd({...fd, mobile: e.target.value})} />
                      </div>
                      <div>
                        <label className={L}>Email</label>
                        <input className={I} type="email" placeholder="Email ID"
                          value={fd.email} onChange={e => setFd({...fd, email: e.target.value})} />
                      </div>
                    </div>
                    {(errors.mobile || errors.email) && <p className="text-red-400 text-[10px]">Check contact details</p>}

                    {/* Program Selection */}
                    <div>
                      <label className={L}>Interested Program</label>
                      <select className={S} value={fd.program} onChange={e => setFd({...fd, program: e.target.value})}>
                        <option value="">Select Course</option>
                        {Object.values(PROGRAMS_BY_LEVEL).flat().map(p => <option key={p} value={p} className="text-black">{p}</option>)}
                      </select>
                      {errors.program && <p className="text-red-400 text-[10px] mt-1">{errors.program}</p>}
                    </div>

                    {/* Math Captcha */}
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                      <span className="text-xs text-white/70 font-mono">Solve: <strong className="text-white">{captcha.question}</strong></span>
                      <div className="flex gap-2 w-28">
                        <input className={`${I} text-center py-1.5`} placeholder="?" 
                          value={fd.captchaAnswer} onChange={e => setFd({...fd, captchaAnswer: e.target.value})} />
                        <button type="button" onClick={() => setCaptchaOk(fd.captchaAnswer === captcha.answer)} 
                          className={`px-3 rounded-md text-[10px] font-bold transition-colors ${captchaOk ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                          {captchaOk ? '✓' : 'OK'}
                        </button>
                      </div>
                    </div>
                    {errors.captchaAnswer && <p className="text-red-400 text-[10px] text-right">{errors.captchaAnswer}</p>}

                    {/* Authorization */}
                    <label className="flex items-start gap-2 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer sr-only" checked={fd.authorization} onChange={e => setFd({...fd, authorization: e.target.checked})} />
                        <div className="w-3.5 h-3.5 border border-white/30 rounded bg-transparent peer-checked:bg-red-600 peer-checked:border-red-600 transition-all"></div>
                      </div>
                      <span className="text-[9px] text-white/50 leading-tight group-hover:text-white/70 transition-colors">
                        I authorize KGI to contact me via Email/SMS/WhatsApp.
                      </span>
                    </label>
                    {errors.authorization && <p className="text-red-400 text-[10px]">{errors.authorization}</p>}

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} 
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20">
                      {loading ? <Loader size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                      Submit Application
                    </button>

                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Slider Controls (Bottom Left) ── */}
      <div className="absolute bottom-8 left-10 z-30 flex gap-4">
        <button onClick={() => go((cur - 1 + heroImages.length) % heroImages.length)} 
          className="p-2 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 text-white backdrop-blur-sm transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => go((cur + 1) % heroImages.length)} 
          className="p-2 rounded-full border border-white/20 bg-black/20 hover:bg-white/10 text-white backdrop-blur-sm transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
      
      {/* ── Progress Bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${((cur + 1) / heroImages.length) * 100}%` }} />
      </div>

    </div>
  );
}
