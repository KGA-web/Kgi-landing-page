import React, { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const VIDEOS = [
  { id: "FLrFpdR1DII", type: "video", title: "A New Era of Academic Excellence Begins | KIMS" }, 
  { id: "rb12SDB1ngg", type: "video", title: "Why KIHS?" }, 
];

export const KgiVideoSlider = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // alignment "center" helps smaller items look intentional
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const handlePlay = (id: string) => {
    setActiveVideo(id);
    if (emblaApi) emblaApi.plugins().autoplay.stop();
  };

  return (
    // py-12 instead of py-24 to reduce section height
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-kgi-red font-bold tracking-widest uppercase text-[10px]">Gallery</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic">
              Experience <span className="text-kgi-red">KGI</span>
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => emblaApi?.scrollPrev()} className="p-2 rounded-md bg-white shadow hover:text-kgi-red transition-all border border-slate-100"><ChevronLeft size={20}/></button>
            <button onClick={() => emblaApi?.scrollNext()} className="p-2 rounded-md bg-kgi-red text-white shadow hover:brightness-110 transition-all"><ChevronRight size={20}/></button>
          </div>
        </div>

        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex -ml-4">
            {VIDEOS.map((video) => (
              // flex-[0_0_80%] makes the cards smaller so you see the next one peaking in
              <div key={video.id} className="flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4">
                <div className={`relative mx-auto rounded-2xl overflow-hidden bg-black shadow-lg border-b-4 border-kgi-red 
                  ${video.type === 'short' ? 'max-w-[220px] aspect-[9/16]' : 'w-full aspect-video'}`}>
                  
                  {activeVideo === video.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full cursor-pointer" onClick={() => handlePlay(video.id)}>
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                        alt={video.title} 
                        className="w-full h-full object-cover opacity-80" 
                      />
                      <button className="absolute inset-0 m-auto w-12 h-12 bg-kgi-red text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                        <Play fill="currentColor" size={20} className="ml-0.5" />
                      </button>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-sm font-bold text-white uppercase truncate pr-4">{video.title}</h3>
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
