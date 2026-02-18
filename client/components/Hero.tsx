'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Loader, CheckCircle, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyjho59uS7yLSETGdJZoL-Dr1V1BAbW2UeQcOgP8eIOCap37DDMHXe84_UYT-RTVJ1m/exec';

// ── All original data / constants (unchanged) ────────────────────
const heroImages = [
  { id:1, label:'Management Studies',    url:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&h=900&fit=crop' },
  { id:2, label:'Health Sciences',       url:'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1400&h=900&fit=crop' },
  { id:3, label:'Hotel Management',      url:'https://images.unsplash.com/photo-1541339907198-943c28ab91c2?w=1400&h=900&fit=crop' },
  { id:4, label:'Research & Innovation', url:'https://images.unsplash.com/photo-1533519227268-461353132943?w=1400&h=900&fit=crop' },
];

const PROGRAM_LEVELS = ['Undergraduate (UG)','Postgraduate (PG)','Nursing','Allied Health Sciences','Diploma','PhD'];
const PROGRAMS_BY_LEVEL = {
  'Undergraduate (UG)':  ['BBA','B.Com','BCA','BSc','B.Sc Forensic Science','BVA - Animation','BVA - Applied Arts','BVA - Interior Design','B.Com Logistics','BCA Advanced'],
  'Postgraduate (PG)':   ['MBA','MCA','M.Com','MSc'],
  'Nursing':             ['GNM','B.Sc Nursing','PBBSc','M.Sc Nursing'],
  'Allied Health Sciences':['B.Sc MLT','B.Sc Radiology','B.Sc Physiotherapy','B.Sc Renal Dialysis','B.Sc Respiratory','B.Sc AT & OT','B.Sc MIT'],
  'Diploma':             ['Diploma in Management','Diploma in Healthcare','Hotel Management'],
  'PhD':                 ['PhD in Management','PhD in Science','PhD in Healthcare'],
};

// ── Particle hook (unchanged) ────────────────────────────────────
function useParticles(ref) {
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: 55 }, () => ({
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
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(255,200,140,${.1 * (1 - d / 110)})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [ref]);
}

// ── Shared input class names (unchanged) ─────────────────────────
const I = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const S = "w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const L = "block text-[10px] font-bold text-white/60 mb-1 uppercase tracking-widest";

// ── Simple math CAPTCHA (no API needed) ──────────────────────────
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

// ── Form validation ───────────────────────────────────────────────
function validateForm(fd) {
  const errs = {};
  if (!fd.name.trim() || fd.name.trim().length < 2)
    errs.name = 'Please enter your full name.';
  if (!fd.mobile.trim() || !/^[6-9]\d{9}$/.test(fd.mobile.trim()))
    errs.mobile = 'Enter a valid 10-digit mobile number.';
  if (!fd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email.trim()))
    errs.email = 'Enter a valid email address.';
  if (!fd.programLevel)
    errs.programLevel = 'Please select a program level.';
  if (!fd.program)
    errs.program = 'Please select a program.';
  if (!fd.captchaAnswer.trim())
    errs.captchaAnswer = 'Please answer the security question.';
  if (!fd.authorization)
    errs.authorization = 'Please accept the authorization terms.';
  return errs;
}

