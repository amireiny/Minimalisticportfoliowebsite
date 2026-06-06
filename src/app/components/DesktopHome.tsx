import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PixelatedImage } from "./PixelatedImage";

const hoverImages: Record<string, string> = {
  work: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  about:
    "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780751294/pixelation-rectangle_about_nlw7wu.jpg",
  contact:
    "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "wix-web-design-festival":
    "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780681196/pixelation-rectangle_wwd_ojxruo.jpg",
  agilite:
    "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780608168/pixelation-rectangle_agilite_bv9apy.jpg",
  hawkeye:
    "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780602819/hwk-h-prj-sq_m9w7rq.jpg",
  "servizio-damore":
    "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780604198/pixelation-rectangle_sda_ffseyl.jpg",
  "logos-marks":
    "https://images.unsplash.com/photo-1773332589460-5a5d43c80f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

const wwdImages = [
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612499/homepage-project-previewwwd1_gh2ins.jpg",
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612475/homepage-project-previewwwd2_wvsihc.jpg",
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612476/homepage-project-previewwwd3_z0hxxg.jpg",
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612477/homepage-project-previewwwd4_yhn3tf.jpg",
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612475/homepage-project-previewwwd5_byjs2s.jpg",
  "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780612477/homepage-project-previewwwd6_cnzncj.jpg",
];

const projects = [
  {
    id: 5,
    slug: "wix-web-design-festival",
    title: "Wix Web Design Festival",
    category: "Branding ✢ UX/UI",
    image: wwdImages[0],
  },
  {
    id: 4,
    slug: "agilite",
    title: "Agilite (in-house)",
    category: "Art Direction ✢ Full-suite design",
    image:
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780608167/homepage-project-preview_agilite_hlrzri.jpg",
  },
  {
    id: 1,
    slug: "hawkeye",
    title: "Hawkeye®",
    category: "Branding ✢ UX/UI",
    image:
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780602416/hwk-h-prj_umv5zu.jpg",
  },
  {
    id: 2,
    slug: "servizio-damore",
    title: "Servizio d'Amore",
    category: "Visual Identity ✢ Illustration",
    image:
      "https://res.cloudinary.com/dxog5mdzp/image/upload/v1780604207/homepage-project-preview_sda_mvb9d2.jpg",
  },
];

export function DesktopHome() {
  const [cursor, setCursor] = useState<{
    x: number;
    y: number;
    label: string | null;
  }>({
    x: 0,
    y: 0,
    label: null,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [hoveredImage, setHoveredImage] = useState<
    string | null
  >(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(
    null,
  );

  const taglines = [
    "A multidisciplinary designer\nbased in TLV.",
    "Art Direction ✢ Full-Suite Design\n✢ Vibe-Coding",
  ];
  const EASTER_EGG = 'print("Hello, World!")';
  const [taglineText, setTaglineText] = useState(taglines[0]);
  const taglineIndex = useRef(0);
  const switchCount = useRef(0);
  const taglineTimeout = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    let cancelled = false;
    const TYPE_SPEED = 10;
    const DELETE_SPEED = 6;
    const PAUSE = 3800;

    const wait = (ms: number) =>
      new Promise<void>((r) => {
        taglineTimeout.current = setTimeout(r, ms);
      });

    const typeOut = async (text: string) => {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        setTaglineText(text.slice(0, i));
        await wait(TYPE_SPEED);
      }
    };

    const deleteAll = async (text: string) => {
      for (let i = text.length; i >= 0; i--) {
        if (cancelled) return;
        setTaglineText(text.slice(0, i));
        await wait(DELETE_SPEED);
      }
    };

    const run = async () => {
      while (!cancelled) {
        const current = taglines[taglineIndex.current];
        await typeOut(current);
        if (cancelled) return;
        await wait(PAUSE);
        await deleteAll(current);
        if (cancelled) return;

        switchCount.current += 1;
        taglineIndex.current =
          (taglineIndex.current + 1) % taglines.length;

        // Easter egg every 10 switches
        if (switchCount.current % 10 === 0) {
          await wait(300);
          await typeOut(EASTER_EGG);
          if (cancelled) return;
          // no pause — delete immediately
          await deleteAll(EASTER_EGG);
          if (cancelled) return;
        }

        await wait(300);
      }
    };

    run();
    return () => {
      cancelled = true;
      if (taglineTimeout.current)
        clearTimeout(taglineTimeout.current);
    };
  }, []);
  const [wwdImageIndex, setWwdImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWwdImageIndex((i) => (i + 1) % wwdImages.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const [displayedImage, setDisplayedImage] = useState<
    string | null
  >(null);
  const [imageVisible, setImageVisible] = useState(false);
  const imageTimeout = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const showImage = useCallback((src: string) => {
    if (imageTimeout.current)
      clearTimeout(imageTimeout.current);
    // Direct swap - no fade out/in, just change the src
    setDisplayedImage(src);
    setImageVisible(true);
  }, []);

  const hideImage = useCallback(() => {
    if (imageTimeout.current)
      clearTimeout(imageTimeout.current);
    setImageVisible(false);
    imageTimeout.current = setTimeout(
      () => setDisplayedImage(null),
      300,
    );
  }, []);
  const isTransitioning = useRef(false);

  const getFullTitle = (project: (typeof projects)[0]) =>
    project.slug === "wix-web-design-festival"
      ? "Wix Web Design\nFestival"
      : project.title;

  useEffect(() => {
    const full = getFullTitle(projects[currentIndex]);
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const rightPanelRef = useRef<HTMLDivElement>(null);

  const goToIndex = useCallback((nextIndex: number) => {
    if (isTransitioning.current) return;
    // Wrap around for infinite scroll
    let wrappedIndex = nextIndex;
    if (nextIndex < 0) {
      wrappedIndex = projects.length - 1;
    } else if (nextIndex >= projects.length) {
      wrappedIndex = 0;
    }
    isTransitioning.current = true;
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(wrappedIndex);
      setVisible(true);
      setTimeout(() => {
        isTransitioning.current = false;
      }, 500);
    }, 400);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) goToIndex(currentIndex + 1);
      else goToIndex(currentIndex - 1);
    };
    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () =>
      window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, goToIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor((prev) => ({
      ...prev,
      x: e.clientX,
      y: e.clientY,
    }));
  }, []);

  const handleProjectEnter = useCallback(
    (title: string, slug: string, category: string) => {
      setCursor((prev) => ({ ...prev, label: category }));
      if (hoverImages[slug]) showImage(hoverImages[slug]);
    },
    [showImage],
  );

  const handleProjectLeave = useCallback(() => {
    setCursor((prev) => ({ ...prev, label: null }));
    hideImage();
  }, [hideImage]);

  return (
    <div className="hidden md:flex h-screen w-full overflow-hidden">
      {/* Custom cursor */}
      <div
        className="fixed z-50 pointer-events-none transition-opacity duration-200"
        style={{
          left: cursor.x + 16,
          top: cursor.y + 16,
          opacity: cursor.label ? 1 : 0,
        }}
      >
        <span
          className="text-white text-[14px] font-normal px-5 py-2.5 block"
          style={{
            backdropFilter: "blur(12px) saturate(80%)",
            WebkitBackdropFilter: "blur(12px) saturate(80%)",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {cursor.label?.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      </div>

      {/* LEFT — fixed info panel */}
      <div
        className="w-[38%] flex-shrink-0 h-screen fixed left-0 top-0 flex flex-col justify-between px-10 py-12 border-r border-neutral-100 bg-white z-10 overflow-visible"
        style={{
          fontFamily: "'Asta Sans', Arial, sans-serif",
        }}
      >
        {/* Top: name + tagline */}
        <div>
          <div className="mb-12">
            <p
              className="text-[128px] font-medium text-neutral-900 mb-8"
              style={{
                letterSpacing: "-0.07em",
                lineHeight: "0.9",
              }}
            >
              Amir Einy
            </p>
            <p
              className="text-[28px] font-light text-neutral-500 mt-24"
              style={{ lineHeight: "1.1" }}
            >
              {taglineText.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
              <span
                style={{
                  animation: "blink 1s step-start infinite",
                  opacity: 0.5,
                }}
              >
                |
              </span>
              <style>{`@keyframes blink { 0%, 100% { opacity: 0.5; } 50% { opacity: 0; } }`}</style>
            </p>
          </div>
        </div>

        {/* Middle: hover preview image — bleeds into right panel */}
        <div
          className="absolute pointer-events-none overflow-hidden"
          style={{
            top: "50%",
            left: "40px",
            width: "500px",
            height: "280px",
            opacity: imageVisible ? 1 : 0,
            transition:
              "opacity 300ms ease-out, transform 120ms ease-out",
            transform: `translateY(calc(-50% + ${(cursor.y / window.innerHeight - 0.5) * 24}px)) translateX(${(cursor.x / window.innerWidth - 0.5) * 16}px)`,
            zIndex: 20,
          }}
        >
          {displayedImage && (
            <PixelatedImage
              src={displayedImage}
              alt="preview"
              className="w-full h-full"
              trigger={displayedImage}
            />
          )}
        </div>

        {/* Bottom: nav + email + socials */}
        <div className="space-y-10">
          <div className="flex flex-col gap-4">
            <Link
              to="/work"
              className="w-fit text-[32px] text-neutral-900 no-underline hover:underline hover:underline-offset-4 transition-none"
              onMouseEnter={() => setHoveredLink("work")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {hoveredLink === "work" ? "✢ Work" : "Work"}
            </Link>
            <Link
              to="/about"
              className="w-fit text-[32px] text-neutral-900 no-underline hover:underline hover:underline-offset-4 transition-none"
              onMouseEnter={() => setHoveredLink("about")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {hoveredLink === "about" ? "✢ About" : "About"}
            </Link>
            <Link
              to="/contact"
              className="w-fit text-[32px] text-neutral-900 no-underline hover:underline hover:underline-offset-4 transition-none"
              onMouseEnter={() => setHoveredLink("contact")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {hoveredLink === "contact"
                ? "✢ Contact"
                : "Contact"}
            </Link>
          </div>
          <div>
            <a
              href="mailto:design@amireiny.com"
              className="block text-[15px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              design@amireiny.com
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT — fade project panel */}
      <div
        ref={rightPanelRef}
        className="ml-[38%] w-[62%] h-screen overflow-hidden relative"
        style={{ cursor: cursor.label ? "none" : "auto" }}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.slug}`}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity:
                index === currentIndex ? (visible ? 1 : 0) : 0,
              transition: "opacity 400ms ease-in-out",
              pointerEvents:
                index === currentIndex ? "auto" : "none",
            }}
            onMouseEnter={() =>
              handleProjectEnter(
                project.title,
                project.slug,
                project.category,
              )
            }
            onMouseLeave={handleProjectLeave}
          >
            {project.slug === "wix-web-design-festival" ? (
              <div className="absolute inset-0 w-full h-full">
                {wwdImages.map((src, wi) => (
                  <img
                    key={wi}
                    src={src}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: wi === wwdImageIndex ? 1 : 0,
                    }}
                  />
                ))}
              </div>
            ) : (
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            {index === currentIndex && (
              <p
                className={`absolute left-16 text-[128px] font-medium pointer-events-none ${project.slug === "agilite" ? "text-black" : "text-white"}`}
                style={{
                  top: "48px",
                  letterSpacing: "-0.07em",
                  lineHeight: "0.9",
                  fontFamily: "'Asta Sans', Arial, sans-serif",
                }}
              >
                {typedText.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < typedText.split("\n").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}