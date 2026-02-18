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

const PROGRAM_LEVELS = ['Undergraduate (UG)','Postgraduate (PG)','Nursing','Allied Health Sciences','Diploma','PhD'];
const PROGRAMS_BY_LEVEL = {
  'Undergraduate (UG)':  ['BBA','B.Com','BCA','BSc','B.Sc Forensic Science','BVA - Animation','BVA - Applied Arts','BVA - Interior Design','B.Com Logistics','BCA Advanced'],
  'Postgraduate (PG)':   ['MBA','MCA','M.Com','MSc'],
  'Nursing':              ['GNM','B.Sc Nursing','PBBSc','M.Sc Nursing'],
  'Allied Health Sciences':['B.Sc MLT','B.Sc Radiology','B.Sc Physiotherapy','B.Sc Renal Dialysis','B.Sc Respiratory','B.Sc AT & OT','B.Sc MIT'],
  'Diploma':              ['Diploma in Management','Diploma in Healthcare','Hotel Management'],
  'PhD':                  ['PhD in Management','PhD in Science','PhD in Healthcare'],
};

// ── SHARED STYLES ────────────────────────────────────────────────
const I = "w-full px-3 py-2.5 text-xs rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#911d30]/50 focus:border-[#911d30]/50 transition backdrop-blur-md";
const S = "w-full px-3 py-2.5 text-xs rounded-lg border border-white/20 bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-[#911d30]/50 focus:border-[#911d30]/50 transition backdrop-blur-md";
const L = "block text-[10px] font-bold text-white/50 mb-1 uppercase tracking-[0.15em]";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: String(a + b) };
}

