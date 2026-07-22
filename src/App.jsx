import React, { useState, useEffect } from 'react';
import HeaderNavbar from './components/HeaderNavbar';
import HeroSection from './components/HeroSection';
import ParallaxIngredientsSection from './components/ParallaxIngredientsSection';
import ThirdSection from './components/ThirdSection';
import Footer from './components/Footer';
import BottomPreviewBar from './components/BottomPreviewBar';
import OrderModal from './components/OrderModal';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const handleScrollToMenu = () => {
    setIsOrderModalOpen(true);
  };

  // Dynamically highlight active section in bottom app nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const conceptSection = document.getElementById('concept');
      const menuSection = document.getElementById('kitchen-menu') || document.getElementById('portal-dimension');
      
      // Offset for checking section activation (useful on smaller viewports)
      const activationOffset = 250;

      if (menuSection && scrollPos >= menuSection.offsetTop - activationOffset) {
        setActiveTab('menu');
      } else if (conceptSection && scrollPos >= conceptSection.offsetTop - activationOffset) {
        setActiveTab('concept');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium Initial Loader Screen */}
      <div className={`premium-loader-screen ${!isLoading ? 'fade-out' : ''}`}>
        <div className="loader-content">
          <div className="loader-logo">
            <i className="fa-solid fa-burger loader-burger-icon"></i>
            <div className="loader-glow-ring"></div>
          </div>
          <div className="loader-text-wrapper">
            <h2 className="loader-brand-title">SKILL STAR</h2>
            <div className="loader-progress-bar-container">
              <div className="loader-progress-bar"></div>
            </div>
            <p className="loader-status-text">PREPARING YOUR EXPERIENCE...</p>
          </div>
        </div>
      </div>

      {/* 1. Transparent Top Navbar Header */}
      <HeaderNavbar 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* 2. Scroll-Driven 60fps Frame Sequence Hero Section */}
      <HeroSection 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onScrollToMenu={handleScrollToMenu}
        onReady={() => setIsLoading(false)}
      />

      {/* 3. Multi-Layered Parallax Ingredients Section */}
      <ParallaxIngredientsSection />

      {/* 4. Third Clean Empty Black Background Section */}
      <ThirdSection 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* 5. Footer */}
      <Footer onOpenOrderModal={() => setIsOrderModalOpen(true)} />

      {/* 6. Bottom Credit Bar */}
      <BottomPreviewBar />

      {/* 7. Bottom App Navigation Bar (Mobile / Tablet only) */}
      <div className="bottom-app-nav">
        <button 
          className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </button>
        <button 
          className={`bottom-nav-item ${activeTab === 'concept' ? 'active' : ''}`}
          onClick={() => document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <i className="fa-solid fa-fire"></i>
          <span>Concept</span>
        </button>
        <button 
          className={`bottom-nav-item ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => (document.getElementById('kitchen-menu') || document.getElementById('portal-dimension'))?.scrollIntoView({ behavior: 'smooth' })}
        >
          <i className="fa-solid fa-burger"></i>
          <span>Menu</span>
        </button>
        <button 
          className="bottom-nav-item"
          onClick={() => setIsOrderModalOpen(true)}
        >
          <i className="fa-solid fa-basket-shopping"></i>
          <span>Order</span>
        </button>
      </div>

      {/* 8. Interactive Order Customization Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
}
