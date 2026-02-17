import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AdmissionGuidelines from "@/components/AdmissionGuidelines";
import Features from "@/components/Features";

import { ArrowRight, BookOpen, Users, Globe, Stethoscope, GraduationCap } from "lucide-react";

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
      <div className="min-h-screen bg-white flex flex-col">

        {/* ── Navbar ── */}
        <Navbar />

        {/* ── Hero + Form (combined, full viewport) ── */}
        <section className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 80px)" }}>

          {/* LEFT — Image Slider (60%) */}
          <div className="flex-1 lg:flex-[1.65] min-h-[420px] lg:min-h-0">
            <Hero />
          </div>

          {/* Vertical divider accent */}
          <div className="hidden lg:block w-px" style={{ background: "linear-gradient(to bottom, transparent, #E5E7EB 20%, #E5E7EB 80%, transparent)" }} />

          {/* RIGHT — Compact Admission Form (40%) */}
          <div className="flex-1 lg:flex-[1] border-t lg:border-t-0" style={{ maxWidth: "440px", minWidth: "320px" }}>
            <AdmissionPanel />
          </div>
        </section>

        {/* ── Institutions Strip ── */}
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
                      {/* Decorative circles */}
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

        {/* ── Features ── */}
        <Features />

        {/* ── Admission Guidelines ── */}
        <AdmissionGuidelines />

        {/* ── CTA Banner ── */}
        <section className="py-20 px-4 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 50%, #991B1B 100%)" }}>
          {/* Decorative rings */}
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
            <a href="/admission"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wide transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "#FCD34D", color: "#1F2937" }}>
              Apply Now <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-gray-950 text-gray-400 pt-14 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center">
                    <span className="text-white font-black text-xs">KGI</span>
                  </div>
                  <span className="text-white font-bold text-sm">Koshys Group<br /><span className="text-gray-400 font-normal text-xs">of Institutions</span></span>
                </div>
                <p className="text-xs leading-relaxed">
                  A premier educational group committed to excellence in academics, research, and holistic development.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2 text-xs">
                  {["Courses", "Admissions", "Campus Life", "Research", "Contact Us"].map(l => (
                    <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Contact</h4>
                <div className="space-y-2 text-xs">
                  <p>admissions@kgi.edu.in</p>
                  <p>+91-XXXX-XXXX-XX</p>
                  <p className="leading-relaxed">Bangalore, Karnataka<br />India – 560 XXX</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  {["Facebook", "Twitter", "LinkedIn", "Instagram", "YouTube"].map(s => (
                    <a key={s} href="#" className="text-xs hover:text-white transition-colors border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-full">{s}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>&copy; 2025 Koshys Group of Institutions (KGI). All rights reserved.</p>
              <div className="flex gap-5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
