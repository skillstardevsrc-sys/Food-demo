import React, { useEffect, useRef, useState } from 'react';
import InlinePortalPage from './InlinePortalPage';

const SECOND_FRAMES_COUNT = 255;
const FINAL_FRAMES_COUNT = 51;
const COMBINED_TOTAL_FRAMES = SECOND_FRAMES_COUNT + FINAL_FRAMES_COUNT;
const DISH_REVEAL_THRESHOLD = COMBINED_TOTAL_FRAMES - 30;

/* ─── 5 KITCHENS × 15 DISHES EACH ─── */
const KITCHENS = [
  {
    id: 'burgers',
    label: '🍔 Smash Burgers',
    color: '#FF5500',
    glow: 'rgba(255,85,0,0.25)',
    image: '/assets/images/dishes/burgers.png',
    dishes: [
      { name: 'Single Ace Smash', desc: 'Single smashed patty, American cheese, pickles', price: '₹249', badge: 'CLASSIC', badgeColor: '#FF5500' },
      { name: 'Double Skill Star', desc: 'Two smashed patties, secret sauce, slaw', price: '₹349', badge: 'BESTSELLER', badgeColor: '#FFAA00' },
      { name: 'Triple Champion', desc: 'Triple stack, caramelized onions, jalapeños', price: '₹449', badge: 'BEAST MODE', badgeColor: '#FF3333' },
      { name: 'Portal Overload', desc: 'Quad patty, ghost pepper aioli, crispy bacon', price: '₹549', badge: 'EXTREME', badgeColor: '#CC00FF' },
      { name: 'Crispy Chicken Crush', desc: 'Nashville hot chicken, honey butter, pickles', price: '₹299', badge: 'HOT 🔥', badgeColor: '#FF5500' },
      { name: 'Bacon Bomb Stack', desc: 'Smoked bacon triple, cheddar melt, mustard', price: '₹399', badge: 'CHEF\'S PICK', badgeColor: '#FFAA00' },
      { name: 'Mushroom Maestro', desc: 'Sautéed mushrooms, Swiss cheese, garlic aioli', price: '₹329', badge: 'VEG STAR', badgeColor: '#00CC88' },
      { name: 'Egg & Cheese Dawn', desc: 'Fried egg, aged cheddar, smash patty, brioche', price: '₹319', badge: 'BREAKFAST', badgeColor: '#FFD700' },
      { name: 'Truffle Royale', desc: 'Black truffle aioli, arugula, premium patty', price: '₹499', badge: 'PREMIUM', badgeColor: '#AA55FF' },
      { name: 'Spicy Diablo', desc: 'Scorpion sauce, pepper jack, charred onions', price: '₹369', badge: 'SPICY 🌶️', badgeColor: '#FF3333' },
      { name: 'Avocado Green Smash', desc: 'Fresh avocado, lime aioli, crispy shallots', price: '₹359', badge: 'FRESH', badgeColor: '#00CC88' },
      { name: 'BBQ Ranch Stack', desc: 'Smoked BBQ, ranch drizzle, crispy onion rings', price: '₹389', badge: 'SMOKEY', badgeColor: '#8B4513' },
      { name: 'Blue Cheese Boss', desc: 'Blue cheese crumble, walnuts, balsamic glaze', price: '₹419', badge: 'BOLD', badgeColor: '#5588FF' },
      { name: 'The Skill Classic', desc: 'Original recipe, skill star sauce, sesame bun', price: '₹279', badge: 'OG', badgeColor: '#FF5500' },
      { name: 'Midnight Black Smash', desc: 'Charcoal bun, black garlic mayo, caramelized onion', price: '₹429', badge: 'LIMITED', badgeColor: '#333333' },
    ],
  },
  {
    id: 'sides',
    label: '🍟 Craft Sides',
    color: '#FFAA00',
    glow: 'rgba(255,170,0,0.22)',
    image: '/assets/images/dishes/sides.png',
    dishes: [
      { name: 'Classic Skill Fries', desc: 'Golden hand-cut, skill star seasoning', price: '₹129', badge: 'CLASSIC', badgeColor: '#FFAA00' },
      { name: 'Truffle Parmesan Fries', desc: 'Truffle oil, shaved parmesan, fresh herbs', price: '₹179', badge: 'PREMIUM', badgeColor: '#AA55FF' },
      { name: 'Loaded Cheese Fries', desc: 'Nacho cheese, jalapeños, crispy bacon bits', price: '₹199', badge: 'LOADED', badgeColor: '#FF5500' },
      { name: 'Waffle Wedges', desc: 'Thick waffle cut, chipotle dip, sour cream', price: '₹159', badge: 'THICK CUT', badgeColor: '#FFAA00' },
      { name: 'Sweet Potato Fries', desc: 'Caramelized sweet potato, cinnamon aioli', price: '₹169', badge: 'SWEET', badgeColor: '#FF8800' },
      { name: 'Onion Rings Tower', desc: 'Crispy battered rings, sriracha mayo', price: '₹149', badge: 'CRISPY', badgeColor: '#FFAA00' },
      { name: 'Mac & Cheese Bites', desc: 'Deep fried mac, cheddar pull, ranch dip', price: '₹189', badge: 'COMFORT', badgeColor: '#FFD700' },
      { name: 'Coleslaw Classic', desc: 'House pickled slaw, apple cider vinegar', price: '₹99', badge: 'FRESH', badgeColor: '#00CC88' },
      { name: 'Corn on Skewer', desc: 'Grilled corn, chilli butter, lime zest', price: '₹119', badge: 'GRILLED', badgeColor: '#FFD700' },
      { name: 'Mozzarella Sticks', desc: 'Golden fried mozzarella, marinara dip', price: '₹189', badge: 'PULL APART', badgeColor: '#FF5500' },
      { name: 'Garlic Bread Bites', desc: 'Herb butter, roasted garlic, crispy crust', price: '₹109', badge: 'BUTTERY', badgeColor: '#FFAA00' },
      { name: 'Jalapeño Poppers', desc: 'Cream cheese stuffed, breaded, ranch dip', price: '₹169', badge: 'SPICY 🌶️', badgeColor: '#FF3333' },
      { name: 'Smash Hash Brown', desc: 'Potato smash, seasoning, sour cream drizzle', price: '₹139', badge: 'CRISPY', badgeColor: '#FF8800' },
      { name: 'Buffalo Cauliflower', desc: 'Hot buffalo sauce, blue cheese, celery', price: '₹159', badge: 'VEG', badgeColor: '#00CC88' },
      { name: 'Peri Peri Wedges', desc: 'Spiced potato wedges, peri peri seasoning', price: '₹149', badge: 'HOT', badgeColor: '#FF5500' },
    ],
  },
  {
    id: 'shakes',
    label: '🧋 Shakes & Drinks',
    color: '#AA55FF',
    glow: 'rgba(170,85,255,0.22)',
    image: '/assets/images/dishes/shakes.png',
    dishes: [
      { name: 'Classic Chocolate Shake', desc: 'Belgian chocolate, milk, whipped cream', price: '₹199', badge: 'CLASSIC', badgeColor: '#7B3F00' },
      { name: 'Strawberry Dream', desc: 'Fresh strawberries, vanilla ice cream, cream', price: '₹209', badge: 'FRUITY', badgeColor: '#FF6699' },
      { name: 'Vanilla Bean Supreme', desc: 'Madagascar vanilla, cookie crumble, caramel', price: '₹219', badge: 'PREMIUM', badgeColor: '#AA55FF' },
      { name: 'Oreo Crush Shake', desc: 'Double Oreo, chocolate milk, cookie bits', price: '₹229', badge: 'BESTSELLER', badgeColor: '#333333' },
      { name: 'Salted Caramel Swirl', desc: 'Caramel sauce, sea salt, toffee crumble', price: '₹239', badge: 'INDULGENT', badgeColor: '#FFAA00' },
      { name: 'Mango Lassi Fusion', desc: 'Alphonso mango, yogurt, cardamom', price: '₹179', badge: 'DESI TWIST', badgeColor: '#FFD700' },
      { name: 'Matcha Green Shake', desc: 'Premium matcha, honey, oat milk', price: '₹249', badge: 'HEALTHY', badgeColor: '#00CC88' },
      { name: 'Peanut Butter Cup', desc: 'Creamy PB, banana, chocolate chips', price: '₹229', badge: 'POWER', badgeColor: '#8B4513' },
      { name: 'Blueberry Bliss', desc: 'Wild blueberries, cream cheese, vanilla', price: '₹219', badge: 'FRESH', badgeColor: '#5588FF' },
      { name: 'Skill Star Signature', desc: 'Secret house recipe, mystery flavour', price: '₹259', badge: 'MYSTERY ⭐', badgeColor: '#FF5500' },
      { name: 'Cold Brew Float', desc: 'Nitro cold brew, vanilla scoop, sea salt', price: '₹249', badge: 'COFFEE', badgeColor: '#5C3317' },
      { name: 'Rose Lychee Cooler', desc: 'Rose syrup, lychee, sparkling water', price: '₹169', badge: 'REFRESHING', badgeColor: '#FF6699' },
      { name: 'Watermelon Mint Soda', desc: 'Fresh watermelon, mint, soda, lime', price: '₹149', badge: 'SUMMER', badgeColor: '#FF3388' },
      { name: 'Nutella Hazelnut Shake', desc: 'Nutella blend, roasted hazelnuts, cream', price: '₹249', badge: 'RICH', badgeColor: '#8B4513' },
      { name: 'Turmeric Gold Latte', desc: 'Golden milk, turmeric, ginger, honey', price: '₹179', badge: 'WELLNESS', badgeColor: '#FFD700' },
    ],
  },
  {
    id: 'starters',
    label: '🥩 Starters',
    color: '#FF3333',
    glow: 'rgba(255,51,51,0.22)',
    image: '/assets/images/dishes/starters.png',
    dishes: [
      { name: 'Crispy Chicken Wings', desc: 'Buffalo hot sauce, blue cheese dip', price: '₹299', badge: 'SPICY', badgeColor: '#FF3333' },
      { name: 'Prawn Tempura', desc: 'Light batter, wasabi mayo, sesame seeds', price: '₹349', badge: 'SEAFOOD', badgeColor: '#5588FF' },
      { name: 'BBQ Chicken Skewers', desc: 'Smoky BBQ glaze, pickled onion, chimichurri', price: '₹319', badge: 'GRILLED', badgeColor: '#FF5500' },
      { name: 'Nachos Supreme', desc: 'Tortilla chips, cheese pull, guac, salsa', price: '₹259', badge: 'SHAREABLE', badgeColor: '#FFAA00' },
      { name: 'Paneer Tikka Bites', desc: 'Spiced paneer, mint chutney, charred peppers', price: '₹229', badge: 'VEG STAR', badgeColor: '#00CC88' },
      { name: 'Bacon Wrapped Dates', desc: 'Crispy bacon, medjool dates, manchego', price: '₹279', badge: 'PREMIUM', badgeColor: '#AA55FF' },
      { name: 'Calamari Rings', desc: 'Fried squid, garlic aioli, lemon zest', price: '₹329', badge: 'FRESH', badgeColor: '#5588FF' },
      { name: 'Loaded Potato Skins', desc: 'Crispy skins, bacon, sour cream, cheddar', price: '₹219', badge: 'COMFORT', badgeColor: '#FF8800' },
      { name: 'Edamame Salt & Pepper', desc: 'Steamed edamame, coarse salt, chilli flakes', price: '₹149', badge: 'LIGHT', badgeColor: '#00CC88' },
      { name: 'Chilli Chicken Bao', desc: 'Fluffy bao bun, chilli chicken, pickled veg', price: '₹289', badge: 'FUSION', badgeColor: '#FF5500' },
      { name: 'Tuna Tartare Cups', desc: 'Fresh tuna, avocado, sesame, wonton cup', price: '₹369', badge: 'CHEF\'S PICK', badgeColor: '#FFAA00' },
      { name: 'Burrata & Tomato', desc: 'Fresh burrata, heritage tomatoes, basil oil', price: '₹349', badge: 'ITALIAN', badgeColor: '#FF3333' },
      { name: 'Spicy Tuna Roll', desc: 'Spicy tuna, cucumber, sriracha drizzle', price: '₹329', badge: 'SUSHI', badgeColor: '#FF6699' },
      { name: 'Lamb Samosa Trio', desc: 'Spiced lamb, mint chutney, tamarind sauce', price: '₹199', badge: 'DESI', badgeColor: '#FF8800' },
      { name: 'Cheese Board Select', desc: 'Brie, gouda, cheddar, crackers, fig jam', price: '₹449', badge: 'SHARING', badgeColor: '#AA55FF' },
    ],
  },
  {
    id: 'desserts',
    label: '🍰 Desserts',
    color: '#FF6699',
    glow: 'rgba(255,102,153,0.22)',
    image: '/assets/images/dishes/desserts.png',
    dishes: [
      { name: 'Chocolate Lava Cake', desc: 'Molten dark chocolate, vanilla ice cream', price: '₹229', badge: 'HOT & COLD', badgeColor: '#7B3F00' },
      { name: 'NY Cheesecake Slice', desc: 'Classic baked cheesecake, berry compote', price: '₹219', badge: 'CLASSIC', badgeColor: '#FF6699' },
      { name: 'Crème Brûlée', desc: 'Vanilla custard, caramelized sugar crust', price: '₹249', badge: 'FRENCH', badgeColor: '#FFD700' },
      { name: 'Sticky Toffee Pud', desc: 'Date pudding, toffee sauce, clotted cream', price: '₹239', badge: 'BRITISH', badgeColor: '#8B4513' },
      { name: 'Mango Sorbet Bowl', desc: 'Alphonso mango sorbet, coconut tuile', price: '₹179', badge: 'VEGAN', badgeColor: '#FFD700' },
      { name: 'Churros & Chocolate', desc: 'Cinnamon churros, dark chocolate dip', price: '₹189', badge: 'SPANISH', badgeColor: '#FF5500' },
      { name: 'Tiramisu Glass', desc: 'Mascarpone, espresso soak, cocoa dust', price: '₹229', badge: 'ITALIAN', badgeColor: '#5C3317' },
      { name: 'Skill Star Brownie', desc: 'Fudgy walnut brownie, caramel swirl', price: '₹199', badge: 'FUDGY', badgeColor: '#7B3F00' },
      { name: 'Mochi Ice Cream', desc: 'Japanese mochi, matcha & strawberry', price: '₹209', badge: 'JAPANESE', badgeColor: '#00CC88' },
      { name: 'Panna Cotta', desc: 'Vanilla panna cotta, raspberry coulis', price: '₹219', badge: 'SILKY', badgeColor: '#FF6699' },
      { name: 'Gulab Jamun Parfait', desc: 'Gulab jamun, rabri, pistachio, rose', price: '₹199', badge: 'DESI FUSION', badgeColor: '#FF8800' },
      { name: 'Peanut Butter Fudge', desc: 'Homemade fudge, roasted peanuts, chocolate', price: '₹169', badge: 'RICH', badgeColor: '#8B4513' },
      { name: 'Waffles & Berries', desc: 'Belgian waffle, fresh berries, maple syrup', price: '₹229', badge: 'BREAKFAST DESSERT', badgeColor: '#FFD700' },
      { name: 'Caramel Popcorn Sundae', desc: 'Vanilla sundae, caramel corn, toffee sauce', price: '₹209', badge: 'FUN', badgeColor: '#FFAA00' },
      { name: 'Skill Star S\'more', desc: 'Toasted marshmallow, dark chocolate, graham', price: '₹189', badge: 'CAMPFIRE', badgeColor: '#FF5500' },
    ],
  },
];

