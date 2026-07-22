import React, { useEffect, useState, useRef } from 'react';

export default function ParallaxIngredientsSection() {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const relativeY = window.innerHeight - rect.top;

      if (relativeY > 0 && rect.bottom > 0) {
        setScrollY(relativeY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} class="parallax-section" id="concept">
      {/* Layer 0: Deep Background Ambient Glow Orbs */}
      <div class="parallax-bg-layer" style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
        <div class="parallax-glow-orb orb-left"></div>
        <div class="parallax-glow-orb orb-right"></div>
      </div>

      {/* Layer 1: Floating Ingredients from the SECOND folder */}
      <div class="parallax-ingredients-layer">
        {/* Top Left: Lettuce Leaf */}
        <div 
          class="floating-ingredient ingredient-lettuce"
          style={{ transform: `translateY(${scrollY * -0.16}px) rotate(${scrollY * 0.03}deg)` }}
        >
          <img 
            src="/assets/images/second/lettuce_leaf-removebg-preview.png" 
            alt="Fresh Crisp Lettuce" 
          />
        </div>

        {/* Top Right: Crispy Bacon Strip */}
        <div 
          class="floating-ingredient ingredient-bacon"
          style={{ transform: `translateY(${scrollY * -0.28}px) rotate(${scrollY * -0.04}deg)` }}
        >
          <img 
            src="/assets/images/second/bacon_strip-removebg-preview.png" 
            alt="Sizzled Bacon Strip" 
          />
        </div>

        {/* Bottom Left: Fresh Tomato Slice */}
        <div 
          class="floating-ingredient ingredient-tomato"
          style={{ transform: `translateY(${scrollY * -0.26}px) rotate(${scrollY * 0.04}deg)` }}
        >
          <img 
            src="/assets/images/second/tomato_slice-removebg-preview.png" 
            alt="Fresh Juicy Tomato" 
          />
        </div>

        {/* Bottom Center/Right: Crispy French Fries */}
        <div 
          class="floating-ingredient ingredient-fries"
          style={{ transform: `translateY(${scrollY * -0.32}px) rotate(${scrollY * -0.03}deg)` }}
        >
          <img 
            src="/assets/images/second/french_fries-removebg-preview.png" 
            alt="Golden Crispy French Fries" 
          />
        </div>
      </div>

      {/* Layer 2: Foreground Content & Cards */}
      <div class="parallax-foreground-container">
        <div class="parallax-section-header">
          <div class="eyebrow-tag">
            <span class="eyebrow-line"></span>
            <span>THE SECOND CRAFT FORMULA</span>
          </div>

          <h2 class="parallax-section-title">
            ENGINEERED LAYER BY LAYER <br />
            FOR MAXIMUM FLAVOR
          </h2>

          <p class="parallax-section-desc">
            No fillers. No shortcuts. Every element is smashed, melted, and toasted to perfection.
          </p>
        </div>

        {/* 3D Glassmorphic Feature Cards */}
        <div class="parallax-cards-grid">
          <div 
            class="parallax-card"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <span class="card-step-badge">01</span>
            <div class="card-icon"><i class="fa-solid fa-fire-burner"></i></div>
            <h3 class="card-title">THE 450°F SEAR</h3>
            <p class="card-desc">
              Heavy cast-iron smash locks in rich juices and creates a caramelized crispy edge.
            </p>
          </div>

          <div 
            class="parallax-card highlighted-card"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          >
            <span class="card-step-badge">02</span>
            <div class="card-icon"><i class="fa-solid fa-cheese"></i></div>
            <h3 class="card-title">DOUBLE AGED CHEDDAR</h3>
            <p class="card-desc">
              Sharp Wisconsin cheddar melted directly between double hot Angus beef patties.
            </p>
          </div>

          <div 
            class="parallax-card"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <span class="card-step-badge">03</span>
            <div class="card-icon"><i class="fa-solid fa-bread-slice"></i></div>
            <h3 class="card-title">BUTTER TOASTED BRIOCHE</h3>
            <p class="card-desc">
              Artisanal golden brioche bun buttered and griddled to absorb every bit of flavor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
