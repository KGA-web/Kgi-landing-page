import React from "react";

const PARTNER_LOGOS = [
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/act%20fibernet.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/aditya%20birla.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/air%20india.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/infosys.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/ibm.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/paytm.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/tata%20motors.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/tech%20mahindra.png",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/reliance.jpg",
  "https://kimsbengaluru.edu.in/assets/KIMS/RecruitingPartners/xpressbees.png",
];

export const RecruitingPartners = () => {
  return (
    <section className="w-full bg-white py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 tracking-tight">
          Our Recruiting Partners
        </h2>
      </div>

      {/* The Marquee Container */}
      <div className="relative flex overflow-x-hidden border-y border-slate-100 bg-slate-50/50 py-8">
        
        {/* Visual Polish: Gradient Fades at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* The Animated Track */}
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {/* We render the list twice to create the infinite loop effect */}
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center w-40 h-20"
            >
              <img
                src={logo}
                alt="Partner Logo"
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
