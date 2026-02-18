import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { RecruitingPartners } from "@/components/RecruitingPartners";
import { KgiVideoSlider } from "@/components/VideoSlider";
import { ArrowRight } from "lucide-react";

// Assets - Optimized Imports
import kimsLogo from "../../public/kimsb.png"; 
import kihsLogo from "../../public/kihs-card.png";
import kihmLogo from "../../public/kihm_crd.jpg";

const institutions = [
  {
    href: "https://kimsbengaluru.edu.in/",
    image: kimsLogo,
    name: "Management Studies",
    abbr: "KIMS",
    desc: "World-class business education in BBA, MBA and more with global exposure.",
    color: "#B91C1C",
  },
  {
    href: "https://www.kgi.edu.in/KIHS/index.php",
    image: kihsLogo, 
    name: "Health Sciences",
    abbr: "KIHS",
    desc: "Nursing and allied health science programs for tomorrow's healthcare leaders.",
    color: "#991B1B",
  },
  {
    href: "https://kihm.kgi.edu.in/",
    image: kihmLogo, 
    name: "Hotel Management",
    abbr: "KIHM",
    desc: "Excellence in hospitality training and high-end hotel management education.",
    color: "#7F1D1D",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0 font-sans">
      <Navbar />
      
      {/* 1. Hero Section */}
      <section style={{ minHeight: "calc(100vh - 80px)" }}>
        <Hero />
      </section>

      {/* 2. Value Proposition (USP Section) */}
      <Features />

      {/* 3. Emotional Engagement (KGI Video Slider) */}
      <KgiVideoSlider />

      {/* 4. Institutions Section - Improved Image Fitting */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-kgi-red bg-red-50 px-3 py-1 rounded-full">
              Our Campuses
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
              Institutions Under <span className="text-kgi-red">KGI</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"> 
            {institutions.map((inst) => (
              <a key={inst.abbr} href={inst.href}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col">
                
                {/* Branding Image Box */}
                <div className="h-56 flex items-center justify-center relative overflow-hidden p-8"
                  style={{ background: `linear-gradient(135deg, ${inst.color}, #2a0505)` }}>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-black/10 blur-xl" />
                  
                  {/* Logo Container - Uses object-contain to prevent cropping */}
                  <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center p-5 transition-transform duration-500 group-hover:scale-105">
                    <img 
                      src={inst.image} 
                      alt={inst.name} 
                      className="max-w-full max-h-full object-contain" 
                      loading="lazy" 
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-8 flex-grow flex flex-col">
                  <span className="text-xs font-bold text-kgi-red uppercase tracking-widest">{inst.abbr}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{inst.name}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                    {inst.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-kgi-red group-hover:translate-x-2 transition-transform mt-auto">
                    Explore Campus <ArrowRight size={18} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Social Proof (Recruiting Partners Marquee) */}
      <RecruitingPartners />

      <Footer />
      <MobileFooter />
    </div>
  );
}
