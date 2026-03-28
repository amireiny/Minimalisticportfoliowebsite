import { useState, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CorporateGalleryProps {
  images: string[];
  projectTitle: string;
  categoryName: string;
}

export function CorporateGallery({
  images,
  projectTitle,
  categoryName,
}: CorporateGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    const swipeThreshold = 50;

    if (Math.abs(movedBy) > swipeThreshold) {
      if (movedBy < 0) {
        // Swiped left - go to next
        handleNext();
      } else {
        // Swiped right - go to previous
        handlePrevious();
      }
    }
    
    // Reset translate positions
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    const swipeThreshold = 50;

    if (Math.abs(movedBy) > swipeThreshold) {
      if (movedBy < 0) {
        // Swiped left - go to next
        handleNext();
      } else {
        // Swiped right - go to previous
        handlePrevious();
      }
    }
    
    // Reset translate positions
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentTranslate(0);
      setPrevTranslate(0);
    }
  };

  return (
    <>
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full bg-neutral-100 overflow-hidden aspect-video"
          >
            <ImageWithFallback
              src={image}
              alt={`${projectTitle} - ${categoryName} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Mobile: Single image with navigation */}
      <div className="md:hidden">
        <div
          className="relative w-full overflow-visible aspect-video mb-4 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 8}px + ${isDragging ? currentTranslate : 0}px))`,
              transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 bg-neutral-100 rounded overflow-hidden"
                style={{
                  marginRight: index < images.length - 1 ? '8px' : '0',
                }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${projectTitle} - ${categoryName} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ userSelect: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevious}
            className="transition-opacity duration-300"
            aria-label="Previous image"
          >
            <div className="bg-white/90 hover:bg-white px-6 py-4 transition-colors border border-neutral-200">
              <ChevronLeft size={20} className="text-neutral-900" />
            </div>
          </button>

          <button
            onClick={handleNext}
            className="transition-opacity duration-300"
            aria-label="Next image"
          >
            <div className="bg-white/90 hover:bg-white px-6 py-4 transition-colors border border-neutral-200">
              <ChevronRight size={20} className="text-neutral-900" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}