// ════════════════════════════════════════════════════════════════
export default function Hero() {
  // ── Slider state (unchanged) ───────────────────────────────────
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

  // ── Form state ─────────────────────────────────────────────────
  const [done, setDone]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');

  // ── Registration form state ────────────────────────────────────
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

  // ── Field helpers ──────────────────────────────────────────────
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

  // ── CAPTCHA verify ─────────────────────────────────────────────
  const verifyCaptcha = () => {
    if (fd.captchaAnswer.trim() === captcha.answer) {
      setCaptchaOk(true);
      setErrors(p => ({ ...p, captchaAnswer: undefined }));
    } else {
      setErrors(p => ({ ...p, captchaAnswer: 'Wrong answer. Try again.' }));
      setCaptcha(generateCaptcha());
      sf('captchaAnswer', '');
    }
  };

  // ── Submit registration → Google Sheets ───────────────────────
  const submitReg = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(fd).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validateForm(fd);
    setErrors(errs);
    
    if (Object.keys(errs).length > 0) return;
    if (!captchaOk) { setErrors(p => ({ ...p, captchaAnswer: 'Please verify the CAPTCHA first.' })); return; }
    
    setLoading(true); setSubmitErr('');
try {
  const generatedId = 'KGI' + Date.now().toString().slice(-7);
  const params = new URLSearchParams({
    applicationId: generatedId,
    timestamp: new Date().toLocaleString('en-IN'),
    name: fd.name.trim(),
    mobile: fd.mobile.trim(),
    email: fd.email.trim(),
    programLevel: fd.programLevel,
    program: fd.program,
  });
  await fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, {
    method: 'GET',
    mode: 'no-cors',
  });
  setAppId(generatedId);
  setDone(true);
} catch {
  setSubmitErr('Network error. Please try again.');
} finally {
  setLoading(false);
}
  };

  // ══════════════════════════════════════════════════════════════
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'calc(100vh - 72px)' }}
      onMouseEnter={() => setAuto(false)}
      onMouseLeave={() => setAuto(true)}
    >
      {/* ── Slider BG ── */}
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
        </div>
      ))}
      
      {/* ✨ DARKER OVERLAYS — increased opacity values ✨ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* ── Layout ── */}
      <div className="relative z-20 w-full flex items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* LEFT text */}
          <div className="flex-1 lg:pr-8 transition-opacity duration-400" style={{ opacity: fade ? 1 : 0 }}>
            <span className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[.18em]"
              style={{ background: 'rgba(220,38,38,.75)', color: '#fff', backdropFilter: 'blur(6px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
              {heroImages[cur].label}
            </span>
            <h1 className="text-white font-black leading-[1.08] mb-5"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.1rem,4vw,3.4rem)' }}>
              Welcome to<br />
              <span style={{ color: '#FCD34D' }}>Koshys Group</span><br />
              of Institutions <span className="text-red-400">(KGI)</span>
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-sm leading-relaxed mb-8">
              Empowering students with quality education across management, health sciences, hotel management, and school programs.
            </p>
            <div className="flex gap-6 flex-wrap">
              {[['5+', 'Institutions'], ['30+', 'Programs'], ['10K+', 'Students']].map(([v, l]) => (
                <div key={l} style={{ borderLeft: '2px solid rgba(252,211,77,.5)', paddingLeft: 12 }}>
                  <div className="text-yellow-300 font-black text-2xl" style={{ fontFamily: "'Playfair Display',serif" }}>{v}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT form card */}
          <div className="w-full lg:w-auto lg:flex-shrink-0" style={{ maxWidth: 400, width: '100%' }}>
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(8,8,8,.72)', backdropFilter: 'blur(22px)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 28px 64px rgba(0,0,0,.55)' }}>
              
              {/* Card header */}
              <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Admissions Open 2025–26</span>
                <h2 className="text-white font-black text-lg mt-0.5 leading-tight" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Begin Your Journey at KGI
                </h2>
              </div>

              {/* ── Form body ── */}
              <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: '72vh' }}>
                
                {/* ── SUCCESS screen ── */}
                {done ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(34,197,94,.15)' }}>
                      <CheckCircle size={28} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-black text-base mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
                      Application Submitted!
                    </h3>
                    {appId && (
                      <div className="inline-block my-2 px-4 py-2 rounded-xl"
                        style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }}>
                        <p className="text-[10px] text-white/50 mb-1">Application ID</p>
                        <p className="text-yellow-300 font-black tracking-widest text-sm">{appId}</p>
                      </div>
                    )}
                    <p className="text-[11px] text-white/50 mb-5">Save your ID to track application status.</p>
                    <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg,#B91C1C,#7F1D1D)' }}>
                      Return Home <ArrowRight size={13} />
                    </a>
                  </div>
                ) : (
                  /* ══════════════════════════════════════════════
                     REGISTRATION FORM
                     ══════════════════════════════════════════════ */
                  <form onSubmit={submitReg} className="space-y-3" noValidate>
                    
                    {/* Network error */}
                    {submitErr && (
                      <div className="flex items-start gap-2 p-2.5 rounded-lg"
                        style={{ background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.3)' }}>
                        <AlertCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-red-300">{submitErr}</p>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className={L}>Applicant Name *</label>
                      <input
                        value={fd.name}
                        onChange={e => sf('name', e.target.value)}
                        onBlur={() => blur('name')}
                        type="text" placeholder="Full name (as per 10th marks card)"
                        className={ic('name')}
                      />
                      <FieldErr name="name" />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className={L}><Phone size={9} className="inline mr-1" />Mobile Number *</label>
                      <input
                        value={fd.mobile}
                        onChange={e => sf('mobile', e.target.value)}
                        onBlur={() => blur('mobile')}
                        type="tel" maxLength={10} placeholder="10-digit number"
                        className={ic('mobile')}
                      />
                      <FieldErr name="mobile" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={L}>Email Address *</label>
                      <input
                        value={fd.email}
                        onChange={e => sf('email', e.target.value)}
                        onBlur={() => blur('email')}
                        type="email" placeholder="your@email.com"
                        className={ic('email')}
                      />
                      <FieldErr name="email" />
                    </div>

                    {/* Program Level */}
                    <div>
                      <label className={L}>Program Level *</label>
                      <select
                        value={fd.programLevel}
                        onChange={e => {
                          const l = e.target.value;
                          sf('programLevel', l);
                          sf('program', '');
                          setProgs(PROGRAMS_BY_LEVEL[l] || []);
                        }}
                        onBlur={() => blur('programLevel')}
                        className={sc('programLevel')}
                      >
                        <option value="">Select level</option>
                        {PROGRAM_LEVELS.map(l => <option key={l} value={l} style={{ color: '#000' }}>{l}</option>)}
                      </select>
                      <FieldErr name="programLevel" />
                    </div>

                    {/* Program */}
                    {fd.programLevel && (
                      <div>
                        <label className={L}>Program *</label>
                        <select
                          value={fd.program}
                          onChange={e => sf('program', e.target.value)}
                          onBlur={() => blur('program')}
                          className={sc('program')}
                        >
                          <option value="">Select program</option>
                          {progs.map(p => <option key={p} value={p} style={{ color: '#000' }}>{p}</option>)}
                        </select>
                        <FieldErr name="program" />
                      </div>
                    )}

                    {/* CAPTCHA */}
                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)' }}>
                      <label className={L}>Security Verification *</label>
                      {captchaOk ? (
                        <div className="flex items-center gap-2 text-green-400 mt-1">
                          <CheckCircle size={13} /><span className="text-[11px] font-bold">Verified ✓</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-2 px-3 py-2 rounded-lg"
                            style={{ background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.1)' }}>
                            <span className="text-[10px] text-white/50">Solve:</span>
                            <span className="font-mono text-base font-black text-yellow-300">{captcha.question}</span>
                            <button type="button" onClick={() => { setCaptcha(generateCaptcha()); sf('captchaAnswer', ''); }}
                              className="text-white/40 hover:text-white/70 text-[10px]">↺ New</button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              value={fd.captchaAnswer}
                              onChange={e => sf('captchaAnswer', e.target.value)}
                              onBlur={() => blur('captchaAnswer')}
                              placeholder="Your answer"
                              className={`${I} flex-1`}
                            />
                            <button type="button" onClick={verifyCaptcha}
                              className="px-3 py-2 rounded-lg text-[11px] font-black text-white hover:opacity-90 whitespace-nowrap"
                              style={{ background: '#B91C1C' }}>
                              Verify
                            </button>
                          </div>
                          <FieldErr name="captchaAnswer" />
                        </>
                      )}
                    </div>

                    {/* Authorization */}
                    <div className="flex items-start gap-2 p-3 rounded-xl"
                      style={{ background: 'rgba(59,130,246,.1)', border: `1px solid ${errors.authorization ? 'rgba(239,68,68,.4)' : 'rgba(59,130,246,.2)'}` }}>
                      <input
                        type="checkbox" id="auth"
                        checked={fd.authorization}
                        onChange={e => sf('authorization', e.target.checked)}
                        className="mt-0.5 w-3 h-3 accent-red-600 cursor-pointer shrink-0"
                      />
                      <label htmlFor="auth" className="text-[10px] text-white/60 leading-relaxed cursor-pointer">
                        I authorize KGI and its representatives to contact me via email, SMS, WhatsApp and call.
                        This overrides DND/NDNC. *
                      </label>
                    </div>
                    {errors.authorization && (
                      <p className="text-[10px] text-red-400 flex items-center gap-1 -mt-2">
                        <AlertCircle size={9} />{errors.authorization}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wide text-white flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-40"
                      style={{ background: 'linear-gradient(135deg,#B91C1C,#7F1D1D)' }}
                    >
                      {loading ? <Loader size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>

                    <p className="text-center text-[10px] text-white/30">
                      By registering you agree to our{' '}
                      <a href="#" className="text-yellow-400/60 hover:text-yellow-400">Terms</a> &amp;{' '}
                      <a href="#" className="text-yellow-400/60 hover:text-yellow-400">Privacy Policy</a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Slider controls ── */}
      <button onClick={() => { go((cur - 1 + heroImages.length) % heroImages.length); setAuto(false); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition hover:scale-110"
        style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,.18)' }}
        aria-label="Previous"><ChevronLeft size={20} className="text-white" />
      </button>
      <button onClick={() => { go((cur + 1) % heroImages.length); setAuto(false); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition hover:scale-110"
        style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,.18)' }}
        aria-label="Next"><ChevronRight size={20} className="text-white" />
      </button>
      
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => { go(i); setAuto(false); }}
            className="rounded-full transition-all duration-300"
            style={{ width: i === cur ? 28 : 8, height: 8, background: i === cur ? '#FCD34D' : 'rgba(255,255,255,.4)' }}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${((cur + 1) / heroImages.length) * 100}%` }} />
      </div>
    </div>
  );
}
