import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import { ArrowRight, BookOpen, Globe, Stethoscope, GraduationCap } from "lucide-react";

// Google Fonts import via style tag
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
  * { font-family: 'DM Sans', sans-serif; }
`;

const institutions = [
  {
    href: "https://kimsbengaluru.edu.in/",
    icon: GraduationCap,
    name: "Management Studies",
    abbr: "KIMS",
    desc: "World-class business education in BBA, MBA and more",
    color: "#B91C1C",
  },
  {
    href: "https://www.kgi.edu.in/KIHS/index.php",
    icon: Stethoscope,
    name: "Health Sciences",
    abbr: "KIHS",
    desc: "Nursing and allied health science programs for tomorrow's healthcare leaders",
    color: "#991B1B",
  },
  {
    href: "https://kihm.kgi.edu.in/",
    icon: Globe,
    name: "Hotel Management",
    abbr: "KIHM",
    desc: "Excellence in hospitality training and hotel management education",
    color: "#7F1D1D",
  },
  {
    href: "https://kgischool.edu.in/",
    icon: BookOpen,
    name: "School (CBSE)",
    abbr: "KGI School",
    desc: "Quality school education with modern pedagogy and holistic development",
    color: "#B91C1C",
  },
];

export default function Index() {
  return (
    <>
      <style>{fontStyle}</style>
      <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">

        {/* 1 ── Navbar ── */}
        <Navbar />

        {/* 2 ── Hero (full viewport) ── */}
        <section style={{ minHeight: "calc(100vh - 80px)" }}>
          <Hero />
        </section>

        {/* 3 ── Features ── */}
        <Features />

        {/* 4 ── Institutions Strip ── */}
        <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">Our Campuses</span>
              <h2 className="text-3xl font-black text-gray-900 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Institutions Under KGI
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutions.map((inst) => {
                const Icon = inst.icon;
                return (
                  <a key={inst.abbr} href={inst.href}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="h-28 flex items-center justify-center relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${inst.color}, #450a0a)` }}>
                      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/5" />
                      <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
                      <Icon size={40} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{inst.abbr}</span>
                      <h3 className="text-sm font-bold text-gray-900 mt-0.5 mb-2">{inst.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">{inst.desc}</p>
                      <span className="flex items-center gap-1 text-xs font-bold text-red-700 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5 ── CTA Banner ── */}
        <section className="py-20 px-4 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 50%, #991B1B 100%)" }}>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-300 mb-4 block">Applications Open</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Shape<br />Your Future?
            </h2>
            <p className="text-base text-red-100 mb-10 max-w-xl mx-auto">
              Join thousands of students at KGI who are building careers through quality education, global exposure, and innovation.
            </p>
            <a href="/register"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "#FCD34D", color: "#1F2937" }}>
              Apply Now <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* 6 ── Footer ── */}
        <Footer />

        {/* Fixed mobile bottom bar */}
        <MobileFooter />

      </div>
    </>
  );
}
