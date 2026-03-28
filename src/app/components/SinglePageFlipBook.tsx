import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SinglePageFlipBookProps {
  pageCount: number;
  width: number;
  height: number;
  pageImages?: string[];
}

// Page component with forwardRef for react-pageflip
const Page = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; number: number }
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white flex items-center justify-center"
      style={{ 
        width: "100%", 
        height: "100%", 
        position: "relative",
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

export function SinglePageFlipBook({
  pageCount,
  width,
  height,
  pageImages = [],
}: SinglePageFlipBookProps) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

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

  // Calculate responsive dimensions while maintaining aspect ratio
  const aspectRatio = width / height;
  const maxWidth = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.85, 1800) : 1800;
  const responsiveWidth = maxWidth;
  const responsiveHeight = responsiveWidth / aspectRatio;

  // Mobile-specific sizing
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const mobileWidth = isMobile ? window.innerWidth * 0.85 : responsiveWidth;
  const mobileHeight = isMobile ? mobileWidth / aspectRatio : responsiveHeight;
  const finalWidth = isMobile ? mobileWidth : responsiveWidth;
  const finalHeight = isMobile ? mobileHeight : responsiveHeight;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div 
        className="flex justify-center w-full"
        style={{ position: 'relative' }}
      >
        <div
          style={{ 
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
            overflow: 'visible',
            position: 'relative'
          }}
        >
          {/* Simulated back pages stack for depth */}
          <div
            style={{
              position: 'absolute',
              left: '-4px',
              top: '4px',
              right: '4px',
              bottom: '-4px',
              backgroundColor: 'white',
              borderRadius: '8px',
              zIndex: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '-8px',
              top: '8px',
              right: '8px',
              bottom: '-8px',
              backgroundColor: 'white',
              borderRadius: '8px',
              zIndex: -1,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <HTMLFlipBook
              ref={bookRef}
              width={finalWidth}
              height={finalHeight}
              size="stretch"
              minWidth={400}
              maxWidth={3000}
              minHeight={300}
              maxHeight={3000}
              maxShadowOpacity={0.5}
              showCover={false}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className=""
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={600}
              usePortrait={true}
              startZIndex={10}
              autoSize={true}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {Array.from({ length: pageCount }, (_, index) => (
                <Page key={index} number={index + 1}>
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
          disabled={currentPage >= pageCount - 1}
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