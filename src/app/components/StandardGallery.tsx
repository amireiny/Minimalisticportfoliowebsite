import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

interface StandardGalleryProps {
  images: string[];
  projectTitle: string;
}

export function StandardGallery({ images, projectTitle }: StandardGalleryProps) {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Check if any images are GIFs
  const hasGifs = images.some(img => img.toLowerCase().endsWith('.gif'));

  useEffect(() => {
    if (!hasGifs) {
      setAllImagesLoaded(true);
      return;
    }

    // Preload all images
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedCount(prev => prev + 1);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setAllImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
        setAllImagesLoaded(true); // Show images anyway
      });
  }, [images, hasGifs]);

  return (
    <div className="">
      {images.map((image, index) => (
        <div key={index} className="w-full bg-neutral-100 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={`${projectTitle} - Image ${index + 1}`}
            className="w-full h-full object-cover"
            style={{
              opacity: hasGifs && !allImagesLoaded ? 0 : 1,
              transition: hasGifs ? 'opacity 0.3s ease-in-out' : 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
}