export default function Hero() {
  // ── SLIDER & PARTICLES ──
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(true);
  const [auto, setAuto] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => go((cur + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, [auto, cur]);

  const go = (i) => { setFade(false); setTimeout(() => { setCur(i); setFade(true); }, 400); };

  // ── FORM STATE ──
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appId, setAppId] = useState('');
  const [fd, setFd] = useState({ name: '', mobile: '', email: '', programLevel: '', program: '', captchaAnswer: '', authorization: false });
  const [errors, setErrors] = useState({});
  const [progs, setProgs] = useState([]);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaOk, setCaptchaOk] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  const sf = (k, v) => {
    setFd(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  const verifyCaptcha = () => {
    if (fd.captchaAnswer.trim() === captcha.answer) setCaptchaOk(true);
    else { setErrors(p => ({ ...p, captchaAnswer: 'Incorrect' })); setCaptcha(generateCaptcha()); sf('captchaAnswer', ''); }
  };

  const submitReg = async (e) => {
    e.preventDefault();
    if (!fd.name || !fd.mobile || !fd.email || !fd.program || !captchaOk || !fd.authorization) {
      setSubmitErr('Please complete all fields and verification.');
      return;
    }
    setLoading(true);
    try {
      const generatedId = 'KGI' + Date.now().toString().slice(-7);
      const body = new FormData();
      Object.entries({ ...fd, applicationId: generatedId, timestamp: new Date().toLocaleString() }).forEach(([k, v]) => body.append(k, v));
      await fetch(GOOGLE_SHEET_URL, { method: 'POST', body });
      setAppId(generatedId);
      setDone(true);
    } catch { setSubmitErr('Submission failed. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
      {/* ── BACKGROUND LAYER (Enhanced Visibility) ── */}
      {heroImages.map((img, i) => (
        <div key={img.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === cur ? 1 : 0 }}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover scale-105" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* ── CONTENT ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-center gap-12 py-20 min-h-screen">
        
        {/* LEFT: TEXT & STATS */}
        <div className="flex-1 text-center lg:text-left transition-all duration-500" style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(20px)' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-xl"
            style={{ background: 'rgba(145, 29, 48, 0.9)', color: '#fff', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            {heroImages[cur].label}
          </span>
          
          <h1 className="text-white font-black leading-[1.1] mb-6 tracking-tight" style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
            Elevate Your <br />
            <span style={{ color: '#FCD34D', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Academic Journey</span><br />
            at Koshys Group
          </h1>
          
          <p className="text-white/70 text-base max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0">
            Discover a legacy of excellence and innovation. Join 10,000+ students shaping the future of Healthcare, Management, and Technology.
          </p>

          {/* GLASS STATS CARDS */}
          <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
            {[['5+', 'Institutions'], ['30+', 'Programs'], ['10K+', 'Students']].map(([v, l]) => (
              <div key={l} className="px-6 py-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/5 flex flex-col items-center lg:items-start min-w-[130px]">
                <div className="text-yellow-400 font-black text-2xl tracking-tighter">{v}</div>
                <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: GLASS FORM */}
        <div className="w-full max-w-[420px] relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-[#911d30]/20 to-transparent rounded-3xl blur-xl opacity-50" />
          <div className="relative rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl border border-white/10" 
               style={{ background: 'rgba(15, 15, 15, 0.6)', backdropFilter: 'blur(35px)' }}>
            
            <div className="mb-6 border-b border-white/10 pb-4">
              <p className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Admissions 2025-26</p>
              <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Register Interest</h2>
            </div>

            {done ? (
              <div className="text-center py-10 animate-in fade-in zoom-in">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <CheckCircle className="text-green-400" size={32} />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Success!</h3>
                <p className="text-white/50 text-xs mb-4">ID: <span className="text-yellow-400 font-mono">{appId}</span></p>
                <button onClick={() => window.location.reload()} className="text-white text-xs underline opacity-50 hover:opacity-100">Submit another</button>
              </div>
            ) : (
              <form onSubmit={submitReg} className="space-y-4">
                <div><label className={L}>Full Name</label><input className={I} placeholder="Enter your name" onChange={e => sf('name', e.target.value)} /></div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={L}>Mobile</label><input className={I} placeholder="10 Digits" maxLength={10} onChange={e => sf('mobile', e.target.value)} /></div>
                  <div><label className={L}>Email</label><input className={I} placeholder="email@domain.com" onChange={e => sf('email', e.target.value)} /></div>
                </div>

                <div>
                  <label className={L}>Program Level</label>
                  <select className={S} onChange={e => { sf('programLevel', e.target.value); setProgs(PROGRAMS_BY_LEVEL[e.target.value] || []); }}>
                    <option value="">Select Level</option>
                    {PROGRAM_LEVELS.map(l => <option key={l} className="bg-black text-white">{l}</option>)}
                  </select>
                </div>

                {progs.length > 0 && (
                  <div>
                    <label className={L}>Specific Course</label>
                    <select className={S} onChange={e => sf('program', e.target.value)}>
                      <option value="">Select Course</option>
                      {progs.map(p => <option key={p} className="bg-black text-white">{p}</option>)}
                    </select>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <label className={L}>Security: {captcha.question}</label>
                  <div className="flex gap-2">
                    <input className={I} placeholder="Answer" onChange={e => sf('captchaAnswer', e.target.value)} disabled={captchaOk} />
                    {!captchaOk && <button type="button" onClick={verifyCaptcha} className="px-4 py-2 bg-white/10 rounded-lg text-white text-[10px] font-bold hover:bg-white/20 transition">Verify</button>}
                    {captchaOk && <CheckCircle size={20} className="text-green-400 self-center" />}
                  </div>
                </div>

                <div className="flex gap-2 items-start opacity-70">
                  <input type="checkbox" className="mt-1 accent-[#911d30]" onChange={e => sf('authorization', e.target.checked)} />
                  <p className="text-[9px] text-white leading-tight">I allow KGI to contact me via Call/SMS/WhatsApp regarding my application.</p>
                </div>

                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR}, #631421)` }}>
                  {loading ? <Loader className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                  {loading ? 'Processing...' : 'Apply Now'}
                </button>
                {submitErr && <p className="text-red-400 text-[10px] text-center font-bold">{submitErr}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
