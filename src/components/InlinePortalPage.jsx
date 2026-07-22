import React, { useState } from 'react';

export default function InlinePortalPage({ onOpenOrderModal }) {
  const [activeTab, setActiveTab] = useState('burgers');

  const menuItems = [
    {
      id: 'single',
      name: 'THE SINGLE ACE',
      price: '₹749',
      badge: 'CLASSIC SMASH',
      desc: 'Single 100% Angus patty, melted cheddar, pickles & secret sauce.',
      icon: 'fa-burger',
    },
    {
      id: 'double',
      name: 'THE DOUBLE SKILL STAR',
      price: '₹1,099',
      badge: '★ BESTSELLER',
      highlight: true,
      desc: 'Double Angus patties, double melted aged cheddar, crispy bacon & house glaze.',
      icon: 'fa-fire-burner',
    },
    {
      id: 'triple',
      name: 'THE TRIPLE CHAMPION',
      price: '₹1,349',
      badge: 'EXTREME STACK',
      desc: 'Triple Angus patties, triple cheddar stack, caramelized onions & spicy mayo.',
      icon: 'fa-bolt',
    },
    {
      id: 'monster',
      name: 'THE PORTAL OVERLOAD',
      price: '₹1,599',
      badge: 'SPECIAL EDITION',
      desc: 'Quad Angus patties, smoked bacon, double cheddar, jalapeños & lava sauce.',
      icon: 'fa-crown',
    },
  ];

  return (
    <div class="inline-portal-page" id="portal-dimension">
      {/* Inline Portal Header */}
      <div class="portal-page-header">
        <div class="eyebrow-tag" style={{ justifyContent: 'center' }}>
          <span class="eyebrow-line"></span>
          <span>SKILL STAR BURGS — CRAFT KITCHEN</span>
          <span class="eyebrow-line"></span>
        </div>

        <h2 class="portal-page-title">
          WHAT ARE YOU CRAVING TODAY?
        </h2>

        <p class="portal-page-desc">
          Fresh, bold, smashed to perfection. Pick your favourite and let us bring the heat to your door.
        </p>

        {/* Portal Dimension Navigation Tabs */}
        <div class="portal-nav-tabs">
          <button 
            class={`portal-tab-btn ${activeTab === 'burgers' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('burgers')}
          >
            <i class="fa-solid fa-burger"></i>
            <span>SMASH BURGERS</span>
          </button>
          <button 
            class={`portal-tab-btn ${activeTab === 'sides' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('sides')}
          >
            <i class="fa-solid fa-utensils"></i>
            <span>CRAFT SIDES & FRIES</span>
          </button>
          <button 
            class={`portal-tab-btn ${activeTab === 'drinks' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('drinks')}
          >
            <i class="fa-solid fa-wine-glass"></i>
            <span>SHAKES & DRINKS</span>
          </button>
        </div>
      </div>

      {/* Dynamic Inline Menu Grid */}
      <div class="portal-menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} class={`portal-menu-card ${item.highlight ? 'highlighted-portal-card' : ''}`}>
            <div class="portal-card-top">
              <span class="portal-card-badge">{item.badge}</span>
              <div class="portal-card-icon"><i class={`fa-solid ${item.icon}`}></i></div>
            </div>

            <h3 class="portal-card-name">{item.name}</h3>
            <div class="portal-card-price">{item.price}</div>
            <p class="portal-card-desc">{item.desc}</p>

            <button class="portal-order-btn" onClick={onOpenOrderModal}>
              <span>ADD TO CRAFT ORDER</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Portal Dimension Stats Bar */}
      <div class="portal-stats-banner">
        <div class="portal-stat-box">
          <i class="fa-solid fa-stopwatch stat-icon"></i>
          <div>
            <strong>20 MINS</strong>
            <span>Blazing Hot Delivery</span>
          </div>
        </div>

        <div class="portal-stat-box">
          <i class="fa-solid fa-fire stat-icon"></i>
          <div>
            <strong>SMASHED FRESH</strong>
            <span>Never Frozen. Ever.</span>
          </div>
        </div>

        <div class="portal-stat-box">
          <i class="fa-solid fa-star stat-icon"></i>
          <div>
            <strong>4.9 ★ RATING</strong>
            <span>12,000+ Happy Foodies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
