import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 144;

export const CinematicCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);

  // Preload images
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const folder = isDesktop ? 'desktop' : 'mobile';
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = `/frames/${folder}/frame_${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Draw first frame immediately when all loaded
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) drawImageCover(ctx, canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, [isDesktop]);

  const drawImageCover = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;
    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let rw, rh, sx, sy;

    if (imgRatio < canvasRatio) {
      rw = cw;
      rh = cw / imgRatio;
    } else {
      rh = ch;
      rw = ch * imgRatio;
    }
    
    sx = (cw - rw) / 2;
    sy = (ch - rh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, rw, rh);
  };

  useEffect(() => {
    const updateCanvas = () => {
      if (!containerRef.current || !canvasRef.current || images.length === 0) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Scroll percentage relative to this container
      // When rect.top === 0, scroll is 0%
      // When rect.bottom === window.innerHeight, scroll is 100%
      
      const scrollTop = -rect.top;
      const scrollHeight = rect.height - window.innerHeight;
      
      let scrollFraction = scrollTop / scrollHeight;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      const frame = images[frameIndex];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx && frame) {
        requestAnimationFrame(() => drawImageCover(ctx, canvas, frame));
      }
    };

    window.addEventListener('scroll', updateCanvas);
    updateCanvas(); // init

    return () => window.removeEventListener('scroll', updateCanvas);
  }, [images]);

  // Handle canvas resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // redraw current frame
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-gym-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
