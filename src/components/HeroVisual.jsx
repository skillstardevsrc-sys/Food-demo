import React, { useState, useRef } from 'react';
import ProductSelector from './ProductSelector';

export default function HeroVisual({ products, activeIndex, onSelectProduct, isChanging }) {
  const activeProduct = products[activeIndex];
  const visualStageRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!visualStageRef.current || window.innerWidth <= 1024) return;
    const rect = visualStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / rect.height) * -8;
    const tiltY = (x / rect.width) * 8;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    });
  };

  return (
    <div class="hero-visual">
      <div 
        class="visual-stage" 
        ref={visualStageRef}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div class="stage-backdrop-ring"></div>

        <div class="product-image-wrapper">
          <img 
            src={activeProduct.image} 
            alt={activeProduct.name} 
            class={`main-product-img ${isChanging ? 'changing' : ''}`}
          />
        </div>

        <div class="floating-badge badge-top-right glass-card">
          <div class="badge-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <div class="badge-text">
            <strong>Instant Glass Glow</strong>
            <span>+47% Brightness in 7 Days</span>
          </div>
        </div>

        <div class="floating-badge badge-bottom-left glass-card">
          <div class="avatar-stack">
            <div class="avatar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80')" }}></div>
            <div class="avatar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80')" }}></div>
          </div>
          <div class="badge-text">
            <div class="stars-mini"><i class="fa-solid fa-star"></i> 5.0</div>
            <span>"Transformed my dry texture!"</span>
          </div>
        </div>

        <div class="floating-badge badge-award glass-card">
          <i class="fa-solid fa-award"></i>
          <span>Vogue Beauty Choice 2026</span>
        </div>
      </div>

      <ProductSelector 
        products={products}
        activeIndex={activeIndex}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
}
