import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [signatureColor, setSignatureColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#000000');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Always keep navigation visible
    setIsVisible(true);
  }, [isHomePage]);

  // Robust pixel-based background detection
  useEffect(() => {
    const detectColors = () => {
      if (!navRef.current) return;
      
      // Skip color detection on mobile when menu is open
      if (window.innerWidth < 768 && isMobileMenuOpen) {
        return;
      }

      try {
        const navRect = navRef.current.getBoundingClientRect();
        const navHeight = navRect.height;
        const navTop = navRect.top;

        // Sample signature area (left side, ~100px from left)
        const sigX = 100;
        const sigY = navTop + navHeight / 2;

        // Sample text area (right side, ~200px from right)
        const textX = window.innerWidth - 200;
        const textY = navTop + navHeight / 2;

        // Hide nav temporarily
        navRef.current.style.opacity = '0';
        navRef.current.style.pointerEvents = 'none';

        // Use a small delay to ensure rendering
        requestAnimationFrame(() => {
          // Sample signature background
          const sigElement = document.elementFromPoint(sigX, sigY);
          const sigBg = getBackgroundColor(sigElement);
          const sigLuminance = getLuminance(sigBg);
          setSignatureColor(sigLuminance < 128 ? '#ffffff' : '#000000');

          // Sample text background
          const textElement = document.elementFromPoint(textX, textY);
          const textBg = getBackgroundColor(textElement);
          const textLuminance = getLuminance(textBg);
          setTextColor(textLuminance < 128 ? '#ffffff' : '#000000');

          // Always restore nav to visible state
          if (navRef.current) {
            navRef.current.style.opacity = '1';
            navRef.current.style.pointerEvents = 'auto';
          }
        });
      } catch (error) {
        console.error('Color detection error:', error);
        // Ensure nav is visible even if error occurs
        if (navRef.current) {
          navRef.current.style.opacity = '1';
          navRef.current.style.pointerEvents = 'auto';
        }
      }
    };

    const getBackgroundColor = (element: Element | null): string => {
      if (!element) return 'rgb(255, 255, 255)';

      let el: Element | null = element;
      let bgColor = 'rgba(0, 0, 0, 0)';

      while (el && bgColor === 'rgba(0, 0, 0, 0)') {
        const style = window.getComputedStyle(el);
        bgColor = style.backgroundColor;
        
        // Check for background images
        if (style.backgroundImage && style.backgroundImage !== 'none') {
          // If there's a background image, assume it's dark
          return 'rgb(0, 0, 0)';
        }
        
        el = el.parentElement;
      }

      return bgColor === 'rgba(0, 0, 0, 0)' ? 'rgb(255, 255, 255)' : bgColor;
    };

    const getLuminance = (color: string): number => {
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 255;

      const [r, g, b] = rgb.map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    // Initial detection
    setTimeout(detectColors, 100);

    // Detect on scroll
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(detectColors, 50);
    };

    // Detect periodically
    const interval = setInterval(detectColors, 300);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', detectColors);

    return () => {
      clearTimeout(scrollTimeout);
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectColors);
    };
  }, [location, isVisible, isMobileMenuOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo(0, 0);
  };

  const signatureHoverColor = signatureColor === '#ffffff' ? '#d4d4d4' : '#8b8b8b';
  const textHoverColor = textColor === '#ffffff' ? '#d4d4d4' : '#8b8b8b';

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: isMobileMenuOpen ? "none" : "blur(40px)",
        WebkitBackdropFilter: isMobileMenuOpen ? "none" : "blur(40px)",
        backgroundColor: isMobileMenuOpen ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.1)",
        borderBottom: isMobileMenuOpen ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isMobileMenuOpen ? "none" : "0 2px 8px rgba(0, 0, 0, 0.05)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div className="px-6">
        <div className="max-w-7xl mx-auto py-6 flex items-center justify-between">
          <Link
            to="/"
            onClick={handleHomeClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              className="h-6 cursor-pointer transition-all duration-300"
              viewBox="0 0 2568.78 653.03"
            >
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M1791.43,97.96c-6.21-1.87-13.07-2.8-20.43-2.8-16.44,0-35.39,4.61-55.22,13.61-27.73,12.58-54.49,32.74-73.42,55.31-16.43,19.59-41.14,58.08-22.1,95.79,9.95,19.7,31.11,33.79,59.58,39.67,35.77,7.39,74.59.01,96.59-18.35,6.61-5.52,13.49-15.94,12.45-21.09-.13-.63-.46-2.29-4.29-3.46-4.19-1.27-24.09,3.23-35.98,5.92-10.91,2.47-21.21,4.8-27.33,5.24-22.45,1.6-59.31-5.81-62.59-32.54l-.82-6.69,6.72.53c23.37,1.85,62.36-7.74,94.83-23.32,37.85-18.17,60.91-41.05,63.26-62.79,2.27-20.96-9.98-38.64-31.23-45.04ZM1780.62,144.77c-23.69,33.84-69.21,46.56-101.39,53.18l-12.82,2.64,7.09-11c8.99-13.95,24.47-28.81,41.42-39.74,19.69-12.7,39.21-18.68,54.94-16.82.31.04.61.07.89.1,2.76.29,6.94.72,10,5.54l1.97,3.1-2.1,3.01Z"
              />
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M1577.87,142.12l-.56-.18c-35.88-11.61-69.91-7.19-98.45-1.34-41.27,8.46-79.66,27.85-111.03,56.07l-8.45,7.6-.72-11.34c-1.01-15.99-3.13-49.26-18.91-61.76-6.03-4.78-13.63-6.31-23.24-4.68-12.77,2.16-32.09,21.31-46.2,35.29-5.71,5.66-11.11,11.01-15.66,14.92-10.56,9.06-23.02,19.19-33.35,27.09-2.29,1.75-11.26,8.44-19.92,14.52-5.09,3.57-9.22,6.34-12.3,8.22-4.17,2.56-9.37,5.75-13.02,1.74l-1.29-1.42-.13-1.92c-.62-9.44,1.46-21.01,3.67-33.26,3.94-21.86,8.41-46.63-3.87-58.19-18.42-17.34-40.9.34-66.25,23.4-4.92,4.48-9.57,8.7-13.74,11.96-1.4,1.09-3.11,2.44-5.07,3.98-37.17,29.25-73.56,56.62-87.94,58.77-2.95.44-10.24,1.1-14.18-2.3-1.71-1.47-2.65-3.51-2.65-5.73v-44c0-4.09-4.8-22.32-7.22-28.32-12.92-32.02-39.85-38.35-87.31-20.49-35.57,13.38-67.9,37.16-99.17,60.16-11.02,8.11-22.42,16.5-33.68,24.2l-8.84,6.05.24-10.71c.86-38.18-5.07-84.52-38.16-88.42-39.05-4.6-75.58,30.71-107.81,61.87-11.68,11.29-22.7,21.95-33.18,30.04-.17.13-.42.41-.7.71-1.29,1.41-4.33,4.73-10.06,3.24l-4.72-1.23.66-4.83c.26-1.88.55-3.9.85-6.04,3.26-22.77,8.71-60.87-5.73-75.74-5.03-5.18-12.26-7.15-22.11-6.04-9.59,1.09-32.71,22.4-45.13,33.85-3.88,3.57-7.22,6.66-9.88,8.95-5.02,4.32-9.89,8.84-15.04,13.63-7.41,6.88-15.08,13.99-23.15,20.41l-1.2.96c-22.73,18.08-47.53,36.96-59.2,39.84-7.32,1.8-10.72-6.88-12.55-11.55-.28-.71-.57-1.45-.74-1.82-2.86-6.07-5.5-13.23-8.29-20.81-13.68-37.17-25.75-62.69-56.62-52.6-25.19,8.23-49.97,27.17-76.21,47.21-29.52,22.55-60.05,45.87-94.39,56.33-14.77,4.5-56.83,12.57-73.9-3.92-4.7-4.54-9.5-12.98-5.65-27.39,6.12-22.91,48.72-60.46,64.79-70.76,31.43-20.15,56.76-24.19,75.28-12.02,4.72,3.1,8.15,7.46,11.48,11.68,7.11,9.03,11.03,14.01,23.42,6.51,5.38-3.26,8.19-8.18,8.57-15.06.81-14.61-10.13-33.63-20.46-41.55-11.98-9.2-26.15-13.82-42.27-13.82-4.54,0-9.23.37-14.06,1.1-52.55,7.98-108.06,56.7-130.7,88.76C-1.75,215.28-6.39,246.16,8.71,268.9c8.99,13.54,24.32,23.54,44.33,28.93,20.52,5.53,44.01,5.67,67.92.4,41.75-9.19,74.61-32.32,109.4-56.81,19.71-13.88,40.1-28.23,62.1-39.65l4.79-2.49,2.58,4.74c4.49,8.27,7.91,17.92,11.2,27.25,7.79,22.02,15.14,42.83,35.65,50.53,26.69,10.02,49.24-6.35,71.04-22.18l.96-.7c21.23-15.41,41.59-33.58,61.27-51.14,6.41-5.72,13.04-11.63,19.56-17.33l9.18-8.02-.06,12.19c-.04,8.27-1.66,17.75-3.37,27.77-4.44,26.03-9.03,52.95,11.63,64.23,6.93,3.79,10.18,4.83,17.02,4.02,20.35-2.42,54.4-37.38,81.76-65.48,13.54-13.91,26.34-27.04,36.07-34.82,11.78-9.41,24.53-17.23,36.59-24.44l.55-.33.61-.19c1.59-.5,3.33-.28,4.77.63,2.81,1.76,5.12,7.49,5.3,8.78,1.92,13.12,1.22,32.29.61,49.2-.28,7.87-.55,15.3-.55,21.59s7.34,20,13.09,24.24c16.45,12.13,34.1,2.64,52.24-9.05,13.75-8.86,28.82-20.78,44.77-33.41,32.14-25.43,65.37-51.72,96.94-60.97,1.06-.31,2.11-.65,3.14-.97,5.81-1.85,11.82-3.77,17.06-.52,3.49,2.16,5.64,6.07,6.56,11.96,1.49,9.57,1.17,19.96.83,30.95-.85,27.22-1.65,52.94,24.66,64.05,19.2,8.11,40.46,5.77,64.99-7.15,22.16-11.67,43.99-30.35,63.24-46.82,11.26-9.64,21.9-18.74,31.76-25.79l10.49-7.5-1.85,12.77c-3.62,24.96-4.67,58.09,10.87,74.21,7.77,8.06,18.93,11.19,34.13,9.54,21.92-2.36,75.2-50.64,92.71-66.51l1.19-1.08c.5-.45,2.53-2.53,4.68-4.74,25.21-25.8,29.08-28.12,33.02-27.86,1.75.12,3.33.98,4.36,2.37l.74,1,.24,1.23c1.72,8.93.09,21.66-1.63,35.13-3.21,25.08-6.85,53.5,10.49,59.14,23.82,7.74,33.1-5.86,44.86-23.09,3.35-4.91,6.82-9.99,10.75-14.65,30.11-35.67,74.82-56.23,140.71-64.7,3.96-.51,9.51-.83,15.93-1.21,19.92-1.17,61.38-3.6,65.43-17.11,2.61-8.69-3.22-12.11-18.18-16.94Z"
              />
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M2543.99,215.86c10.47-18.9,24.8-44.79,24.8-54.27,0-10.48-8.45-19.98-18.82-21.17-12.45-1.42-22.59,12.25-31.55,24.32-3.18,4.29-6.19,8.34-9.22,11.61-.59.63-58.95,63.35-91.54,67.51-11.56,1.47-18.86,1.33-22.63-13.15-4.14-15.88.63-33.61,5.23-50.76,4.74-17.67,9.23-34.35,2.83-45.28-9.43-16.1-26.92-8.26-34.01-4.14-17.29,10.05-35.88,26.41-53.87,42.23-13.66,12.02-27.79,24.45-41.24,33.98l-1.32.94c-21.89,15.61-45.75,29.92-56.73,17.7-5.63-6.26-6.83-23.72-8.01-49.64-.39-8.62-.76-16.76-1.45-21.03-3.37-21.01-12.33-35.38-25.9-41.54-16.34-7.42-39.29-3.18-62.96,11.63-20.1,12.58-38.5,29.71-56.3,46.27-7.04,6.55-14.32,13.33-21.54,19.66l-9.13,8v-53.14c0-6.1-10.98-15.75-18.64-16.39-7.44-.62-12.89.68-16.64,3.96-7.56,6.61-8.31,21.58-8.98,34.78-.29,5.69-.56,11.07-1.31,15.96-1.06,6.88-3.69,15.56-6.73,25.62-7.48,24.71-17.72,58.56-2.96,69.77,23.58,17.91,55.5-15.44,70.85-31.46,3.58-3.74,7.3-8.41,10.9-12.92,3.91-4.9,7.95-9.97,12.05-14.19,13.94-14.34,26.64-26.84,37.73-37.15,27.07-25.17,36.32-29.64,41.16-30.41,1.92-.44,3.93-.08,5.59,1.03,3.76,2.52,4.95,8.12,5.65,16.33l.07.79c.73,7.6.86,15.75.98,23.64.4,25.65.82,52.17,21.17,68.37,42.04,33.47,95.61-13,134.73-46.93,7.7-6.68,14.98-12.99,21.51-18.12l9.84-7.72-.95,12.47c-1.27,16.57-1.86,31.6,3.75,47.71,5.25,15.1,15.54,26.19,29.75,32.06,18.59,7.68,42.35,6.12,63.57-4.19.81-.39,3.89-2.46,6.37-4.12,3.16-2.11,6.74-4.51,9.72-6.3,2.4-1.44,5.37-3.22,8.15-3.22,1.51,0,2.96.52,4.23,1.91l2.1,2.28-.87,2.98c-5.94,20.41-12.3,41.3-18.46,61.5-23.31,76.52-47.41,155.65-57.1,234.88l-.29,2.37c-2.12,17.27-5.67,46.18-3.46,61.39,1.5,10.3,6.99,18.04,14.35,20.19,6.26,1.83,12.86-.8,18.59-7.42,10.51-12.13,15.94-54.3,19.91-85.08,1.68-13.05,3.14-24.33,4.77-32.48,11.18-55.77,41-194.79,76.37-280.95,3.08-7.49,9.31-18.75,15.91-30.67Z"
              />
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M1928.21,126.91c-1.46-9.35-5.84-10.49-8.7-10.49-.55,0-1.04.04-1.44.08-15.15,1.29-34.92,33.21-47.8,64.26-15.7,37.87-22.57,67.48-20.42,88.01,1.56,14.92,7.49,24.86,15.85,26.58,8.52,1.76,18.36-5.29,25.69-18.39,6.68-11.92,8.04-24.38,9.47-37.56.7-6.46,1.43-13.14,2.81-19.97,2.14-10.6,6.58-22.53,11.28-35.17,7.69-20.68,15.64-42.06,13.26-57.35Z"
              />
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M1885.86,47.57c3.32,5.25,8.07,8.28,14.52,9.26,1.56.24,3.19.35,4.87.35,23.63,0,57.5-22.26,71.14-33.93,10.59-9.05,13.14-15.04,12.12-17.42-1.19-2.77-8.5-5.82-21.57-5.82-3.21,0-6.77.18-10.67.6-14.39,1.55-57.36,9.77-63.97,14.46-9.4,6.66-12.59,22.77-6.44,32.51Z"
              />
              <path
                fill={isMobileMenuOpen ? '#000000' : (isHovered ? signatureHoverColor : signatureColor)}
                className="transition-all duration-300"
                d="M1138.85,22.74c-2.32,5.22-1.54,11.2,2.32,17.75,6.13,10.42,20.44,11.59,31.36,10.74,28.99-2.26,65.26-21.59,71.87-38.3.98-2.47,2.37-6.95.72-9.18-2.12-2.87-8.64-3.56-14.76-3.56-4.02,0-7.88.3-10.2.48-16.62,1.29-44.08,4.63-59.46,7.77-10.67,2.18-18.83,7.53-21.84,14.3Z"
              />
            </svg>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 text-sm">
            <a
              href="#work"
              className="transition-colors"
              style={{ color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = textHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              Work
            </a>
            <a
              href="#contact"
              className="transition-colors"
              style={{ color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = textHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              Contact
            </a>
            <a
              href="#about"
              className="transition-colors"
              style={{ color: textColor }}
              onMouseEnter={(e) => e.currentTarget.style.color = textHoverColor}
              onMouseLeave={(e) => e.currentTarget.style.color = textColor}
            >
              About
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // X icon
              <>
                <span
                  className="h-px w-5 absolute transition-all duration-300"
                  style={{
                    backgroundColor: '#000000',
                    transform: 'rotate(45deg)'
                  }}
                />
                <span
                  className="h-px w-5 absolute transition-all duration-300"
                  style={{
                    backgroundColor: '#000000',
                    transform: 'rotate(-45deg)'
                  }}
                />
              </>
            ) : (
              // Hamburger icon
              <>
                <span
                  className="h-px w-5 transition-all duration-300"
                  style={{ backgroundColor: textColor }}
                />
                <span
                  className="h-px w-5 transition-all duration-300"
                  style={{ backgroundColor: textColor }}
                />
                <span
                  className="h-px w-5 transition-all duration-300"
                  style={{ backgroundColor: textColor }}
                />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          top: '72px',
          backgroundColor: "rgb(255, 255, 255)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="px-6">
          <div className="max-w-7xl mx-auto flex flex-col pt-10 pb-6">
            <a
              href="#work"
              className="text-base text-neutral-900 hover:text-neutral-600 transition-colors text-center py-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Work
            </a>
            <div className="w-full h-px bg-neutral-900" style={{ opacity: 0.1 }} />
            <a
              href="#contact"
              className="text-base text-neutral-900 hover:text-neutral-600 transition-colors text-center py-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="w-full h-px bg-neutral-900" style={{ opacity: 0.1 }} />
            <a
              href="#about"
              className="text-base text-neutral-900 hover:text-neutral-600 transition-colors text-center py-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed bg-black/20"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ top: '72px', left: '0', right: '0', bottom: '0', zIndex: -1 }}
        />
      )}
    </nav>
  );
}