import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { RecruitingPartners } from "@/components/RecruitingPartners";
import { KgiVideoSlider } from "@/components/VideoSlider";
import { ArrowRight } from "lucide-react";

// Assets
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
  },
  {
    href: "https://www.kgi.edu.in/KIHS/index.php",
    image: kihsLogo, 
    name: "Health Sciences",
    abbr: "KIHS",
    desc: "Nursing and allied health science programs for tomorrow's healthcare leaders.",
  },
  {
    href: "https://kihm.kgi.edu.in/",
    image: kihmLogo, 
    name: "Hotel Management",
    abbr: "KIHM",
    desc: "Excellence in hospitality training and high-end hotel management education.",
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

      {/* 2. USP Section */}
      <Features />

      {/* 3. Video Engagement */}
      <KgiVideoSlider />

      {/* 4. Institutions Section - Borderless Image Fit */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-kgi-red">Our Campuses</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
              Institutions Under <span className="text-kgi-red">KGI</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"> 
            {institutions.map((inst) => (
              <a key={inst.abbr} href={inst.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col">
                
                {/* BORDERLESS IMAGE BOX */}
                <div className="h-60 w-full relative overflow-hidden bg-slate-200">
                  <img 
                    src={inst.image} 
                    alt={inst.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  {/* Subtle overlay for text contrast if needed */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Info Section */}
                <div className="p-8 flex-grow flex flex-col bg-white">
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

      {/* 5. Recruiting Partners */}
      <RecruitingPartners />

      <Footer />
      <MobileFooter />
    </div>
  );
}
