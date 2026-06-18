import './InfoBanner.css'

export default function InfoBanner() {
  return (
    <section className="info-banner">
      <div className="info-banner__inner">
        <div className="info-banner__promo">
          <span className="info-banner__promo-badge">🎉 NOVITÀ</span>
          <p className="info-banner__promo-text">
            Ordina online, scegli <strong>asporto o consegna</strong> e paga come preferisci — online o alla consegna.
          </p>
          <a href="#menu-full" className="info-banner__promo-btn">Vai al menù</a>
        </div>

        <div className="info-banner__features">
          <div className="info-banner__feat">
            <span className="info-banner__feat-icon">⚡</span>
            <div>
              <div className="info-banner__feat-title">Veloce</div>
              <div className="info-banner__feat-sub">Pronto in 20–30 min</div>
            </div>
          </div>
          <div className="info-banner__feat">
            <span className="info-banner__feat-icon">🥙</span>
            <div>
              <div className="info-banner__feat-title">Fresco</div>
              <div className="info-banner__feat-sub">Carne halal ogni giorno</div>
            </div>
          </div>
          <div className="info-banner__feat">
            <span className="info-banner__feat-icon">🌱</span>
            <div>
              <div className="info-banner__feat-title">Vegano</div>
              <div className="info-banner__feat-sub">Opzioni falafel disponibili</div>
            </div>
          </div>
          <div className="info-banner__feat">
            <span className="info-banner__feat-icon">💳</span>
            <div>
              <div className="info-banner__feat-title">Pagamento</div>
              <div className="info-banner__feat-sub">Online o alla consegna</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
