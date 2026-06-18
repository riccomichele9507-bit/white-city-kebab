import { useState, useEffect } from 'react'
import './Header.css'

export default function Header({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">

        {/* Logo */}
        <div className="header__logo">
          <div className="header__logo-icon">
            <span>🥙</span>
          </div>
          <div className="header__logo-text">
            <span className="header__logo-name">White City</span>
            <span className="header__logo-sub">Kebab · Ostuni</span>
          </div>
        </div>

        {/* Nav links — desktop only */}
        <nav className="header__nav" aria-label="Navigazione principale">
          <a href="tel:+390831000000" className="header__nav-link header__nav-link--phone">
            <span className="header__nav-link-icon">📞</span>
            Chiama
          </a>
          <a
            href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni"
            target="_blank"
            rel="noopener noreferrer"
            className="header__nav-link"
          >
            <span className="header__nav-link-icon">📍</span>
            Via Ferrara, 4
          </a>
        </nav>

        {/* Cart button */}
        <button
          className="header__cart"
          onClick={onCartOpen}
          aria-label={`Carrello — ${cartCount} articoli`}
        >
          <div className="header__cart-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="header__cart-badge" key={cartCount}>
                {cartCount}
              </span>
            )}
          </div>
          {cartCount > 0 && (
            <span className="header__cart-label">Il mio ordine</span>
          )}
        </button>
      </div>
    </header>
  )
}
