'use client';
import { useEffect, useRef, useState } from "react";
import { Globe, Users, Microscope, Club, Heart, Users2, Activity, Leaf, Music, Lightbulb, Award } from "lucide-react";

const features = [
  { id: 1, icon: Globe, title: "Global Academic Tie-ups", description: "Student exchange programs with world-class international institutions", num: "01" },
  { id: 2, icon: Microscope, title: "Research Centers", description: "Dedicated research centres for experiential and applied learning", num: "02" },
  { id: 3, icon: Club, title: "Student Clubs", description: "Diverse student clubs spanning every passion and interest", num: "03" },
  { id: 4, icon: Heart, title: "Diversity & Inclusion", description: "Unwavering commitment to diversity, equity and inclusivity", num: "04" },
  { id: 5, icon: Activity, title: "Hospital Training", description: "1000-bed NABH-accredited hospital for hands-on clinical exposure", num: "05" },
{ id: 6, icon: Award, title: "Sports Facilities", description: "Strong emphasis on sports with indoor complexes, 400m athletic turf track and grounds for football, hockey and cricket", num: "06" },
{ id: 7, icon: Lightbulb, title: "Student Research Fund", description: "Student research supported by the KGI Student Research Fund and Atal Incubation Centre", num: "07" },
{ id: 8, icon: Leaf, title: "Sustainable Campus", description: "Eco-friendly campuses with rainwater harvesting, solar energy harnessing, and a welcoming environment for migratory birds", num: "08" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FeatureCard({ feature, index }) {
  const [cardRef, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const IconComponent = feature.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl p-7 cursor-default overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.96)',
        border: hovered ? '1.5px solid rgba(185,28,28,0.25)' : '1.5px solid #f0f0f0',
        boxShadow: hovered
          ? '0 16px 48px rgba(185,28,28,0.12), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.05)',
        transition: [
          `opacity 0.55s ease ${index * 0.06}s`,
          `transform 0.55s cubic-bezier(0.34,1.4,0.64,1) ${index * 0.06}s`,
          'border-color 0.3s ease',
          'box-shadow 0.3s ease',
        ].join(', '),
      }}
    >
      {/* Subtle red wash on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(185,28,28,0.05) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Number tag */}
      <span
        className="absolute top-5 right-5 text-xs font-bold tracking-widest select-none"
        style={{
          color: hovered ? 'rgba(185,28,28,0.4)' : 'rgba(0,0,0,0.1)',
          transition: 'color 0.3s ease',
        }}
      >
        {feature.num}
      </span>

      {/* Icon */}
      <div
        className="flex items-center justify-center mb-5"
        style={{
          width: 52, height: 52,
          borderRadius: 14,
          background: hovered ? 'rgba(185,28,28,0.1)' : 'rgba(185,28,28,0.06)',
          border: `1.5px solid ${hovered ? 'rgba(185,28,28,0.25)' : 'rgba(185,28,28,0.1)'}`,
          transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.35s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        <IconComponent size={24} strokeWidth={1.5} color="#b91c1c" />
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-2 leading-snug"
        style={{
          fontSize: 15,
          color: hovered ? '#991b1b' : '#1f2937',
          transition: 'color 0.3s ease',
        }}
      >
        {feature.title}
      </h3>

      {/* Animated underline */}
      <div
        style={{
          height: 2,
          borderRadius: 99,
          background: 'linear-gradient(90deg, #b91c1c, #ef4444)',
          width: hovered ? '40%' : '18%',
          opacity: hovered ? 0.65 : 0.25,
          marginBottom: 10,
          transition: 'width 0.35s ease, opacity 0.35s ease',
        }}
      />

      {/* Description */}
      <p className="text-gray-500 leading-relaxed" style={{ fontSize: 13 }}>
        {feature.description}
      </p>
    </div>
  );
}

export default function Features() {
  const [titleRef, titleInView] = useInView(0.2);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ top: -80, left: -80, width: 320, height: 320, background: 'radial-gradient(circle, rgba(185,28,28,0.05) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full" style={{ bottom: -80, right: -80, width: 400, height: 400, background: 'radial-gradient(circle, rgba(185,28,28,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.4,0.64,1)',
          }}
        >
          <span
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(185,28,28,0.07)', border: '1px solid rgba(185,28,28,0.18)', color: '#b91c1c' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-700" style={{ animation: 'kgi-pulse 2s infinite' }} />
            Our Strengths
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Why Choose{' '}
            <span className="relative inline-block" style={{ color: '#b91c1c' }}>
              KGI?
              <svg viewBox="0 0 120 12" className="absolute left-0 w-full" style={{ bottom: -6, height: 10 }} preserveAspectRatio="none">
                <path d="M2 8 Q30 2 60 8 Q90 14 118 8" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.35" />
              </svg>
            </span>
          </h2>

          <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Discover what sets Koshys Group of Institutions apart — from world-class faculty to vibrant campus life.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes kgi-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}
