import React from 'react';

export default function HeaderNavbar({ onOpenOrderModal }) {
  return (
    <header class="header-navbar">
      <div class="brand-logo-box">
        <div class="star-circle-icon">
          <i class="fa-solid fa-star"></i>
        </div>
        <span class="brand-title-text">SKILL STAR BURGS</span>
      </div>

      <div class="header-right-nav">
        <a href="#menu" class="nav-item-link">MENU</a>
        <a href="#concept" class="nav-item-link">CONCEPT</a>
        <a href="#locations" class="nav-item-link">LOCATIONS</a>
        <button class="order-now-nav-btn" onClick={onOpenOrderModal}>
          ORDER NOW
        </button>
      </div>
    </header>
  );
}
