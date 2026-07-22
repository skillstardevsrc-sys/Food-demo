import React from 'react';
import ThemeMenu from './ThemeMenu';

export default function Navbar({ cartCount, onOpenCart, activeTheme, onSelectTheme, onShowToast }) {
  return (
    <header class="navbar">
      <div class="nav-container">
        <div class="nav-left">
          <button class="mobile-menu-btn" aria-label="Toggle menu">
            <i class="fa-solid fa-bars-staggered"></i>
          </button>
          <nav class="nav-links">
            <a href="#products" class="nav-link active">Shop Rituals</a>
            <a href="#formulation" class="nav-link">Formulation</a>
            <a href="#philosophy" class="nav-link">Our Science</a>
            <a href="#reviews" class="nav-link">Reviews</a>
          </nav>
        </div>

        <div class="nav-brand">
          <a href="#" class="brand-logo">
            <span class="brand-accent">é</span>b t y
            <span class="brand-tagline">PARIS / TOKYO</span>
          </a>
        </div>

        <div class="nav-right">
          <ThemeMenu 
            activeTheme={activeTheme} 
            onSelectTheme={onSelectTheme} 
            onShowToast={onShowToast} 
          />

          <button class="nav-icon-btn" aria-label="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

          <button class="nav-icon-btn" aria-label="Wishlist">
            <i class="fa-regular fa-heart"></i>
            <span class="badge-dot"></span>
          </button>

          <button class="nav-icon-btn cart-btn" onClick={onOpenCart} aria-label="Cart">
            <i class="fa-solid fa-bag-shopping"></i>
            <span class="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
