'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

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

const PROGRAM_LEVELS = ['Undergraduate (UG)','Postgraduate (PG)','Nursing','Allied Health Sciences','Diploma','PhD'];
const PROGRAMS_BY_LEVEL = {
  'Undergraduate (UG)':  ['BBA','B.Com','BCA','BSc','B.Sc Forensic Science','BVA - Animation','BVA - Applied Arts','BVA - Interior Design','B.Com Logistics','BCA Advanced'],
  'Postgraduate (PG)':   ['MBA','MCA','M.Com','MSc'],
  'Nursing':              ['GNM','B.Sc Nursing','PBBSc','M.Sc Nursing'],
  'Allied Health Sciences':['B.Sc MLT','B.Sc Radiology','B.Sc Physiotherapy','B.Sc Renal Dialysis','B.Sc Respiratory','B.Sc AT & OT','B.Sc MIT'],
  'Diploma':              ['Diploma in Management','Diploma in Healthcare','Hotel Management'],
  'PhD':                  ['PhD in Management','PhD in Science','PhD in Healthcare'],
};

function useParticles(ref) {
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.8 + .5, a: Math.random() * .35 + .1,
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
const S = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40 transition backdrop-blur-sm";
const L = "block text-[10px] font-bold text-white/60 mb-1 uppercase tracking-widest";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

function validateForm(fd) {
  const errs = {};
  if (!fd.name.trim()) errs.name = 'Name required';
  if (!fd.mobile.trim() || !/^[6-9]\d{9}$/.test(fd.mobile.trim())) errs.mobile = 'Invalid number';
  if (!fd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email.trim())) errs.email = 'Invalid email';
  if (!fd.programLevel) errs.programLevel = 'Select level';
  if (!fd.program) errs.program = 'Select program';
  if (!fd.captchaAnswer.trim()) errs.captchaAnswer = 'Required';
  if (!fd.authorization) errs.authorization = 'Required';
  return errs;
}