export default function ThirdSection({ onOpenOrderModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNumber, setCurrentFrameNumber] = useState(1);
  const [isFinalSequenceActive, setIsFinalSequenceActive] = useState(false);
  const [showDishReveal, setShowDishReveal] = useState(false);
  const [activeKitchen, setActiveKitchen] = useState('burgers');

  // Lerp & Momentum Inertia Physics State
  const rawTargetFrameRef = useRef(0);
  const lastRawTargetRef = useRef(0);
  const inertiaOffsetRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animLoopIdRef = useRef(null);

  const getFrameUrl = (index) => {
    if (index < SECOND_FRAMES_COUNT) {
      const frameNum = String(index + 1).padStart(3, '0');
      return `/assets/secondframes/ezgif-frame-${frameNum}.png`;
    } else {
      const finalIdx = index - SECOND_FRAMES_COUNT;
      const frameNum = String(finalIdx + 1).padStart(3, '0');
      return `/assets/finalframe/ezgif-frame-${frameNum}.png`;
    }
  };

  // Preload frames (completely skipped on mobile/tablet to save 100% bandwidth since canvas is hidden)
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
      return; // Do not load any third sequence frames on mobile/tablet
    }
    const images = [];
    for (let i = 0; i < COMBINED_TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const idx = Math.max(0, Math.min(COMBINED_TOTAL_FRAMES - 1, Math.round(frameIndex)));
    const img = imagesRef.current[idx];
    if (!img) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;
      if (!imgW || !imgH) return;
      const imgRatio = imgW / imgH;
      const canvasRatio = w / h;
      let drawW, drawH, drawX, drawY;
      if (canvasRatio > imgRatio) {
        drawW = w; drawH = w / imgRatio; drawX = 0; drawY = (h - drawH) / 2;
      } else {
        drawH = h; drawW = h * imgRatio; drawX = (w - drawW) / 2; drawY = 0;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    if (img.complete) { draw(); } else { img.onload = draw; }
  };

  useEffect(() => {
    const renderLoop = () => {
      const velocity = rawTargetFrameRef.current - lastRawTargetRef.current;
      lastRawTargetRef.current = rawTargetFrameRef.current;
      if (Math.abs(velocity) > 0.02) {
        inertiaOffsetRef.current = Math.sign(velocity) * Math.min(30, Math.abs(velocity) * 20);
      } else {
        inertiaOffsetRef.current *= 0.965;
      }
      const effectiveTarget = Math.max(0, Math.min(COMBINED_TOTAL_FRAMES - 1, rawTargetFrameRef.current + inertiaOffsetRef.current));
      const diff = effectiveTarget - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.038;
        drawFrame(currentFrameRef.current);
        const curIdx = Math.round(currentFrameRef.current);
        setCurrentFrameNumber(curIdx + 1);
        setIsFinalSequenceActive(curIdx >= SECOND_FRAMES_COUNT);
        setShowDishReveal(curIdx >= DISH_REVEAL_THRESHOLD);
      }
      animLoopIdRef.current = requestAnimationFrame(renderLoop);
    };
    animLoopIdRef.current = requestAnimationFrame(renderLoop);
    return () => { if (animLoopIdRef.current) cancelAnimationFrame(animLoopIdRef.current); };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const cssW = window.innerWidth;
        const cssH = window.innerHeight;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.width = cssW + 'px';
        canvas.style.height = cssH + 'px';
        drawFrame(currentFrameRef.current);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrollTop = -rect.top;
      const progress = Math.max(0, Math.min(1, scrollTop / scrollableHeight));
      rawTargetFrameRef.current = progress * (COMBINED_TOTAL_FRAMES - 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEnterPortalClick = () => {
    const inlineElem = document.getElementById('portal-dimension');
    if (inlineElem) inlineElem.scrollIntoView({ behavior: 'smooth' });
  };

  const portalScale = 1.35 - scrollProgress * 0.65;
  const currentKitchen = KITCHENS.find(k => k.id === activeKitchen);

  return (
    <div ref={containerRef} class="third-scroll-container">
      <section class="third-wrapper">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          class="third-frame-canvas"
          style={{
            transform: `scale(${portalScale})`,
            transition: 'transform 0.05s linear'
          }}
        />
        <div class="third-edge-blend-overlay"></div>
        <div class="third-overlay-dark"></div>



        <div id="kitchen-menu" class={`kitchen-reveal-overlay ${showDishReveal ? 'kitchen-reveal-visible' : ''}`}>

          {/* Header */}
          <div class="kitchen-reveal-header">
            <div class="kitchen-eyebrow">
              <span class="kitchen-eyebrow-line"></span>
              <span>SKILL STAR KITCHEN</span>
              <span class="kitchen-eyebrow-line"></span>
            </div>
            <h2 class="kitchen-reveal-title">OUR FULL MENU</h2>
          </div>

          {/* Kitchen Filter Tabs */}
          <div class="kitchen-filter-tabs">
            {KITCHENS.map(k => (
              <button
                key={k.id}
                class={`kitchen-tab ${activeKitchen === k.id ? 'kitchen-tab-active' : ''}`}
                style={activeKitchen === k.id ? { borderColor: k.color, color: k.color, boxShadow: `0 0 22px ${k.glow}` } : {}}
                onClick={() => setActiveKitchen(k.id)}
              >
                {k.label}
              </button>
            ))}
          </div>

          {/* Dishes Grid — 15 dishes per kitchen, 5 cols */}
          <div class="kitchen-dishes-grid" key={activeKitchen}>
            {currentKitchen.dishes.map((dish, i) => (
              <div
                key={i}
                class="kdish-card"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div class="kdish-img-wrap">
                  <img src={currentKitchen.image} alt={dish.name} class="kdish-img" />
                  <div class="kdish-img-overlay" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)` }}></div>
                </div>
                <div class="kdish-badge" style={{ background: dish.badgeColor }}>{dish.badge}</div>
                <p class="kdish-name">{dish.name}</p>
                <p class="kdish-desc">{dish.desc}</p>
                <div class="kdish-footer">
                  <span class="kdish-price" style={{ color: currentKitchen.color }}>{dish.price}</span>
                  <button class="kdish-order-btn" style={{ borderColor: currentKitchen.color, color: currentKitchen.color }} onClick={onOpenOrderModal}>
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>


        </div>

        {/* Default content layer — hides when dish reveal shows */}
        <div
          class="third-content-layer"
          style={{
            transform: `scale(${Math.max(0.85, 1 - scrollProgress * 0.25)})`,
            opacity: showDishReveal ? 0 : (scrollProgress > 0.88 ? 0 : 1),
            transition: 'opacity 0.4s ease, transform 0.1s linear',
            pointerEvents: showDishReveal ? 'none' : 'auto'
          }}
        >
          <div class="eyebrow-tag">
            <span class="eyebrow-line"></span>
            <span>{isFinalSequenceActive ? 'THE GRAND REVEAL' : 'WATCH IT GET SMASHED'}</span>
            <span class="eyebrow-line"></span>
          </div>
          <h2 class="third-main-title">
            {isFinalSequenceActive ? 'YOUR MEAL IS ALMOST READY' : 'FRESH BEEF. HOT IRON. MAGIC.'}
          </h2>
          <p class="third-main-desc">
            {isFinalSequenceActive
              ? 'Juicy, golden, stacked sky-high. The final craft build is moments away.'
              : 'Witness every glorious smash, sizzle, and cheese pull — frame by frame.'}
          </p>
          <button class="btn-portal-enter" onClick={handleEnterPortalClick}>
            <i class="fa-solid fa-utensils pulse-atom-icon"></i>
            <span>SEE THE FULL MENU</span>
            <i class="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </section>

      <InlinePortalPage onOpenOrderModal={onOpenOrderModal} />
    </div>
  );
}
