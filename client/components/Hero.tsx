'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Loader, CheckCircle, AlertCircle, ArrowRight, Eye, EyeOff, RefreshCw } from 'lucide-react';

const heroImages = [
  { id:1, label:'Management Studies',   url:'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&h=900&fit=crop' },
  { id:2, label:'Health Sciences',      url:'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1400&h=900&fit=crop' },
  { id:3, label:'Hotel Management',     url:'https://images.unsplash.com/photo-1541339907198-943c28ab91c2?w=1400&h=900&fit=crop' },
  { id:4, label:'Research & Innovation',url:'https://images.unsplash.com/photo-1533519227268-461353132943?w=1400&h=900&fit=crop' },
];

const CITIES_BY_STATE: Record<string,string[]> = {
  'Andaman and Nicobar Islands':['Port Blair','Diglipur','Rangat','Mayabunder','Car Nicobar'],
  'Andhra Pradesh':['Visakhapatnam','Vijayawada','Guntur','Nellore','Kurnool','Kakinada','Tirupati','Rajahmundry','Kadapa','Anantapur','Eluru','Ongole','Vizianagaram','Bhimavaram','Tenali','Chittoor','Machilipatnam','Adoni','Hindupur','Proddatur'],
  'Arunachal Pradesh':['Itanagar','Naharlagun','Pasighat','Namsai','Bomdila','Ziro','Along','Tezu','Khonsa','Aalo'],
  'Assam':['Guwahati','Silchar','Dibrugarh','Jorhat','Nagaon','Tinsukia','Tezpur','Bongaigaon','Dhubri','Diphu','Sivasagar','Goalpara','Karimganj','Hailakandi','North Lakhimpur'],
  'Bihar':['Patna','Gaya','Bhagalpur','Muzaffarpur','Purnia','Darbhanga','Bihar Sharif','Arrah','Begusarai','Katihar','Munger','Chhapra','Hajipur','Saharsa','Sasaram','Motihari','Siwan','Bettiah','Jehanabad','Aurangabad'],
  'Chandigarh':['Chandigarh','Mohali','Panchkula'],
  'Chhattisgarh':['Raipur','Bhilai','Bilaspur','Korba','Durg','Rajnandgaon','Jagdalpur','Ambikapur','Chirmiri','Dhamtari','Mahasamund','Kawardha','Janjgir','Raigarh'],
  'Dadra and Nagar Haveli':['Silvassa','Amli','Khanvel'],
  'Daman and Diu':['Daman','Diu','Moti Daman'],
  'Delhi':['New Delhi','Central Delhi','North Delhi','South Delhi','East Delhi','West Delhi','North East Delhi','North West Delhi','Shahdara','Dwarka','Rohini','Janakpuri','Laxmi Nagar','Pitampura','Saket'],
  'Goa':['Panaji','Margao','Vasco da Gama','Mapusa','Ponda','Bicholim','Curchorem','Canacona','Pernem','Quepem'],
  'Gujarat':['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar','Junagadh','Gandhinagar','Anand','Nadiad','Navsari','Morbi','Surendranagar','Bharuch','Mehsana','Bhuj','Porbandar','Palanpur','Vapi','Ankleshwar'],
  'Haryana':['Faridabad','Gurugram','Panipat','Ambala','Yamunanagar','Rohtak','Hisar','Karnal','Sonipat','Panchkula','Bhiwani','Sirsa','Bahadurgarh','Jind','Thanesar','Kaithal','Rewari','Palwal'],
  'Himachal Pradesh':['Shimla','Dharamshala','Solan','Mandi','Baddi','Palampur','Kullu','Manali','Nahan','Chamba','Una','Hamirpur','Bilaspur','Kangra'],
  'Jammu and Kashmir':['Srinagar','Jammu','Anantnag','Sopore','Baramulla','Udhampur','Kathua','Rajouri','Punch','Kupwara','Pulwama','Bandipora'],
  'Jharkhand':['Ranchi','Jamshedpur','Dhanbad','Bokaro','Deoghar','Hazaribagh','Giridih','Ramgarh','Medininagar','Phusro','Chakradharpur','Dumka','Sahibganj','Chaibasa'],
  'Karnataka':['Bengaluru','Mysuru','Hubli','Dharwad','Mangaluru','Belagavi','Kalaburagi','Ballari','Tumkur','Shivamogga','Davangere','Vijayapura','Bidar','Udupi','Raichur','Hassan','Chikkamagaluru','Chitradurga','Bagalkot','Gadag'],
  'Kerala':['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam','Palakkad','Alappuzha','Malappuram','Kannur','Kasaragod','Kottayam','Wayanad','Pathanamthitta','Ernakulam'],
  'Ladakh':['Leh','Kargil','Nubra','Zanskar','Drass'],
  'Lakshadweep':['Kavaratti','Agatti','Andrott','Minicoy','Amini'],
  'Madhya Pradesh':['Bhopal','Indore','Jabalpur','Gwalior','Ujjain','Sagar','Dewas','Satna','Ratlam','Rewa','Murwara','Singrauli','Burhanpur','Khandwa','Bhind','Chhindwara','Guna','Shivpuri','Vidisha','Chhatarpur'],
  'Maharashtra':['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Amravati','Kolhapur','Sangli','Latur','Dhule','Ahmednagar','Chandrapur','Parbhani','Jalgaon','Akola','Nanded','Satara','Ratnagiri','Wardha'],
  'Manipur':['Imphal','Thoubal','Kakching','Churachandpur','Senapati','Bishnupur','Jiribam','Moreh'],
  'Meghalaya':['Shillong','Tura','Jowai','Nongstoin','Baghmara','Resubelpara','Nongpoh'],
  'Mizoram':['Aizawl','Lunglei','Champhai','Serchhip','Kolasib','Lawngtlai','Mamit'],
  'Nagaland':['Kohima','Dimapur','Mokokchung','Tuensang','Wokha','Zunheboto','Phek','Mon','Longleng','Kiphire'],
  'Odisha':['Bhubaneswar','Cuttack','Rourkela','Brahmapur','Sambalpur','Puri','Balasore','Baripada','Bhadrak','Jharsuguda','Bargarh','Rayagada','Koraput','Kendujhar','Dhenkanal'],
  'Puducherry':['Pondicherry','Karaikal','Mahe','Yanam'],
  'Punjab':['Ludhiana','Amritsar','Jalandhar','Patiala','Bathinda','Mohali','Firozpur','Hoshiarpur','Batala','Pathankot','Moga','Abohar','Malerkotla','Khanna','Phagwara'],
  'Rajasthan':['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer','Bharatpur','Alwar','Bhilwara','Sri Ganganagar','Sikar','Pali','Tonk','Barmer','Churu','Jhunjhunu','Nagaur','Sawai Madhopur','Kishangarh','Hanumangarh'],
  'Sikkim':['Gangtok','Namchi','Gyalshing','Mangan','Rangpo','Jorethang'],
  'Tamil Nadu':['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli','Tiruppur','Vellore','Erode','Thoothukudi','Dindigul','Thanjavur','Ranipet','Sivakasi','Karur','Ooty','Hosur','Nagercoil','Kanchipuram'],
  'Telangana':['Hyderabad','Warangal','Nizamabad','Karimnagar','Khammam','Ramagundam','Mahbubnagar','Nalgonda','Adilabad','Suryapet','Miryalaguda','Siddipet','Mancherial','Jagtial','Kothagudem'],
  'Tripura':['Agartala','Udaipur','Dharmanagar','Kailashahar','Belonia','Ambassa','Bishalgarh','Sabroom'],
  'Uttar Pradesh':['Lucknow','Kanpur','Ghaziabad','Agra','Meerut','Varanasi','Prayagraj','Bareilly','Aligarh','Moradabad','Saharanpur','Gorakhpur','Noida','Firozabad','Jhansi','Muzaffarnagar','Mathura','Budaun','Greater Noida','Loni'],
  'Uttarakhand':['Dehradun','Haridwar','Rishikesh','Roorkee','Haldwani','Rudrapur','Kashipur','Ramnagar','Pithoragarh','Almora','Nainital','Mussoorie','Kotdwar'],
  'West Bengal':['Kolkata','Howrah','Durgapur','Asansol','Siliguri','Bardhaman','Malda','Baharampur','Habra','Kharagpur','Shantipur','Dankuni','Dhulian','Ranaghat','Haldia'],
};
const INDIAN_STATES = Object.keys(CITIES_BY_STATE).sort();

