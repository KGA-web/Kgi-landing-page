import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { RecruitingPartners } from "@/components/RecruitingPartners"; // Add this
import { KgiVideoSlider } from "@/components/VideoSlider"; // Add this
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
    desc: "World-class business education in BBA, MBA and more",
    color: "#B91C1C",
  },
  {
    href: "https://www.kgi.edu.in/KIHS/index.php",
    image: kihsLogo, 
    name: "Health Sciences",
    abbr: "KIHS",
    desc: "Nursing and allied health science programs for healthcare leaders",
    color: "#991B1B",
  },
  {
    href: "https://kihm.kgi.edu.in/",
    image: kihmLogo, 
    name: "Hotel Management",
    abbr: "KIHM",
    desc: "Excellence in hospitality training and hotel management education",
    color: "#7F1D1D",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ minHeight: "calc(100vh - 80px)" }}>
        <Hero />
      </section>

      {/* Value Proposition */}
      <Features />

      {/* 1. KGI Video Slider Integration */}
      <KgiVideoSlider />

      {/* Institutions Section */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-kgi-red">Our Campuses</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">
              Institutions Under KGI
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"> 
            {institutions.map((inst) => (
              <a key={inst.abbr} href={inst.href}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                <div className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${inst.color}, #450a0a)` }}>
                  <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                  <div className="relative z-10 w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                    <img src={inst.image} alt={inst.name} className="w-full h-full object-contain p-2" loading="lazy" />
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-kgi-red uppercase tracking-wider">{inst.abbr}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{inst.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{inst.desc}</p>
                  <span className="flex items-center gap-2 text-sm font-bold text-kgi-red group-hover:translate-x-2 transition-transform">
                    Explore Campus <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Recruiting Partners Integration */}
      <RecruitingPartners />

      <Footer />
      <MobileFooter />
    </div>
  );
}
