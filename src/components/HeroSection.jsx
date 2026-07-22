import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 291;

export default function HeroSection({ onOpenOrderModal, onScrollToMenu, onProgress }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Physics state for ultra-creamy lerp + coasting inertia
  const rawTargetFrameRef = useRef(0);
  const lastRawTargetRef = useRef(0);
  const inertiaOffsetRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animLoopIdRef = useRef(null);

  const getFrameUrl = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/assets/heroframes/ezgif-frame-${frameNum}.png`;
  };

  // Preload all frames and track loading progress for the global preloader
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    const step = isMobile ? 4 : 1;
    const images = [];
    let loadedCount = 0;

    // First frame is always loaded (index 0)
    const onImageLoad = () => {
      loadedCount++;
      onProgress?.(loadedCount);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      images.push(img);

      const isTargetFrame = i % step === 0 || i === 0 || i === TOTAL_FRAMES - 1;

      if (isTargetFrame) {
        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Fallback to avoid getting stuck
        img.src = getFrameUrl(i);
      } else {
        const nearestIndex = Math.round(i / step) * step;
        const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, nearestIndex));
        img.src = getFrameUrl(clampedIndex);
      }
    }
    imagesRef.current = images;
  }, []);

  // Draw frame with crisp DPR-corrected scaling
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    const img = imagesRef.current[idx];

    if (!img) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;

      if (!imgW || !imgH) return;

      const imgRatio = imgW / imgH;
      const canvasRatio = w / h;

      let drawW, drawH, drawX, drawY;

      const isMobile = window.innerWidth <= 1024;
      const isPortrait = h > w;

      if (isMobile) {
        if (isPortrait) {
          // Portrait phone/tablet: scale to 1.55x canvas width and shift up by 50px to sit above text cards
          drawW = w * 1.55;
          drawH = drawW / imgRatio;
          drawX = (w - drawW) / 2;
          drawY = (h - drawH) / 2 - 50;
        } else {
          // Landscape mobile: fit to width, centered
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }
      } else {
        // Cover strategy on desktop
        if (canvasRatio > imgRatio) {
          drawW = w;
          drawH = w / imgRatio;
          drawX = 0;
          drawY = (h - drawH) / 2;
        } else {
          drawH = h;
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
          drawY = 0;
        }
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }
  };

  // Continuous ultra-silky Lerp loop with momentum inertia
  useEffect(() => {
    const renderLoop = () => {
      const velocity = rawTargetFrameRef.current - lastRawTargetRef.current;
      lastRawTargetRef.current = rawTargetFrameRef.current;

      if (Math.abs(velocity) > 0.02) {
        inertiaOffsetRef.current = Math.sign(velocity) * Math.min(35, Math.abs(velocity) * 22);
      } else {
        inertiaOffsetRef.current *= 0.965;
      }

      const effectiveTarget = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawTargetFrameRef.current + inertiaOffsetRef.current));
      const diff = effectiveTarget - currentFrameRef.current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.038;
        drawFrame(currentFrameRef.current);
      }

      animLoopIdRef.current = requestAnimationFrame(renderLoop);
    };

    animLoopIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animLoopIdRef.current) {
        cancelAnimationFrame(animLoopIdRef.current);
      }
    };
  }, []);

  // Resize canvas & bind scroll progress
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const cssW = window.innerWidth;
        const cssH = window.innerHeight;
        // Set the actual pixel buffer size (sharp on HiDPI)
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        // Set CSS display size so it doesn't stretch
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        drawFrame(currentFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      
      if (scrollableHeight <= 0) return;

      const scrollTop = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollTop / scrollableHeight));
      
      rawTargetFrameRef.current = progress * (TOTAL_FRAMES - 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // -------------------------------------------------------------------------
  // REVEAL STAGE 1: Left Main Text (Scroll 0% -> 25%)
  // -------------------------------------------------------------------------
  const stage1Opacity = scrollProgress < 0.22 ? 1 : Math.max(0, 1 - (scrollProgress - 0.22) / 0.08);
  const stage1Y = (1 - stage1Opacity) * -30;

  // -------------------------------------------------------------------------
  // REVEAL STAGE 2: Right Minimal Floating Text (Scroll 30% -> 60%)
  // -------------------------------------------------------------------------
  let stage2Opacity = 0;
  let stage2X = 30;
  if (scrollProgress >= 0.28 && scrollProgress < 0.36) {
    stage2Opacity = (scrollProgress - 0.28) / 0.08;
    stage2X = (1 - stage2Opacity) * 30;
  } else if (scrollProgress >= 0.36 && scrollProgress <= 0.54) {
    stage2Opacity = 1;
    stage2X = 0;
  } else if (scrollProgress > 0.54 && scrollProgress <= 0.62) {
    stage2Opacity = Math.max(0, 1 - (scrollProgress - 0.54) / 0.08);
    stage2X = (1 - stage2Opacity) * -30;
  }

  // -------------------------------------------------------------------------
  // REVEAL STAGE 3: Finale Text (Moved to Left-Side Alignment!) (Scroll 65% -> 100%)
  // -------------------------------------------------------------------------
  const stage3Opacity = scrollProgress < 0.64 ? 0 : Math.min(1, (scrollProgress - 0.64) / 0.09);
  const stage3Y = (1 - stage3Opacity) * 35;

  return (
    <div ref={containerRef} class="hero-scroll-container">
      <section class="hero-wrapper">
        {/* Canvas for Ultra Buttery Smooth 60fps Lerp Frame Sequence */}
        <canvas ref={canvasRef} class="hero-frame-canvas" />

        {/* Minimal Subtle Overlay for High Clarity & Text Readability */}
        <div class="hero-overlay-dark"></div>

        <div class="hero-content-grid">

          {/* =================================================================
              STAGE 1: Left Minimal Text (Scroll 0% - 25%)
              ================================================================= */}
          <div 
            class="hero-left-column"
            style={{
              opacity: stage1Opacity,
              transform: `translateY(${stage1Y}px)`,
              pointerEvents: stage1Opacity > 0.1 ? 'auto' : 'none',
              transition: 'opacity 0.1s linear, transform 0.1s linear'
            }}
          >
            <div class="eyebrow-tag">
              <span class="eyebrow-line"></span>
              <span>SKILL STAR BURGS — CHENNAI'S FINEST</span>
            </div>

            <h1 class="hero-headline">
              EVERY BITE IS A
              <br />
              BOLD STATEMENT
            </h1>

            <p class="hero-subtitle">
              Hand-smashed to order. Dripping with aged cheddar. Served blazing hot — always.
            </p>

            <div class="hero-buttons-group">
              <button class="btn-hero-primary" onClick={onOpenOrderModal}>
                ORDER NOW
              </button>
              <button class="btn-hero-secondary" onClick={onScrollToMenu}>
                VIEW MENU
              </button>
            </div>

            <div class="fast-delivery-badge">
              <i class="fa-solid fa-motorcycle delivery-icon-scooter"></i>
              <span class="delivery-badge-text">DELIVERED HOT IN UNDER 20 MINS.</span>
            </div>
          </div>

          {/* =================================================================
              STAGE 2: Right Pure Floating Text (Scroll 30% - 60%)
              ================================================================= */}
          <div 
            class="hero-stage2-floating-text"
            style={{
              opacity: stage2Opacity,
              transform: `translateX(${stage2X}px)`,
              pointerEvents: stage2Opacity > 0.1 ? 'auto' : 'none',
              transition: 'opacity 0.1s linear, transform 0.1s linear'
            }}
          >
            <div class="eyebrow-tag">
              <i class="fa-solid fa-fire" style={{ color: '#FF5500' }}></i>
              <span>SMASHED FRESH — NEVER FROZEN</span>
            </div>

            <h2 class="minimal-text-title">
              GOLDEN CRISP EDGES.
              <br />
              JUICY MOLTEN CORE.
            </h2>

            <p class="minimal-text-sub">
              100% Fresh Angus Beef • House Glaze • Double Cheddar Pull
            </p>
          </div>

          {/* =================================================================
              STAGE 3: Finale Floating Text (Moved to Left Side!) (Scroll 65% - 100%)
              ================================================================= */}
          <div 
            class="hero-stage3-floating-text"
            style={{
              opacity: stage3Opacity,
              transform: `translateY(${stage3Y}px)`,
              pointerEvents: stage3Opacity > 0.1 ? 'auto' : 'none',
              transition: 'opacity 0.1s linear, transform 0.1s linear'
            }}
          >
            <div class="eyebrow-tag">
              <i class="fa-solid fa-bolt" style={{ color: '#FF5500' }}></i>
              <span>THE STAR IS ON YOUR PLATE</span>
            </div>

            <h2 class="minimal-text-title" style={{ textAlign: 'left', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              HUNGRY? YOUR
              <br /> SMASH IS WAITING.
            </h2>

            <button class="btn-hero-primary btn-finale-large" onClick={onOpenOrderModal} style={{ marginTop: '0.75rem' }}>
              <span>BUILD MY SMASH MEAL</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
