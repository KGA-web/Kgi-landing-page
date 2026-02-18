import React, { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have the standard Shadcn cn utility

const KGI_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "KGI Campus Life" },
  { id: "aqz-KE-bpKQ", title: "Annual Convocation" },
  { id: "yPYZpwSpKmA", title: "Industry Visit 2025" },
];

export const YoutubeSlider = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Embla with Autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false 
  }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Pause Autoplay when a video is being interacted with
  const toggleAutoplay = (play: boolean) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    play ? autoplay.play() : autoplay.stop();
    setIsPlaying(!play);
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 border-l-8 border-[#88171a] pl-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#88171a] uppercase">
              KGI <span className="text-[#f3af19]">In Motion</span>
            </h2>
            <p className="text-slate-600 font-medium">Watch our latest stories and achievements</p>
          </div>
          
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={scrollPrev}
              className="h-12 w-12 rounded-full border-2 border-[#88171a] flex items-center justify-center text-[#88171a] hover:bg-[#88171a] hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="h-12 w-12 rounded-full bg-[#88171a] flex items-center justify-center text-white hover:bg-[#6b1214] transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {KGI_VIDEOS.map((video) => (
              <div 
                key={video.id} 
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_70%] lg:flex-[0_0_60%] px-4 transition-opacity duration-500"
              >
                <div className="relative group aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-transparent hover:border-[#f3af19] transition-all">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&rel=0`}
                    title={video.title}
                    onMouseEnter={() => toggleAutoplay(false)}
                    onMouseLeave={() => !isPlaying && toggleAutoplay(true)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Visual Brand Tag */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <PlayCircle className="text-[#88171a]" size={20} />
                    <span className="font-bold text-[#88171a] text-sm">{video.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-10 space-x-2">
          {KGI_VIDEOS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isPlaying ? "bg-[#f3af19] w-8" : "bg-slate-200 w-4"
              )} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
