import React from 'react';

export default function Footer({ onOpenOrderModal }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Our Menu', href: '#' },
    { label: 'Locations', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ];

  return (
    <footer class="site-footer">
      {/* Top CTA Banner */}
      <div class="footer-cta-strip">
        <div class="footer-cta-content">
          <h3 class="footer-cta-title">CRAVING A SMASH BURGER RIGHT NOW?</h3>
          <p class="footer-cta-sub">Fresh, hot, delivered to your door in under 20 minutes.</p>
        </div>
        <button class="footer-cta-btn" onClick={onOpenOrderModal}>
          <span>ORDER NOW</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      {/* Main Footer Grid */}
      <div class="footer-main">
        <div class="footer-grid">

          {/* Brand Column */}
          <div class="footer-col footer-brand-col">
            <div class="footer-logo">
              <span class="footer-logo-icon">🍔</span>
              <span class="footer-logo-text">SKILL STAR BURGS</span>
            </div>
            <p class="footer-brand-desc">
              Hand-smashed, never frozen, always bold. Chennai's finest craft burger kitchen since 2024.
            </p>
            <div class="footer-socials">
              <a href="#" class="footer-social-link" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#" class="footer-social-link" aria-label="Twitter / X">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" class="footer-social-link" aria-label="YouTube">
                <i class="fa-brands fa-youtube"></i>
              </a>
              <a href="#" class="footer-social-link" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div class="footer-col">
            <h4 class="footer-col-title">QUICK LINKS</h4>
            <ul class="footer-link-list">
              {quickLinks.map((link, i) => (
                <li key={i}><a href={link.href} class="footer-link">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div class="footer-col">
            <h4 class="footer-col-title">REACH US</h4>
            <ul class="footer-link-list footer-contact-list">
              <li>
                <i class="fa-solid fa-location-dot footer-contact-icon"></i>
                <span>12, Anna Nagar Main Road, Chennai 600040</span>
              </li>
              <li>
                <i class="fa-solid fa-phone footer-contact-icon"></i>
                <span>+91 98765 43210</span>
              </li>
              <li>
                <i class="fa-solid fa-envelope footer-contact-icon"></i>
                <span>eat@skillstarburgs.in</span>
              </li>
              <li>
                <i class="fa-solid fa-clock footer-contact-icon"></i>
                <span>11 AM – 11 PM, Every Day</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div class="footer-col">
            <h4 class="footer-col-title">GET EXCLUSIVE DEALS</h4>
            <p class="footer-newsletter-desc">Subscribe & get ₹100 off your first smash order.</p>
            <div class="footer-newsletter-form">
              <input type="email" placeholder="Enter your email" class="footer-email-input" />
              <button class="footer-subscribe-btn">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copyright">© {currentYear} Skill Star Burgs. All rights reserved.</p>
          <div class="footer-legal-links">
            {legalLinks.map((link, i) => (
              <a key={i} href={link.href} class="footer-legal-link">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
