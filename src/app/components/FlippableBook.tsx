import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FlippableBookProps {
  pageCount: number;
  width: number;
  height: number;
  pageImages?: string[];
}

// Page component with forwardRef for react-pageflip
const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; number: number; isFirstPage?: boolean; isLastPage?: boolean }
>((props, ref) => {
  // Determine if page is on left or right side
  // Odd page numbers (1, 3, 5...) are right pages - shadow on left edge
  // Even page numbers (2, 4, 6...) are left pages - shadow on right edge
  const isLeftPage = props.number % 2 === 0;
  const showCenterShadow = !props.isFirstPage && !props.isLastPage;

  return (
    <div
      ref={ref}
      className="bg-white flex items-center justify-center"
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Magazine spine shadow on first page */}
      {props.isFirstPage && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '20px',
            background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.15), rgba(0,0,0,0.05), transparent)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      )}
      {/* Center shading for depth - on right edge for left pages, left edge for right pages */}
      {showCenterShadow && (
        <div
          style={{
            position: 'absolute',
            [isLeftPage ? 'right' : 'left']: 0,
            top: 0,
            bottom: 0,
            width: '40px',
            background: isLeftPage 
              ? 'linear-gradient(to left, rgba(0,0,0,0.15), rgba(0,0,0,0.08), transparent)'
              : 'linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.08), transparent)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}
      <div className="w-full h-full flex flex-col items-center justify-center">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

export function FlippableBook({
  pageCount,
  width,
  height,
  pageImages = [],
}: FlippableBookProps) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Calculate responsive dimensions while maintaining aspect ratio
  const aspectRatio = width / height;
  const maxWidth = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.92, 2600) : 2600;
  const responsiveWidth = maxWidth / 2; // Divide by 2 because book shows 2 pages
  const responsiveHeight = responsiveWidth / aspectRatio;

  // Mobile-specific sizing
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const mobileWidth = isMobile ? window.innerWidth * 0.42 : responsiveWidth;
  const mobileHeight = isMobile ? mobileWidth / aspectRatio : responsiveHeight;
  const finalWidth = isMobile ? mobileWidth : responsiveWidth;
  const finalHeight = isMobile ? mobileHeight : responsiveHeight;

  // Determine if we're on a single page (cover or last page)
  const isSinglePage = currentPage === 0 || currentPage >= pageCount - 1;

  // Mobile closed state
  if (isMobile && !isOpen) {
    const closedWidth = Math.min(window.innerWidth * 0.7, 400);
    const closedHeight = closedWidth / aspectRatio;

    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div
          onClick={toggleOpen}
          className="cursor-pointer"
          style={{
            width: closedWidth,
            height: closedHeight,
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))',
          }}
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
            {pageImages[0] ? (
              <img
                src={pageImages[0]}
                alt="Catalog Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <p className="text-sm">Cover</p>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-neutral-400 text-center">
          Tap to open catalog
        </p>
      </div>
    );
  }

  // Mobile open state with rotation
  if (isMobile && isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <button
          onClick={toggleOpen}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white hover:bg-neutral-100 transition-colors shadow-lg"
          aria-label="Close catalog"
        >
          <X size={24} />
        </button>
        
        <div
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'center center',
            width: '100vh',
            height: '100vw',
          }}
        >
          <div className="flex flex-col items-center gap-6 py-8">
            <div 
              className="flex justify-center w-full"
              style={{ position: 'relative' }}
            >
              <div
                style={{ 
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))',
                  overflow: 'visible',
                  position: 'relative',
                  transform: isSinglePage 
                    ? currentPage === 0 
                      ? 'translateX(-25%)'
                      : 'translateX(25%)'
                    : 'translateX(0)',
                  transition: 'transform 0.3s ease-in-out'
                }}
              >
                <HTMLFlipBook
                  ref={bookRef}
                  width={finalWidth}
                  height={finalHeight}
                  size="stretch"
                  minWidth={400}
                  maxWidth={3000}
                  minHeight={500}
                  maxHeight={3000}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={true}
                  onFlip={onFlip}
                  className=""
                  style={{}}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={800}
                  usePortrait={false}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {Array.from({ length: pageCount }, (_, index) => (
                    <Page key={index} number={index + 1} isFirstPage={index === 0} isLastPage={index === pageCount - 1}>
                      {pageImages[index] ? (
                        <img
                          src={pageImages[index]}
                          alt={`Page ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-neutral-300 text-center">
                          <p className="text-sm">Page {index + 1}</p>
                          <p className="text-xs mt-2">
                            {width} × {height}
                          </p>
                        </div>
                      )}
                    </Page>
                  ))}
                </HTMLFlipBook>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-sm text-neutral-600 min-w-[100px] text-center">
                Page {currentPage + 1} / {pageCount}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage >= pageCount - 2}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <p className="text-xs text-neutral-400 text-center">
              Click or drag to flip pages
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop view (unchanged)
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div 
        className="flex justify-center w-full"
        style={{ position: 'relative' }}
      >
        <div
          style={{ 
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))',
            overflow: 'visible',
            position: 'relative',
            // Center single pages by offsetting the book's natural positioning
            transform: isSinglePage 
              ? currentPage === 0 
                ? 'translateX(-25%)' // First page is naturally right-aligned, shift left
                : 'translateX(25%)'   // Last page is naturally left-aligned, shift right
              : 'translateX(0)',
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={finalWidth}
            height={finalHeight}
            size="stretch"
            minWidth={400}
            maxWidth={3000}
            minHeight={500}
            maxHeight={3000}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className=""
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={800}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {Array.from({ length: pageCount }, (_, index) => (
              <Page key={index} number={index + 1} isFirstPage={index === 0} isLastPage={index === pageCount - 1}>
                {pageImages[index] ? (
                  <img
                    src={pageImages[index]}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-neutral-300 text-center">
                    <p className="text-sm">Page {index + 1}</p>
                    <p className="text-xs mt-2">
                      {width} × {height}
                    </p>
                  </div>
                )}
              </Page>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-neutral-600 min-w-[100px] text-center">
          Page {currentPage + 1} / {pageCount}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage >= pageCount - 2}
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <p className="text-xs text-neutral-400 text-center">
        Click or drag to flip pages
      </p>
    </div>
  );
}