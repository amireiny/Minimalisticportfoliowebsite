import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  trigger: string | number;
}

const STEPS = [48, 32, 20, 12, 6, 3];
const STEP_INTERVAL = 85;

export function PixelatedImage({ src, alt, className, trigger }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hideCanvas, setHideCanvas] = useState(false);

  useEffect(() => {
    setHideCanvas(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let intervalId: ReturnType<typeof setInterval>;

    img.onload = () => {
      const w = canvas.width;
      const h = canvas.height;
      let step = 0;

      const draw = () => {
        const blockSize = STEPS[step];
        const smallW = Math.max(1, Math.floor(w / blockSize));
        const smallH = Math.max(1, Math.floor(h / blockSize));

        ctx.clearRect(0, 0, w, h);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(img, 0, 0, smallW, smallH);
        ctx.drawImage(canvas, 0, 0, smallW, smallH, 0, 0, w, h);
      };

      draw();

      intervalId = setInterval(() => {
        step++;
        if (step >= STEPS.length) {
          clearInterval(intervalId);
          // Fade out the canvas to reveal the img underneath
          setHideCanvas(true);
          return;
        }
        draw();
      }, STEP_INTERVAL);
    };

    return () => clearInterval(intervalId);
  }, [src, trigger]);

  return (
    <div className={className} style={{ position: "relative" }}>
      {/* Full quality image always underneath */}
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Pixelated canvas overlay - fades out when done */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: hideCanvas ? 0 : 1,
          transition: "opacity 200ms ease-out",
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
