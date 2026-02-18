import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Campus Tour" },
  { id: "aqz-KE-bpKQ", title: "Placement Highlights" },
  { id: "yPYZpwSpKmA", title: "Student Testimonials" },
];

export const VideoSlider = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Embla with Autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  // Logic to pause slider when video starts
  const handleVideoPlay = () => {
    setIsPlaying(true);
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.stop();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (autoplay) autoplay.play();
  };

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-[#88171a]">Life at KGI</h2>
            <p className="text-slate-600 mt-2">Experience our vibrant campus through stories.</p>
          </div>
          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="p-3 rounded-full border-2 border-[#88171a] text-[#88171a] hover:bg-[#88171a] hover:text-white transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="p-3 rounded-full bg-[#88171a] text-white hover:bg-[#6b1214] transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
          <div className="flex">
            {VIDEOS.map((video) => (
              <div key={video.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_60%] px-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black group">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1`}
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Branding Overlay */}
                  <div className="absolute top-4 left-4 bg-[#f3af19] text-[#88171a] px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Featured Video
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-8 gap-2">
           <div className={`h-2 w-12 rounded-full transition-all ${isPlaying ? 'bg-[#f3af19] animate-pulse' : 'bg-slate-300'}`} />
        </div>
      </div>
    </section>
  );
};
