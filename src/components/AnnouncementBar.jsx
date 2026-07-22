import React, { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div class="announcement-bar" id="announcementBar">
      <div class="announcement-content">
        <span><i class="fa-solid fa-sparkles"></i> Complimenting Deluxe Sample + Free Express Shipping on orders over $60</span>
        <span class="announcement-divider">•</span>
        <span>100% Vegan & Cruelty-Free Formulations</span>
        <span class="announcement-divider">•</span>
        <span><i class="fa-solid fa-leaf"></i> Sustainably Sourced Botanicals</span>
      </div>
      <button 
        class="close-bar-btn" 
        onClick={() => setVisible(false)} 
        aria-label="Close Announcement"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
