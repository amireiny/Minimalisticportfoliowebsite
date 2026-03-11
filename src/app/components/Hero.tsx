import { ArrowDown } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setAnimationKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section className="h-screen relative overflow-hidden bg-neutral-900">
      {/* Background Image */}
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finstitute.aljazeera.net%2Fsites%2Fdefault%2Ffiles%2Fajr%2F2025%2F2_0.jpg&f=1&nofb=1&ipt=8e6963532f80ec793fbf2656c566b070371fb69c8dd70e978f9d7e9b3a16d345"
        alt="Dark abstract background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center relative z-10">
          <h1 className="mb-4 text-white">Amir Einy</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Art Direction, Branding, Visual Identity.
          </p>
        </div>
      </div>

      {/* View Work Link - Bottom */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <a
          href="#work"
          className="flex flex-col items-center gap-2 text-white hover:text-white/70 transition-colors relative z-10 group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-[14px]">Explore Work</span>
          <div className="relative h-5 w-5 overflow-hidden">
            {isHovering ? (
              <ArrowDown
                key={animationKey}
                size={20}
                className="absolute animate-slide-down-up"
              />
            ) : (
              <ArrowDown size={20} className="absolute" />
            )}
          </div>
        </a>
      </div>
    </section>
  );
}