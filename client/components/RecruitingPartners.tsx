import React from "react";

const ALL_LOGOS = [
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/act%20fibernet.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/aditya%20birla.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/air%20india.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/allecis.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/ample.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/bimal.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/career%20labs.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/emudhra.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/eureka%20forbes.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/hdb.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/ibm.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/infosys.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/intellipaat.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/kotak.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/LIC.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/magic%20bus.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/mr.cooper.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/muthoot%20finance.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/paytm.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/Reliance.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/ROYAL.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/schneider.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/tata%20motors.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/tech%20mahindra.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/teleindia.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/trident.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/upgrad.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/xpressbees.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/1.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/2.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/3.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/4.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/5.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/6.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/7.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/8.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/9.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/10.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/11.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/13.png",
];

// Split logos into two sets
const row1 = ALL_LOGOS.slice(0, Math.ceil(ALL_LOGOS.length / 2));
const row2 = ALL_LOGOS.slice(Math.ceil(ALL_LOGOS.length / 2));

export const RecruitingPartners = () => {
  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">Our Network</h2>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Connecting our students with industry leaders globally.</p>
      </div>

      <div className="flex flex-col gap-8 relative">
        {/* Shadow Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="animate-marquee flex items-center gap-12 md:gap-24 whitespace-nowrap">
            {[...row1, ...row1].map((logo, i) => (
              <LogoItem key={i} src={logo} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="animate-marquee-reverse flex items-center gap-12 md:gap-24 whitespace-nowrap">
            {[...row2, ...row2].map((logo, i) => (
              <LogoItem key={i} src={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoItem = ({ src }: { src: string }) => (
  <div className="w-32 md:w-48 h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
    <img src={src} alt="Partner" className="max-w-full max-h-full object-contain" />
  </div>
);
