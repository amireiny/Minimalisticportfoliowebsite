import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StandardGalleryProps {
  images: string[];
  projectTitle: string;
}

export function StandardGallery({ images, projectTitle }: StandardGalleryProps) {
  return (
    <div className="">
      {images.map((image, index) => (
        <div key={index} className="w-full bg-neutral-100 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={`${projectTitle} - Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
