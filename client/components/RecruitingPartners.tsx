import React from "react";

const PARTNER_LOGOS = [
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

export const RecruitingPartners = () => {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight">
          Our Recruiting Partners
        </h2>
        <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full" />
      </div>

      {/* Marquee Container */}
      <div className="group relative flex overflow-x-hidden border-y border-slate-100 bg-slate-50/30 py-12">
        
        {/* Shadow Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* The Track */}
        <div className="animate-marquee flex items-center gap-12 md:gap-20 whitespace-nowrap">
          {/* Double map ensures no gaps during the reset phase */}
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center w-32 md:w-44 h-24 px-4"
            >
              <img
                src={logo}
                alt={`Partner ${index}`}
                className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
