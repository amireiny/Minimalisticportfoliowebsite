import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useSwipeNavigation() {
  const navigate = useNavigate();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Only trigger on mobile (screen width < 768px)
      if (window.innerWidth >= 768) return;

      const swipeDistance = touchEndX.current - touchStartX.current;
      const minSwipeDistance = 100; // Minimum distance for a swipe

      // Left to right swipe (swipe distance is positive)
      if (swipeDistance > minSwipeDistance) {
        navigate("/");
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);
}