export default function Hero() {
  const [cur, setCur]   = useState(0);
  const [fade, setFade] = useState(true);
  const [auto, setAuto] = useState(true);
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => go((cur + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, [auto, cur]);

  const go = (i) => { setFade(false); setTimeout(() => { setCur(i); setFade(true); }, 350); };

  const [done, setDone]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');

  const [fd, setFd] = useState({
    name: '', mobile: '', email: '',
    programLevel: '', program: '',
    captchaAnswer: '', authorization: false,
  });
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [progs, setProgs]       = useState([]);
  const [captcha, setCaptcha]   = useState(() => generateCaptcha());
  const [captchaOk, setCaptchaOk] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  const sf = (k, v) => {
    setFd(p => ({ ...p, [k]: v }));
    if (touched[k]) {
      const errs = validateForm({ ...fd, [k]: v });
      setErrors(p => ({ ...p, [k]: errs[k] }));
    }
  };

  const blur = (k) => {
    setTouched(p => ({ ...p, [k]: true }));
    setErrors(p => ({ ...p, [k]: validateForm(fd)[k] }));
  };

  const ic = (name) => `${I}${errors[name] ? ' border-red-400/60 bg-red-900/20' : ''}`;
  const sc = (name) => `${S}${errors[name] ? ' border-red-400/60' : ''}`;

  const verifyCaptcha = () => {
    if (fd.captchaAnswer.trim() === captcha.answer) {
      setCaptchaOk(true);
      setErrors(p => ({ ...p, captchaAnswer: undefined }));
    } else {
      setErrors(p => ({ ...p, captchaAnswer: '!' }));
      setCaptcha(generateCaptcha());
      sf('captchaAnswer', '');
    }
  };

  const submitReg = async (e) => {
    e.preventDefault();
    const errs = validateForm(fd);
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !captchaOk) return;
    setLoading(true);
    try {
      const generatedId = 'KGI' + Date.now().toString().slice(-7);
      const body = new FormData();
      body.append('applicationId', generatedId);
      body.append('name', fd.name.trim());
      body.append('mobile', fd.mobile.trim());
      body.append('email', fd.email.trim());
      body.append('programLevel', fd.programLevel);
      body.append('program', fd.program);
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', body });
      setAppId(generatedId);
      setDone(true);
    } catch {
      setSubmitErr('Error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col" style={{ minHeight: 'calc(100vh - 72px)' }} onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      <div className="relative z-20 w-full flex-1 flex items-center overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* LEFT text (Original Restored) */}
          <div className="flex-1 lg:pr-12 transition-opacity duration-400" style={{ opacity: fade ? 1 : 0 }}>
            <span className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ background: 'rgba(145, 29, 48, 0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              {heroImages[cur].label}
            </span>

            <h1 className="text-[#c20000] font-extrabold leading-[1.1] md:leading-[0.95] mb-6 tracking-tight text-4xl sm:text-5xl lg:text-7xl">
  Shape Your Future <br className="hidden md:block" />
  <span 
    className="font-light italic" 
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    at
  </span>{' '}
  <span className="text-[#ffe9c6]">
    Koshys Group of<br />
    Institutions
  </span>
</h1>

<p className="text-gray-300 text-sm md:text-base max-w-md leading-relaxed mb-8 font-medium opacity-80">
  A legacy of excellence in management, health sciences, and innovation. Join a community where ambition meets world-class opportunity.
</p>

            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              {[ ['5+', 'Institutions'], ['30+', 'Programs'], ['10K+', 'Students'] ].map(([v, l]) => (
                <div key={l} className="px-5 py-3 rounded-2xl flex flex-col bg-white/5 border border-white/10 backdrop-blur-md min-w-[110px]">
                  <div className="text-yellow-400 font-black text-xl">{v}</div>
                  <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT form (Optimized for Mobile view but same style) */}
          <div className="w-full lg:w-auto lg:flex-shrink-0" style={{ maxWidth: 400, width: '100%' }}>
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl">
              <div className="px-5 pt-5 pb-4 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Admissions 2025–26</span>
                <h2 className="text-white font-black text-lg mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>Begin Your Journey</h2>
              </div>

              <div className="px-5 py-5">
                {done ? (
                  <div className="text-center py-6">
                    <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                    <h3 className="text-white font-bold mb-4">Submitted!</h3>
                    <div className="bg-white/5 p-3 rounded-xl mb-4 border border-white/10">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">Application ID</p>
                      <p className="text-yellow-400 font-bold text-lg">{appId}</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="w-full py-3 bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Close</button>
                  </div>
                ) : (
                  <form onSubmit={submitReg} className="space-y-3">
                    <div>
                      <label className={L}>Full Name *</label>
                      <input value={fd.name} onChange={e => sf('name', e.target.value)} onBlur={() => blur('name')} type="text" className={ic('name')} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={L}>Mobile *</label>
                        <input value={fd.mobile} onChange={e => sf('mobile', e.target.value)} onBlur={() => blur('mobile')} type="tel" maxLength={10} className={ic('mobile')} />
                      </div>
                      <div>
                        <label className={L}>Level *</label>
                        <select value={fd.programLevel} onChange={e => { sf('programLevel', e.target.value); sf('program', ''); setProgs(PROGRAMS_BY_LEVEL[e.target.value] || []); }} className={sc('programLevel')}>
                          <option value="">Select</option>
                          {PROGRAM_LEVELS.map(l => <option key={l} value={l} style={{ color: '#000' }}>{l}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={L}>Email *</label>
                      <input value={fd.email} onChange={e => sf('email', e.target.value)} onBlur={() => blur('email')} type="email" className={ic('email')} />
                    </div>
                    {fd.programLevel && (
                      <div>
                        <label className={L}>Program *</label>
                        <select value={fd.program} onChange={e => sf('program', e.target.value)} className={sc('program')}>
                          <option value="">Select Program</option>
                          {progs.map(p => <option key={p} value={p} style={{ color: '#000' }}>{p}</option>)}
                        </select>
                      </div>
                    )}
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                      <label className={L}>Security: {captcha.question}</label>
                      <div className="flex gap-2">
                        <input value={fd.captchaAnswer} onChange={e => sf('captchaAnswer', e.target.value)} className={I} />
                        <button type="button" onClick={verifyCaptcha} className={`px-4 rounded-lg text-[10px] font-bold text-white transition-colors ${captchaOk ? 'bg-green-600' : 'bg-red-800'}`}>
                          {captchaOk ? 'Ok' : 'Verify'}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 py-1">
                      <input type="checkbox" checked={fd.authorization} onChange={e => sf('authorization', e.target.checked)} className="mt-1 accent-red-600" />
                      <label className="text-[9px] text-white/50 leading-tight">Authorize KGI to contact me via SMS/Call/WhatsApp.</label>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-black uppercase text-white bg-gradient-to-r from-red-700 to-red-900 shadow-xl transition active:scale-95">
                      {loading ? <Loader size={14} className="animate-spin" /> : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, i) => <button key={i} onClick={() => go(i)} className="rounded-full transition-all" style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? '#FCD34D' : 'rgba(255,255,255,.4)' }} />)}
      </div>
    </div>
  );
}
