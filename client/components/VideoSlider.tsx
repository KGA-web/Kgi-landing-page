import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  { id: "M7lc1UVf-VE", title: "Campus Experience 2026", thumb: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg" },
  { id: "dQw4w9WgXcQ", title: "Global Placements", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
  { id: "aqz-KE-bpKQ", title: "Alumni Speak", thumb: "https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg" },
];

export const KgiVideoSlider = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const handlePlay = (id: string) => {
    setActiveVideo(id);
    emblaApi?.plugins().autoplay.stop(); // Brutally kill the slider movement
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-kgi-red font-bold tracking-widest uppercase text-sm">Media Gallery</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic">
              Experience <span className="text-kgi-red">KGI</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => emblaApi?.scrollPrev()} className="p-4 rounded-lg bg-white shadow-md hover:text-kgi-red transition-all border border-slate-100"><ChevronLeft /></button>
            <button onClick={() => emblaApi?.scrollNext()} className="p-4 rounded-lg bg-kgi-red text-white shadow-lg hover:brightness-110 transition-all"><ChevronRight /></button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {VIDEOS.map((video) => (
              <div key={video.id} className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_75%] px-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl group border-b-8 border-kgi-red">
                  {activeVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Brand Centered Play Button */}
                      <button 
                        onClick={() => handlePlay(video.id)}
                        className="absolute inset-0 m-auto w-20 h-20 bg-kgi-red text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all z-10"
                      >
                        <Play fill="currentColor" size={32} className="ml-1" />
                      </button>

                      <div className="absolute bottom-8 left-8">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{video.title}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