const PROGRAM_LEVELS = ['Undergraduate (UG)','Postgraduate (PG)','Nursing','Allied Health Sciences','Diploma','PhD'];
const PROGRAMS_BY_LEVEL: Record<string,string[]> = {
  'Undergraduate (UG)':['BBA','B.Com','BCA','BSc','B.Sc Forensic Science','BVA - Animation','BVA - Applied Arts','BVA - Interior Design','B.Com Logistics','BCA Advanced'],
  'Postgraduate (PG)':['MBA','MCA','M.Com','MSc'],
  'Nursing':['GNM','B.Sc Nursing','PBBSc','M.Sc Nursing'],
  'Allied Health Sciences':['B.Sc MLT','B.Sc Radiology','B.Sc Physiotherapy','B.Sc Renal Dialysis','B.Sc Respiratory','B.Sc AT & OT','B.Sc MIT'],
  'Diploma':['Diploma in Management','Diploma in Healthcare','Hotel Management'],
  'PhD':['PhD in Management','PhD in Science','PhD in Healthcare'],
};
const SPECIALIZATIONS: Record<string,string[]> = {
  'MBA':['Finance','Marketing','Operations','HR','General Management'],
  'BBA':['Finance','Marketing','Operations'],
  'MCA':['Software Development','Data Analytics'],
  'B.Sc Nursing':['General Nursing','Community Health','Critical Care'],
  'B.Sc MLT':['Clinical Pathology','Microbiology','Biochemistry'],
  'B.Sc Physiotherapy':['Orthopedics','Neurology','Sports'],
};
const COUNTRIES = ['India','Afghanistan','Australia','Bahrain','Bangladesh','Canada','France','Germany','Kuwait','Malaysia','Nepal','New Zealand','Oman','Pakistan','Qatar','Saudi Arabia','Singapore','Sri Lanka','UAE','United Kingdom','United States','Other'];
const ACADEMIC_SESSIONS = ['2024-2025','2025-2026','2026-2027'];

