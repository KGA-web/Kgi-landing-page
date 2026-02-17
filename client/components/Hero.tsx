import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  {
    id: 1,
    title: "Excellence in Education",
    description: "Empowering students for a better future",
    imageUrl:
      "https://images.unsplash.com/photo-1427504494785-cdec12f11b07?w=1200&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Global Learning Experience",
    description: "International partnerships and opportunities",
    imageUrl:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Modern Campus Facilities",
    description: "State-of-the-art infrastructure",
    imageUrl:
      "https://images.unsplash.com/photo-1541339907198-943c28ab91c2?w=1200&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Research & Innovation",
    description: "Dedicated research centers for experiential learning",
    imageUrl:
      "https://images.unsplash.com/photo-1533519227268-461353132943?w=1200&h=400&fit=crop",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-96 bg-gray-900 overflow-hidden group">
      {/* Carousel Container */}
      <div className="relative h-full">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-4 text-center">
                {image.title}
              </h2>
              <p className="text-xl text-center max-w-2xl">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white bg-opacity-50 w-2 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
