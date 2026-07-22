import React, { useState, useEffect, useRef } from 'react';
import { THEMES } from '../data/products';

export default function ThemeMenu({ activeTheme, onSelectTheme, onShowToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (theme) => {
    onSelectTheme(theme.id);
    setIsOpen(false);
    onShowToast(`Switched color mood to ${theme.label}`);
  };

  return (
    <div class="theme-dropdown-wrapper" ref={menuRef}>
      <button 
        class="nav-icon-btn theme-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)} 
        title="Customize Color Mood"
      >
        <span class="theme-swatch"></span>
        <i class="fa-solid fa-palette"></i>
      </button>

      {isOpen && (
        <div class="theme-menu active">
          <div class="theme-menu-title">Select Color Mood</div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              class={`theme-option ${activeTheme === t.id ? 'active' : ''}`}
              onClick={() => handleThemeChange(t)}
            >
              <span class={`swatch ${t.swatchClass}`}></span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
