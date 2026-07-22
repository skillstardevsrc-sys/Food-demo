import React from 'react';

export default function ProductSelector({ products, activeIndex, onSelectProduct }) {
  return (
    <div class="product-selector-card glass-card">
      <div class="selector-header">
        <span class="selector-title">SELECT YOUR DAILY RITUAL</span>
        <span class="step-indicator">
          0{activeIndex + 1} / 0{products.length}
        </span>
      </div>

      <div class="selector-options">
        {products.map((prod, idx) => (
          <button
            key={prod.id}
            class={`selector-btn ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => onSelectProduct(idx)}
          >
            <span class="thumb-box">
              <img src={prod.image} alt={prod.name} />
            </span>
            <div class="thumb-info">
              <strong>{prod.name}</strong>
              <span>{prod.subtitle}</span>
            </div>
            <span class="thumb-price">${prod.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
