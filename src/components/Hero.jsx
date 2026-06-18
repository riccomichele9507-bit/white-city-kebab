import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero({ onOrder }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)) }, [])

  return (
    <section className="hero">
      <div className="hero__img-wrap">
        <img
          src="/images/hero.png"
          alt="Doner kebab su spiedo"
          className="hero__img"
          fetchpriority="high"
        />
        <div className="hero__img-overlay" />
      </div>

      <div className={`hero__body ${loaded ? 'hero__body--in' : ''}`}>
        <div className="hero__content">
          <div className="hero__label">
            <span className="hero__dot" />
            Solo asporto · Ostuni (BR)
          </div>

          <h1 className="hero__title">
            Il Kebab<br />
            <em>più amato</em><br />
            di Ostuni
          </h1>

          <p className="hero__sub">
            Carne fresca sul spiedo, falafels vegetali, biryani aromatico.<br />
            Preparato al momento, pronto in <strong>20 minuti</strong>.
          </p>

          <div className="hero__cta">
            <button className="hero__btn hero__btn--primary" onClick={onOrder}>
              Ordina ora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a href="#info-section" className="hero__btn hero__btn--ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Dove siamo
            </a>
          </div>
        </div>

        {/* Floating info card */}
        <div className="hero__card">
          <div className="hero__card-row">
            <span className="hero__card-icon">🕐</span>
            <div>
              <div className="hero__card-label">Tempo attesa</div>
              <div className="hero__card-value">20–30 min</div>
            </div>
          </div>
          <div className="hero__card-divider" />
          <div className="hero__card-row">
            <span className="hero__card-icon">📍</span>
            <div>
              <div className="hero__card-label">Indirizzo</div>
              <div className="hero__card-value">Via Ferrara, 4</div>
            </div>
          </div>
          <div className="hero__card-divider" />
          <div className="hero__card-row">
            <span className="hero__card-icon">🥙</span>
            <div>
              <div className="hero__card-label">Carne</div>
              <div className="hero__card-value">Halal, fresca</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
