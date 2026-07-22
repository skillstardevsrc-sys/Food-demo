import React, { useState } from 'react';

export default function OrderModal({ isOpen, onClose }) {
  const [selectedBurger, setSelectedBurger] = useState('double');

  if (!isOpen) return null;

  return (
    <div class="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div class="order-modal-card">
        <button class="modal-close-btn" onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="modal-title">CUSTOMIZE YOUR SKILL STAR</h2>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
          Fresh double smashed beef patties, melted sharp cheddar, crispy bacon & house signature sauce on golden brioche.
        </p>

        <div class="menu-options-list">
          <div 
            class={`menu-option-card ${selectedBurger === 'single' ? 'active' : ''}`}
            onClick={() => setSelectedBurger('single')}
            style={{ cursor: 'pointer', borderColor: selectedBurger === 'single' ? 'var(--accent-orange)' : '#3D3830' }}
          >
            <div>
              <div class="menu-option-name">Single Smash Skill Star</div>
              <span style={{ fontSize: '0.78rem', color: '#999' }}>1x 100% Angus Beef Smash Patty</span>
            </div>
            <span class="menu-option-price">$9.99</span>
          </div>

          <div 
            class={`menu-option-card ${selectedBurger === 'double' ? 'active' : ''}`}
            onClick={() => setSelectedBurger('double')}
            style={{ cursor: 'pointer', borderColor: selectedBurger === 'double' ? 'var(--accent-orange)' : '#3D3830' }}
          >
            <div>
              <div class="menu-option-name">Double Smash Skill Star (Original)</div>
              <span style={{ fontSize: '0.78rem', color: '#999' }}>2x Smashed Patties + Extra Cheddar</span>
            </div>
            <span class="menu-option-price">$13.99</span>
          </div>

          <div 
            class={`menu-option-card ${selectedBurger === 'triple' ? 'active' : ''}`}
            onClick={() => setSelectedBurger('triple')}
            style={{ cursor: 'pointer', borderColor: selectedBurger === 'triple' ? 'var(--accent-orange)' : '#3D3830' }}
          >
            <div>
              <div class="menu-option-name">Triple Heavyweight Skill Star</div>
              <span style={{ fontSize: '0.78rem', color: '#999' }}>3x Patties + Double Bacon & Cheese</span>
            </div>
            <span class="menu-option-price">$16.99</span>
          </div>
        </div>

        <button class="checkout-action-btn" onClick={() => { alert('Order placed! Fast delivery in 20 mins 🛵💨'); onClose(); }}>
          ADD TO ORDER • ${selectedBurger === 'single' ? '9.99' : selectedBurger === 'double' ? '13.99' : '16.99'}
        </button>
      </div>
    </div>
  );
}
