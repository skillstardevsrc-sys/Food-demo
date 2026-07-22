import React from 'react';

export default function VideoModal({ isOpen, onClose }) {
  return (
    <div 
      class={`modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div class="video-modal-card">
        <button class="close-modal-btn" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
        <div class="video-placeholder">
          <div class="video-overlay-content">
            <div class="play-circle"><i class="fa-solid fa-play"></i></div>
            <h3>The 3-Step Morning Radiance Ritual</h3>
            <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
              Learn how to layer our Luminous Vit-C Serum & Velvet Cream for maximum botanical absorption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
