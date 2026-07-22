import React from 'react';

export default function HeroContent({ product, onAddToCart, onOpenVideo }) {
  return (
    <div class="hero-content">
      <div class="eyebrow-badge">
        <span class="pulse-dot"></span>
        <span>{product.series}</span>
      </div>

      <h1 class="hero-title">
        Reveal Your <br />
        <span class="title-serif-italic title-gradient">{product.highlight}</span> <br />
        With Cream Alchemy
      </h1>

      <p class="hero-description">
        {product.description}
      </p>

      <div class="rating-strip">
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <span class="rating-score">4.92 / 5.0</span>
        <span class="rating-count">(3,480+ Verified Ritualists)</span>
      </div>

      <div class="hero-cta-group">
        <div class="price-box">
          <span class="current-price">${product.price}</span>
          <span class="original-price">${product.oldPrice}</span>
          <span class="save-tag">{product.discountTag}</span>
        </div>

        <div class="button-row">
          <button class="btn-primary" onClick={() => onAddToCart(product)}>
            <span class="btn-text">Add to Bag</span>
            <span class="btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
          </button>

          <button class="btn-secondary" onClick={onOpenVideo}>
            <span class="play-pulse"><i class="fa-solid fa-play"></i></span>
            <span>Watch 30s Ritual</span>
          </button>
        </div>
      </div>

      <div class="specs-grid">
        {product.specs.map((spec, i) => (
          <React.Fragment key={i}>
            <div class="spec-item">
              <i class={`fa-solid ${spec.icon} spec-icon`}></i>
              <div>
                <strong>{spec.label}</strong>
                <span>{spec.sub}</span>
              </div>
            </div>
            {i < product.specs.length - 1 && <div class="spec-divider"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