interface Pt{x:number;y:number;vx:number;vy:number;r:number;a:number}
function useParticles(ref:React.RefObject<HTMLCanvasElement>){
  useEffect(()=>{
    const cv=ref.current;if(!cv)return;
    const ctx=cv.getContext('2d');if(!ctx)return;
    const resize=()=>{cv.width=cv.offsetWidth;cv.height=cv.offsetHeight};
    resize();window.addEventListener('resize',resize);
    const pts:Pt[]=Array.from({length:55},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.8+.5,a:Math.random()*.35+.1}));
    let raf:number;
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
      for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>cv.width)p.vx*=-1;if(p.y<0||p.y>cv.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,220,170,${p.a})`;ctx.fill()}
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,200,140,${.1*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke()}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)};
  },[ref]);
}

const I="w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const S="w-full px-3 py-2 text-xs rounded-lg border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/50 transition backdrop-blur-sm";
const L="block text-[10px] font-bold text-white/60 mb-1 uppercase tracking-widest";

export default function Hero(){
  const[cur,setCur]=useState(0);
  const[fade,setFade]=useState(true);
  const[auto,setAuto]=useState(true);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);
  useEffect(()=>{if(!auto)return;const t=setInterval(()=>go((cur+1)%heroImages.length),5000);return()=>clearInterval(t)},[auto,cur]);
  const go=(i:number)=>{setFade(false);setTimeout(()=>{setCur(i);setFade(true)},350)};

  const[tab,setTab]=useState<'register'|'login'>('register');
  const[done,setDone]=useState(false);
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState('');
  const[otpSent,setOtpSent]=useState(false);
  const[otpOk,setOtpOk]=useState(false);
  const[captcha,setCaptcha]=useState({code:'',sessionId:''});
  const[captchaOk,setCaptchaOk]=useState(false);
  const[showPwd,setShowPwd]=useState(false);
  const[appId,setAppId]=useState('');
  const[cities2,setCities2]=useState<string[]>([]);
  const[progs,setProgs]=useState<string[]>([]);
  const[specs,setSpecs]=useState<string[]>([]);
  const[fd,setFd]=useState({name:'',mobile:'',countryCode:'+91',otp:'',nationality:'India',academicSession:'',state:'',city:'',programLevel:'',program:'',specialization:'',captchaAnswer:'',authorization:false});
  const[ld,setLd]=useState({email:'',password:''});
  const sf=(k:string,v:string|boolean)=>{setFd(p=>({...p,[k]:v}));setErr('')};
  useEffect(()=>{genCaptcha()},[]);

  const genCaptcha=async()=>{try{const r=await fetch('/api/captcha/generate',{method:'POST'});if(r.ok){const d=await r.json();setCaptcha({code:d.captchaCode,sessionId:d.sessionId});setCaptchaOk(false);sf('captchaAnswer','')}}catch(e){console.error(e)}};
  const sendOTP=async()=>{if(!fd.mobile){setErr('Enter mobile number');return}setLoading(true);setErr('');try{const r=await fetch('/api/otp/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phoneNumber:fd.countryCode+fd.mobile})});if(r.ok)setOtpSent(true);else setErr('Failed to send OTP')}catch{setErr('Network error')}finally{setLoading(false)}};
  const verifyOTP=async()=>{if(!fd.otp){setErr('Enter the OTP');return}setLoading(true);setErr('');try{const r=await fetch('/api/otp/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phoneNumber:fd.countryCode+fd.mobile,otp:fd.otp})});if(r.ok)setOtpOk(true);else setErr('Invalid OTP')}catch{setErr('Network error')}finally{setLoading(false)}};
  const verifyCaptcha=async()=>{if(!fd.captchaAnswer){setErr('Enter CAPTCHA answer');return}setLoading(true);setErr('');try{const r=await fetch('/api/captcha/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({captchaAnswer:fd.captchaAnswer,sessionId:captcha.sessionId})});if(r.ok)setCaptchaOk(true);else{setErr('Wrong answer');genCaptcha()}}catch{setErr('Error')}finally{setLoading(false)}};
  const submitReg=async(e:React.FormEvent)=>{e.preventDefault();if(!otpOk){setErr('Verify OTP first');return}if(!captchaOk){setErr('Verify CAPTCHA first');return}if(!fd.authorization){setErr('Accept authorization terms');return}setLoading(true);setErr('');try{const r=await fetch('/api/applications/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fd)});if(r.ok){const d=await r.json();setAppId(d.applicationId||'');setDone(true)}else{const d=await r.json();setErr(d.message||'Submission failed')}}catch{setErr('Network error')}finally{setLoading(false)}};
  const submitLogin=async(e:React.FormEvent)=>{e.preventDefault();setLoading(true);setErr('');try{const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(ld)});if(r.ok){const d=await r.json();localStorage.setItem('token',d.token);window.location.href='/dashboard'}else setErr('Invalid email or password')}catch{setErr('Network error')}finally{setLoading(false)}};

  return(
    <div className="relative w-full overflow-hidden" style={{minHeight:'calc(100vh - 72px)'}} onMouseEnter={()=>setAuto(false)} onMouseLeave={()=>setAuto(true)}>
      {/* Slider BG */}
      {heroImages.map((img,i)=>(
        <div key={img.id} className="absolute inset-0 transition-opacity duration-700" style={{opacity:i===cur?1:0}}>
          <img src={img.url} alt={img.label} className="w-full h-full object-cover"/>
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/62 to-black/45"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"/>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10"/>

      {/* Layout */}
      <div className="relative z-20 w-full flex items-center" style={{minHeight:'inherit'}}>
        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-6">

          {/* LEFT text */}
          <div className="flex-1 lg:pr-8 transition-opacity duration-400" style={{opacity:fade?1:0}}>
            <span className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[.18em]" style={{background:'rgba(220,38,38,.75)',color:'#fff',backdropFilter:'blur(6px)'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"/>{heroImages[cur].label}
            </span>
            <h1 className="text-white font-black leading-[1.08] mb-5" style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.1rem,4vw,3.4rem)'}}>
              Welcome to<br/><span style={{color:'#FCD34D'}}>Koshys Group</span><br/>of Institutions <span className="text-red-400">(KGI)</span>
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-sm leading-relaxed mb-8">
              Empowering students with quality education across management, health sciences, hotel management, and school programs.
            </p>
            <div className="flex gap-6 flex-wrap">
              {[['5+','Institutions'],['30+','Programs'],['10K+','Students']].map(([v,l])=>(
                <div key={l} style={{borderLeft:'2px solid rgba(252,211,77,.5)',paddingLeft:12}}>
                  <div className="text-yellow-300 font-black text-2xl" style={{fontFamily:"'Playfair Display',serif"}}>{v}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT form card */}
          <div className="w-full lg:w-auto lg:flex-shrink-0" style={{maxWidth:400,width:'100%'}}>
            <div className="rounded-2xl overflow-hidden" style={{background:'rgba(8,8,8,.72)',backdropFilter:'blur(22px)',border:'1px solid rgba(255,255,255,.12)',boxShadow:'0 28px 64px rgba(0,0,0,.55)'}}>
              <div className="px-5 pt-5 pb-4" style={{borderBottom:'1px solid rgba(255,255,255,.08)'}}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">Admissions Open 2025–26</span>
                <h2 className="text-white font-black text-lg mt-0.5 leading-tight" style={{fontFamily:"'Playfair Display',serif"}}>Begin Your Journey at KGI</h2>
              </div>
              <div className="flex px-5 pt-3 gap-1">
                {(['register','login'] as const).map(t=>(
                  <button key={t} onClick={()=>{setTab(t);setErr('')}} className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wide rounded-full transition-all duration-200" style={tab===t?{background:'#B91C1C',color:'#fff'}:{color:'rgba(255,255,255,.45)'}}>
                    {t==='register'?'New Student':'Existing Login'}
                  </button>
                ))}
              </div>
              <div className="px-5 py-4 overflow-y-auto" style={{maxHeight:'72vh'}}>
                {err&&(<div className="mb-3 flex items-start gap-2 p-2.5 rounded-lg" style={{background:'rgba(239,68,68,.15)',border:'1px solid rgba(239,68,68,.3)'}}><AlertCircle size={12} className="text-red-400 mt-0.5 shrink-0"/><p className="text-[11px] text-red-300">{err}</p></div>)}

                {done?(
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{background:'rgba(34,197,94,.15)'}}><CheckCircle size={28} className="text-green-400"/></div>
                    <h3 className="text-white font-black text-base mb-1" style={{fontFamily:"'Playfair Display',serif"}}>Application Submitted!</h3>
                    {appId&&(<div className="inline-block my-2 px-4 py-2 rounded-xl" style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.12)'}}><p className="text-[10px] text-white/50 mb-1">Application ID</p><p className="text-yellow-300 font-black tracking-widest text-sm">{appId}</p></div>)}
                    <p className="text-[11px] text-white/50 mb-5">Save your ID to track application status.</p>
                    <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition hover:opacity-90" style={{background:'linear-gradient(135deg,#B91C1C,#7F1D1D)'}}>Return Home <ArrowRight size={13}/></a>
                  </div>
                ):tab==='register'?(
                  <form onSubmit={submitReg} className="space-y-3">
                    <div><label className={L}>Applicant Name (as per 10th marks card) *</label><input value={fd.name} onChange={e=>sf('name',e.target.value)} type="text" placeholder="Full name" required className={I}/></div>
                    <div>
                      <label className={L}><Phone size={9} className="inline mr-1"/>Mobile Number *</label>
                      <div className="flex gap-2">
                        <select value={fd.countryCode} onChange={e=>sf('countryCode',e.target.value)} className="w-24 px-2 py-2 text-xs rounded-lg border border-white/20 bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/40">
                          {['+91','+1','+44','+61','+65','+971'].map(c=><option key={c} value={c} style={{color:'#000'}}>{c}</option>)}
                        </select>
                        <input value={fd.mobile} onChange={e=>sf('mobile',e.target.value)} type="tel" maxLength={10} placeholder="10-digit number" pattern="[0-9]{10}" required className={I}/>
                      </div>
                    </div>
                    <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)'}}>
                      {otpOk?(<div className="flex items-center gap-2 text-green-400"><CheckCircle size={14}/><span className="text-[11px] font-bold">Mobile verified</span></div>):(
                        <><button type="button" onClick={sendOTP} disabled={otpSent||loading} className="w-full py-2 rounded-lg text-[11px] font-black uppercase tracking-wide text-white flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-50" style={{background:'linear-gradient(135deg,#B91C1C,#7F1D1D)'}}>{loading&&!otpSent&&<Loader size={12} className="animate-spin"/>}{otpSent?'Resend OTP':'Get OTP'}</button>
                        {otpSent&&(<div className="mt-2 space-y-2"><input value={fd.otp} onChange={e=>sf('otp',e.target.value)} type="text" maxLength={6} placeholder="6-digit OTP" className={I+" text-center tracking-[.5em] font-bold"}/><button type="button" onClick={verifyOTP} disabled={loading} className="w-full py-2 rounded-lg text-[11px] font-black uppercase tracking-wide text-white flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50" style={{background:'#15803d'}}>{loading&&<Loader size={11} className="animate-spin"/>} Verify OTP</button></div>)}</>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className={L}>Nationality *</label><select value={fd.nationality} onChange={e=>sf('nationality',e.target.value)} required className={S}><option value="">Select</option>{COUNTRIES.map(c=><option key={c} value={c} style={{color:'#000'}}>{c}</option>)}</select></div>
                      <div><label className={L}>Academic Session *</label><select value={fd.academicSession} onChange={e=>sf('academicSession',e.target.value)} required className={S}><option value="">Select</option>{ACADEMIC_SESSIONS.map(s=><option key={s} value={s} style={{color:'#000'}}>{s}</option>)}</select></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><label className={L}>State *</label><select value={fd.state} onChange={e=>{const s=e.target.value;sf('state',s);sf('city','');setCities2(CITIES_BY_STATE[s]||[])}} required className={S}><option value="">Select</option>{INDIAN_STATES.map(s=><option key={s} value={s} style={{color:'#000'}}>{s}</option>)}</select></div>
                      <div><label className={L}>City *</label><select value={fd.city} onChange={e=>sf('city',e.target.value)} disabled={!fd.state} required className={S+(!fd.state?' opacity-40':'')}><option value="">Select</option>{cities2.map(c=><option key={c} value={c} style={{color:'#000'}}>{c}</option>)}</select></div>
                    </div>
                    <div><label className={L}>Program Level *</label><select value={fd.programLevel} onChange={e=>{const l=e.target.value;sf('programLevel',l);sf('program','');sf('specialization','');setProgs(PROGRAMS_BY_LEVEL[l]||[]);setSpecs([])}} required className={S}><option value="">Select level</option>{PROGRAM_LEVELS.map(l=><option key={l} value={l} style={{color:'#000'}}>{l}</option>)}</select></div>
                    {fd.programLevel&&(<div className="grid grid-cols-2 gap-2">
                      <div><label className={L}>Program *</label><select value={fd.program} onChange={e=>{const p=e.target.value;sf('program',p);sf('specialization','');setSpecs(SPECIALIZATIONS[p]||[])}} required className={S}><option value="">Select</option>{progs.map(p=><option key={p} value={p} style={{color:'#000'}}>{p}</option>)}</select></div>
                      <div><label className={L}>Specialization</label><select value={fd.specialization} onChange={e=>sf('specialization',e.target.value)} disabled={!fd.program||specs.length===0} className={S+(!fd.program||specs.length===0?' opacity-40':'')}><option value="">Select</option>{specs.map(s=><option key={s} value={s} style={{color:'#000'}}>{s}</option>)}</select></div>
                    </div>)}
                    <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)'}}>
                      <label className={L}>Security Verification *</label>
                      {captchaOk?(<div className="flex items-center gap-2 text-green-400 mt-1"><CheckCircle size={13}/><span className="text-[11px] font-bold">CAPTCHA verified</span></div>):(
                        <><div className="flex items-center justify-between mb-2 px-3 py-2 rounded-lg" style={{background:'rgba(0,0,0,.3)',border:'1px solid rgba(255,255,255,.1)'}}><span className="text-[10px] text-white/50">Solve:</span><span className="font-mono text-base font-black text-yellow-300">{captcha.code}</span><button type="button" onClick={genCaptcha} className="text-white/40 hover:text-white/70"><RefreshCw size={12}/></button></div><div className="flex gap-2"><input value={fd.captchaAnswer} onChange={e=>sf('captchaAnswer',e.target.value)} placeholder="Answer" className={I}/><button type="button" onClick={verifyCaptcha} disabled={loading} className="px-3 py-2 rounded-lg text-[11px] font-black text-white hover:opacity-90 disabled:opacity-50 flex items-center gap-1 whitespace-nowrap" style={{background:'#B91C1C'}}>{loading?<Loader size={11} className="animate-spin"/>:null}Verify</button></div></>
                      )}
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-xl" style={{background:'rgba(59,130,246,.1)',border:'1px solid rgba(59,130,246,.2)'}}>
                      <input type="checkbox" id="auth" checked={fd.authorization} onChange={e=>sf('authorization',e.target.checked)} required className="mt-0.5 w-3 h-3 accent-red-600 cursor-pointer shrink-0"/>
                      <label htmlFor="auth" className="text-[10px] text-white/60 leading-relaxed cursor-pointer">I authorize KGI and its representatives to contact me via email, SMS, WhatsApp and call. This overrides DND/NDNC. *</label>
                    </div>
                    <button type="submit" disabled={loading||!otpOk||!captchaOk} className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wide text-white flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-40" style={{background:'linear-gradient(135deg,#B91C1C,#7F1D1D)'}}>
                      {loading?<Loader size={14} className="animate-spin"/>:<ArrowRight size={14}/>}{loading?'Submitting...':'Submit Application'}
                    </button>
                    <p className="text-center text-[10px] text-white/30">By registering you agree to our <a href="#" className="text-yellow-400/60 hover:text-yellow-400">Terms</a> &amp; <a href="#" className="text-yellow-400/60 hover:text-yellow-400">Privacy Policy</a></p>
                  </form>
                ):(
                  <form onSubmit={submitLogin} className="space-y-3 mt-1">
                    <div><label className={L}>Email Address *</label><input value={ld.email} onChange={e=>setLd(p=>({...p,email:e.target.value}))} type="email" placeholder="your@email.com" required className={I}/></div>
                    <div><label className={L}>Password *</label>
                      <div className="relative"><input value={ld.password} onChange={e=>setLd(p=>({...p,password:e.target.value}))} type={showPwd?'text':'password'} placeholder="Enter password" required className={I+' pr-9'}/><button type="button" onClick={()=>setShowPwd(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">{showPwd?<EyeOff size={13}/>:<Eye size={13}/>}</button></div>
                      <a href="#" className="block text-right text-[10px] text-yellow-400/70 hover:text-yellow-400 mt-1">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wide text-white flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-40" style={{background:'linear-gradient(135deg,#B91C1C,#7F1D1D)'}}>{loading&&<Loader size={14} className="animate-spin"/>}{loading?'Signing in...':'Sign In'}</button>
                    <p className="text-center text-[11px] text-white/40">New student? <button type="button" onClick={()=>setTab('register')} className="text-yellow-400 font-bold hover:underline">Register here</button></p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <button onClick={()=>{go((cur-1+heroImages.length)%heroImages.length);setAuto(false)}} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition hover:scale-110" style={{background:'rgba(255,255,255,.12)',backdropFilter:'blur(6px)',border:'1px solid rgba(255,255,255,.18)'}} aria-label="Previous"><ChevronLeft size={20} className="text-white"/></button>
      <button onClick={()=>{go((cur+1)%heroImages.length);setAuto(false)}} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full transition hover:scale-110" style={{background:'rgba(255,255,255,.12)',backdropFilter:'blur(6px)',border:'1px solid rgba(255,255,255,.18)'}} aria-label="Next"><ChevronRight size={20} className="text-white"/></button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {heroImages.map((_,i)=><button key={i} onClick={()=>{go(i);setAuto(false)}} className="rounded-full transition-all duration-300" style={{width:i===cur?28:8,height:8,background:i===cur?'#FCD34D':'rgba(255,255,255,.4)'}} aria-label={`Slide ${i+1}`}/>)}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30"><div className="h-full bg-yellow-400 transition-all duration-300" style={{width:`${((cur+1)/heroImages.length)*100}%`}}/></div>
    </div>
  );
}
