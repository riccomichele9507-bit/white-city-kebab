import { useState, useEffect } from 'react'
import './Header.css'

export default function Header({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'site-header--stuck' : ''}`}>
      <div className="site-header__inner">

        <a href="/" className="site-header__logo" aria-label="White City Kebab — Home">
          <div className="site-header__logo-mark"><span>🥙</span></div>
          <div className="site-header__logo-text">
            <span className="site-header__logo-name">White City Kebab</span>
            <span className="site-header__logo-location">Ostuni, Puglia</span>
          </div>
        </a>

        <nav className="site-header__nav" aria-label="Menu principale">
          <a href="#menu-full" className="site-header__nav-link">Menù</a>
          <a href="#info-section" className="site-header__nav-link">Dove siamo</a>
          <a href="#info-section" className="site-header__nav-link">Contatti</a>
        </nav>

        <button className="site-header__cart" onClick={onCartOpen} aria-label={`Carrello — ${cartCount} articoli`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
          {cartCount > 0 && <span className="site-header__cart-badge" key={cartCount}>{cartCount}</span>}
          {cartCount > 0 && <span className="site-header__cart-label">Il mio ordine</span>}
        </button>

      </div>
    </header>
  )
}
