import React from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div 
      class={`cart-drawer-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div class="cart-drawer">
        <div class="drawer-header">
          <h3><i class="fa-solid fa-bag-shopping"></i> Your EBTY Bag</h3>
          <button class="close-drawer-btn" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="free-shipping-tracker">
          <p>You unlocked <strong>FREE EXPRESS SHIPPING</strong>! <i class="fa-solid fa-truck-fast"></i></p>
          <div class="progress-bar"><div class="progress-fill" style={{ width: '100%' }}></div></div>
        </div>

        <div class="drawer-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <i class="fa-solid fa-basket-shopping" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
              Your bag is currently empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} class="cart-item">
                <div class="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div class="cart-item-details">
                  <strong>{item.name}</strong>
                  <span>${item.price} USD</span>
                  <div class="qty-controls">
                    <button class="qty-btn" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button class="qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                  ${item.price * item.qty}
                </strong>
              </div>
            ))
          )}
        </div>

        <div class="drawer-footer">
          <div class="subtotal-row">
            <span>Subtotal</span>
            <strong>${subtotal}.00</strong>
          </div>
          <p class="taxes-note">Taxes and shipping calculated at checkout</p>
          <button class="checkout-btn">
            <span>Proceed to Checkout</span>
            <i class="fa-solid fa-lock"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
