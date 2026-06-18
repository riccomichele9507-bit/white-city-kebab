import { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero({ onOrderNow }) {
  const heroRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  // Parallax effect on scroll
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onScroll = () => {
      const y = window.scrollY
      const img = hero.querySelector('.hero__bg-img')
      if (img) img.style.transform = `translateY(${y * 0.3}px) scale(1.1)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="Benvenuto al White City Kebab">
      {/* Background */}
      <div className="hero__bg">
        <img
          className={`hero__bg-img ${imgLoaded ? 'hero__bg-img--loaded' : ''}`}
          src="/images/hero.png"
          alt="Doner kebab spit"
          onLoad={() => setImgLoaded(true)}
          fetchpriority="high"
        />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-gradient" />
      </div>

      {/* Floating decorative elements */}
      <div className="hero__deco hero__deco--1" aria-hidden="true">🌶️</div>
      <div className="hero__deco hero__deco--2" aria-hidden="true">🫒</div>
      <div className="hero__deco hero__deco--3" aria-hidden="true">🧅</div>

      {/* Content */}
      <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>

        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Asporto disponibile ora
        </div>

        <h1 className="hero__title">
          <span className="hero__title-top">White City</span>
          <span className="hero__title-main">Kebab</span>
          <span className="hero__title-city">
            <span className="hero__title-line" aria-hidden="true" />
            Ostuni
            <span className="hero__title-line" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero__tagline">
          Il gusto autentico del Medio Oriente<br />
          <em>nel cuore della Città Bianca</em>
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={onOrderNow}>
            <span>Ordina ora</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

          <a
            href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Via Ferrara, 4</span>
          </a>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">30+</span>
            <span className="hero__stat-label">Voci di menù</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-number">🥙</span>
            <span className="hero__stat-label">Carne fresca</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-number">Vegan</span>
            <span className="hero__stat-label">Opzioni veg</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scopri il menù</span>
      </div>
    </section>
  )
}
