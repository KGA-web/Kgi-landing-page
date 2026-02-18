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
    const pts = Array.from({ length: 35 }, () => ({ // Reduced for mobile perf
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

const I = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const S = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const L = "block text-[10px] font-bold text-white/60 mb-1 uppercase tracking-widest";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

function validateForm(fd) {
  const errs = {};
  if (!fd.name.trim() || fd.name.trim().length < 2) errs.name = 'Please enter full name.';
  if (!fd.mobile.trim() || !/^[6-9]\d{9}$/.test(fd.mobile.trim())) errs.mobile = 'Enter valid 10-digit number.';
  if (!fd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email.trim())) errs.email = 'Enter valid email.';
  if (!fd.programLevel) errs.programLevel = 'Select program level.';
  if (!fd.program) errs.program = 'Select program.';
  if (!fd.captchaAnswer.trim()) errs.captchaAnswer = 'Answer the security question.';
  if (!fd.authorization) errs.authorization = 'Accept authorization.';
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

  const FieldErr = ({ name }) => errors[name]
    ? <p className="mt-1 text-[10px] text-red-400 flex items-center gap-1">
        <AlertCircle size={9} className="shrink-0" />{errors[name]}
      </p>
    : null;

  const verifyCaptcha = () => {
    if (fd.captchaAnswer.trim() === captcha.answer) {
      setCaptchaOk(true);
      setErrors(p => ({ ...p, captchaAnswer: undefined }));
    } else {
      setErrors(p => ({ ...p, captchaAnswer: 'Wrong answer.' }));
      setCaptcha(generateCaptcha());
      sf('captchaAnswer', '');
    }
  };

  const submitReg = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(fd).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validateForm(fd);
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !captchaOk) return;

    setLoading(true); setSubmitErr('');
    try {
      const generatedId = 'KGI' + Date.now().toString().slice(-7);
      const body = new FormData();
      body.append('applicationId', generatedId);
      body.append('timestamp', new Date().toLocaleString('en-IN'));
      body.append('name', fd.name.trim());
      body.append('mobile', fd.mobile.trim());
      body.append('email', fd.email.trim());
      body.append('programLevel', fd.programLevel);
      body.append('program', fd.program);

      await fetch(GOOGLE_SHEET_URL, { method: 'POST', body });
      setAppId(generatedId);
      setDone(true);
    } catch {
      setSubmitErr('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col" style={{ minHeight: 'calc(100vh - 72px)' }} onMouseEnter={() => setAuto(false)} onMouseLeave={() => setAuto(true)}>
      {/* BACKGROUNDS */}
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-20 w-full flex-1 flex items-center overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-10 lg:py-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-6">

          {/* LEFT TEXT - Original Design but scaled for mobile */}
          <div className="w-full lg:flex-1 text-center lg:text-left transition-opacity duration-400" style={{ opacity: fade ? 1 : 0 }}>
            <span className="mb-4 lg:mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ background: 'rgba(145, 29, 48, 0.85)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_#FCD34D]" />
              {heroImages[cur].label}
            </span>

            <h1 className="text-white font-extrabold leading-[1.1] lg:leading-[0.95] mb-4 lg:mb-6 tracking-tight text-3xl sm:text-5xl lg:text-7xl"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Shape Your Future <br />
              <span className="text-white/90 font-light italic" style={{ fontFamily: "'Playfair Display', serif" }}>at</span>{' '}
              <span style={{ color: '#ffe9c6' }}>Koshys Group of</span><br />
              <span style={{ color: '#ffe9c6' }} className="drop-shadow-sm">Institutions</span>
            </h1>

            <p className="text-gray-300 text-xs md:text-base max-w-md leading-relaxed mb-8 lg:mb-10 font-medium opacity-80 mx-auto lg:mx-0">
              A legacy of excellence in management, health sciences, and innovation. Join a community where ambition meets world-class opportunity.
            </p>

            <div className="flex gap-3 lg:gap-4 flex-wrap justify-center lg:justify-start">
              {[ ['5+', 'Institutions'], ['30+', 'Programs'], ['10K+', 'Students'] ].map(([v, l]) => (
                <div key={l} className="px-4 py-3 lg:px-6 lg:py-4 rounded-2xl flex flex-col justify-center min-w-[100px] lg:min-w-[120px]"
                  style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div className="text-yellow-400 font-black text-xl lg:text-2xl mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{v}</div>
                  <div className="text-white/40 text-[8px] lg:text-[9px] font-bold uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM - Preserved design with container width fix */}
          <div className="w-full max-w-[400px] lg:flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,.15)' }}>

              <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Admissions 2025–26</span>
                <h2 className="text-white font-black text-lg mt-0.5" style={{ fontFamily: "'Playfair Display',serif" }}>Begin Your Journey</h2>
              </div>

              <div className="px-5 py-4">
                {done ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(34,197,94,.15)' }}>
                      <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-black text-base mb-1">Submitted!</h3>
                    <div className="inline-block my-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }}>
                      <p className="text-[10px] text-white/50 mb-1 uppercase tracking-widest">ID</p>
                      <p className="text-yellow-300 font-black text-sm">{appId}</p>
                    </div>
                    <a href="/" className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white mt-4 bg-[#911d30]">Return Home <ArrowRight size={13} /></a>
                  </div>
                ) : (
                  <form onSubmit={submitReg} className="space-y-3" noValidate>
                    {submitErr && <div className="p-2.5 rounded-lg text-[11px] text-red-300 bg-red-900/20 border border-red-900/30">{submitErr}</div>}
                    <div>
                      <label className={L}>Full Name *</label>
                      <input value={fd.name} onChange={e => sf('name', e.target.value)} onBlur={() => blur('name')} type="text" className={ic('name')} />
                      <FieldErr name="name" />
                    </div>
                    <div>
                      <label className={L}>Mobile *</label>
                      <input value={fd.mobile} onChange={e => sf('mobile', e.target.value)} onBlur={() => blur('mobile')} type="tel" maxLength={10} className={ic('mobile')} />
                      <FieldErr name="mobile" />
                    </div>
                    <div>
                      <label className={L}>Email *</label>
                      <input value={fd.email} onChange={e => sf('email', e.target.value)} onBlur={() => blur('email')} type="email" className={ic('email')} />
                      <FieldErr name="email" />
                    </div>
                    <div>
                      <label className={L}>Level *</label>
                      <select value={fd.programLevel} onChange={e => { sf('programLevel', e.target.value); sf('program', ''); setProgs(PROGRAMS_BY_LEVEL[e.target.value] || []); }} className={sc('programLevel')}>
                        <option value="">Select level</option>
                        {PROGRAM_LEVELS.map(l => <option key={l} value={l} style={{ color: '#000' }}>{l}</option>)}
                      </select>
                      <FieldErr name="programLevel" />
                    </div>
                    {fd.programLevel && (
                      <div>
                        <label className={L}>Program *</label>
                        <select value={fd.program} onChange={e => sf('program', e.target.value)} className={sc('program')}>
                          <option value="">Select program</option>
                          {progs.map(p => <option key={p} value={p} style={{ color: '#000' }}>{p}</option>)}
                        </select>
                        <FieldErr name="program" />
                      </div>
                    )}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <label className={L}>Verify: {captcha.question}</label>
                      <div className="flex gap-2">
                        <input value={fd.captchaAnswer} onChange={e => sf('captchaAnswer', e.target.value)} className={I} />
                        <button type="button" onClick={verifyCaptcha} className={`px-3 py-2 rounded-lg text-[11px] font-black text-white transition-all ${captchaOk ? 'bg-green-600' : 'bg-[#911d30]'}`}>
                          {captchaOk ? 'Ok' : 'Verify'}
                        </button>
                      </div>
                      <FieldErr name="captchaAnswer" />
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                      <input type="checkbox" checked={fd.authorization} onChange={e => sf('authorization', e.target.checked)} className="mt-1 accent-[#911d30]" />
                      <label className="text-[9px] text-white/60 leading-tight">I authorize KGI to contact me via SMS/Call/WhatsApp. This overrides DND.</label>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-black uppercase text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #911d30, #6d1524)' }}>
                      {loading ? <Loader size={14} className="animate-spin" /> : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <button onClick={() => { go((cur - 1 + heroImages.length) % heroImages.length); setAuto(false); }} className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:scale-110 transition"><ChevronLeft size={20} className="text-white" /></button>
      <button onClick={() => { go((cur + 1) % heroImages.length); setAuto(false); }} className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:scale-110 transition"><ChevronRight size={20} className="text-white" /></button>
      
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, i) => <button key={i} onClick={() => { go(i); setAuto(false); }} className="rounded-full transition-all" style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? '#FCD34D' : 'rgba(255,255,255,.4)' }} />)}
      </div>
    </div>
  );
}
