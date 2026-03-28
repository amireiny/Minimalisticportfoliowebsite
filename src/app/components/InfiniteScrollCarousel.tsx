import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface InfiniteScrollCarouselProps {
  images: string[];
  projectTitle: string;
  categoryName: string;
  isFullyOpen?: boolean;
}

export function InfiniteScrollCarousel({
  images,
  projectTitle,
  categoryName,
  isFullyOpen = true,
}: InfiniteScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<
    string | null
  >(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Auto-scroll animation - only start when fully open
  useEffect(() => {
    if (!isFullyOpen) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && !selectedImage) {
        scrollPosition += scrollSpeed;

        // Reset when we've scrolled past half (for seamless loop with duplicated images)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }

        if (scrollContainer) {
          scrollContainer.scrollLeft = scrollPosition;
        }
      } else {
        scrollPosition = scrollContainer.scrollLeft;
      }

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, selectedImage, isFullyOpen]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const items = container.querySelectorAll(".carousel-item");
    const targetItem = items[index] as HTMLElement;

    if (targetItem) {
      const containerWidth = container.offsetWidth;
      const itemLeft = targetItem.offsetLeft;
      const itemWidth = targetItem.offsetWidth;
      const scrollTo =
        itemLeft - containerWidth / 2 + itemWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setSelectedImage(null);
      setIsZoomed(false);
    }, 300); // Wait for fade-out animation to complete
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      handleCloseModal();
    }
  };

  const handleModalPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return; // Prevent rapid clicking

    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex =
        selectedIndex === 0
          ? images.length - 1
          : selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
      setIsZoomed(false); // Reset zoom when changing images
      setIsTransitioning(false);
    }, 300); // Match transition duration
  };

  const handleModalNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning) return; // Prevent rapid clicking

    setIsTransitioning(true);
    setTimeout(() => {
      const newIndex =
        selectedIndex === images.length - 1
          ? 0
          : selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
      setIsZoomed(false); // Reset zoom when changing images
      setIsTransitioning(false);
    }, 300); // Match transition duration
  };

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <div
        className="w-full relative group/carousel mb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden mb-6"
          style={{
            scrollBehavior: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={(e) => {
            const currentRef = scrollRef.current;
            if (!currentRef) return;
            setIsDragging(true);
            setStartX(e.pageX - currentRef.offsetLeft);
            setScrollLeft(currentRef.scrollLeft);
          }}
          onMouseLeave={() => {
            setIsDragging(false);
          }}
          onMouseUp={() => {
            setIsDragging(false);
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            const currentRef = scrollRef.current;
            if (!currentRef) return;
            e.preventDefault();
            const x = e.pageX - currentRef.offsetLeft;
            const walk = (x - startX) * 0.8; // Reduced sensitivity for smoother scrolling
            currentRef.scrollLeft = scrollLeft - walk;
            setHasDragged(true);
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="carousel-item flex-shrink-0 relative cursor-pointer"
              style={{ height: "500px" }}
              onClick={() => {
                if (!hasDragged) {
                  setSelectedImage(image);
                  setSelectedIndex(index % images.length);
                  // Delay to allow modal to mount before fading in
                  requestAnimationFrame(() => {
                    setTimeout(() => setIsModalVisible(true), 10);
                  });
                }
                setHasDragged(false);
              }}
            >
              <ImageWithFallback
                src={image}
                alt={`${projectTitle} - ${categoryName} - Image ${(index % images.length) + 1}`}
                className="h-full w-auto object-contain rounded-lg transition-all duration-300 hover:brightness-75"
                draggable={false}
                style={{ userSelect: 'none' }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Bottom right */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={handlePrevious}
            className="transition-opacity duration-300"
            aria-label="Previous image"
          >
            <div className="bg-white/90 hover:bg-white px-6 py-4 transition-colors border border-neutral-200">
              <ChevronLeft
                size={20}
                className="text-neutral-900"
              />
            </div>
          </button>

          <button
            onClick={handleNext}
            className="transition-opacity duration-300"
            aria-label="Next image"
          >
            <div className="bg-white/90 hover:bg-white px-6 py-4 transition-colors border border-neutral-200">
              <ChevronRight
                size={20}
                className="text-neutral-900"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.96)",
          }}
          onClick={handleModalClick}
        >
          <button
            className="absolute top-4 right-4 text-black hover:opacity-60 transition-opacity z-10"
            onClick={handleCloseModal}
          >
            <X size={32} />
          </button>

          {!isZoomed ? (
            <div
              className={`cursor-zoom-in transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              onClick={handleImageClick}
            >
              <ImageWithFallback
                src={selectedImage}
                alt={`${projectTitle} - ${categoryName} - Full view`}
                className="object-contain"
                style={{
                  maxWidth: "85vw",
                  maxHeight: "85vh",
                }}
              />
            </div>
          ) : (
            <div
              className={`overflow-auto w-full h-full transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div
                className="cursor-zoom-out min-h-full min-w-full flex items-start justify-center"
                style={{
                  paddingTop: "20vh",
                  paddingBottom: "20vh",
                  paddingLeft: "20vw",
                  paddingRight: "20vw",
                }}
                onClick={handleImageClick}
              >
                <ImageWithFallback
                  src={selectedImage}
                  alt={`${projectTitle} - ${categoryName} - Full view`}
                  className="object-contain block"
                  style={{
                    transform: "scale(1.0)",
                    transformOrigin: "center top",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          )}

          {/* Modal Navigation Arrows */}
          <button
            onClick={handleModalPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Previous image"
          >
            <div className="bg-white/90 hover:bg-white px-4 py-8 transition-colors">
              <ChevronLeft
                size={24}
                className="text-neutral-900"
              />
            </div>
          </button>

          <button
            onClick={handleModalNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-100 transition-opacity duration-300 z-10"
            aria-label="Next image"
          >
            <div className="bg-white/90 hover:bg-white px-4 py-8 transition-colors">
              <ChevronRight
                size={24}
                className="text-neutral-900"
              />
            </div>
          </button>
        </div>
      )}
    </>
  );
}