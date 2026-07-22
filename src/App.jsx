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

  // Asset Loading States
  const [loadedHero, setLoadedHero] = useState(0);
  const [loadedThird, setLoadedThird] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
  const totalHero = Math.ceil(291 / (isMobile ? 4 : 1)); // 73 on mobile, 291 on desktop
  const totalThird = isMobile ? 0 : 306; // 0 on mobile, 306 on desktop
  const totalImages = totalHero + totalThird;

  const totalLoaded = loadedHero + loadedThird;
  const percentage = totalImages > 0 ? Math.min(100, Math.round((totalLoaded / totalImages) * 100)) : 100;

  useEffect(() => {
    if (percentage >= 100) {
      const timer = setTimeout(() => setIsAppReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [percentage]);

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
      {/* Global Preloader Screen */}
      {!isAppReady && (
        <div className={`global-preloader ${percentage === 100 ? 'fade-out' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-logo-wrap">
              <div className="preloader-star">
                <i className="fa-solid fa-star"></i>
              </div>
              <div className="preloader-ring"></div>
            </div>
            <h2 className="preloader-title">SKILL STAR BURGS</h2>
            <p className="preloader-subtitle">Crafting Chennai's Finest Smash...</p>
            <div className="preloader-progress-container">
              <div className="preloader-progress-bar" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="preloader-percentage">{percentage}%</div>
          </div>
        </div>
      )}

      {/* 1. Transparent Top Navbar Header */}
      <HeaderNavbar 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

      {/* 2. Scroll-Driven 60fps Frame Sequence Hero Section */}
      <HeroSection 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onScrollToMenu={handleScrollToMenu}
        onProgress={(loaded) => setLoadedHero(loaded)}
      />

      {/* 3. Multi-Layered Parallax Ingredients Section */}
      <ParallaxIngredientsSection />

      {/* 4. Third Clean Empty Black Background Section */}
      <ThirdSection 
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onProgress={(loaded) => setLoadedThird(loaded)}
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
