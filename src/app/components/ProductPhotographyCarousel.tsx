import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductPhotographyCarouselProps {
  images: string[];
  projectTitle: string;
  categoryName: string;
  isFullyOpen?: boolean;
}

export function ProductPhotographyCarousel({
  images,
  projectTitle,
  categoryName,
}: ProductPhotographyCarouselProps) {
  // Use provided images, or fallback to template images if empty
  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3NDY4Njc3N3ww&ixlib=rb-4.1.0&q=80&w=506&h=674&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1693763825095-248bf668e3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5JTIwc3R1ZGlvfGVufDF8fHx8MTc3NDY4Njc3N3ww&ixlib=rb-4.1.0&q=80&w=743&h=674&utm_source=figma&utm_medium=referral",
        ];

  return (
    <div className="w-full mb-16">
      <div className="flex flex-col gap-4">
        {/* First row - two images side by side */}
        {displayImages.length >= 2 && (
          <div className="flex gap-6 md:flex-row flex-col">
            <div className="flex-shrink-0 w-full md:w-[506px] md:h-[674px] overflow-hidden">
              <ImageWithFallback
                src={displayImages[0]}
                alt={`${projectTitle} - ${categoryName} - Image 1`}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex-shrink-0 w-full md:w-[743px] md:h-[674px] overflow-hidden">
              <ImageWithFallback
                src={displayImages[1]}
                alt={`${projectTitle} - ${categoryName} - Image 2`}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}

        {/* Remaining rows - one image per row */}
        {displayImages.slice(2).map((image, index) => (
          <div
            key={index + 2}
            className={`w-full ${index === 0 ? "md:h-[674px] overflow-hidden" : ""}`}
            style={{
              maxWidth:
                window.innerWidth >= 768 ? "1280px" : "100%",
            }}
          >
            <ImageWithFallback
              src={image}
              alt={`${projectTitle} - ${categoryName} - Image ${index + 3}`}
              className={`w-full ${index === 0 ? "h-full" : "h-auto"} object-cover`}
              style={
                index === 0
                  ? {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 15%",
                    }
                  : {
                      maxWidth: "100%",
                      height: "auto",
                      objectPosition: "center 10%",
                    }
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}