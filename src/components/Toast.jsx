import React from 'react';

export default function Toast({ message, show }) {
  return (
    <div class={`toast ${show ? 'show' : ''}`}>
      <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
      <div class="toast-text">{message}</div>
    </div>
  );
}
