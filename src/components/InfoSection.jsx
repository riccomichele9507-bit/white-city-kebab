import './InfoSection.css'

const HOURS = [
  { days: 'Lunedì – Venerdì', time: '12:00 – 15:00 · 18:00 – 23:00' },
  { days: 'Sabato',            time: '12:00 – 23:30' },
  { days: 'Domenica',          time: '13:00 – 23:00' },
]

export default function InfoSection() {
  return (
    <section id="info-section" className="info-sec">
      <div className="info-sec__inner">

        {/* Map embed placeholder */}
        <div className="info-sec__map">
          <a
            href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR"
            target="_blank"
            rel="noopener noreferrer"
            className="info-sec__map-link"
            aria-label="Apri mappa Google"
          >
            <div className="info-sec__map-bg">
              <div className="info-sec__map-pin">📍</div>
              <p className="info-sec__map-label">Via Ferrara, 4<br />Ostuni (BR)</p>
              <span className="info-sec__map-cta">
                Apri su Google Maps
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </span>
            </div>
          </a>
        </div>

        {/* Info cards */}
        <div className="info-sec__cards">

          <div className="info-card">
            <div className="info-card__icon">📍</div>
            <div className="info-card__body">
              <h3 className="info-card__title">Dove siamo</h3>
              <p className="info-card__text">Via Ferrara, 4<br />72017 Ostuni (BR), Puglia</p>
              <a
                href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR"
                target="_blank"
                rel="noopener noreferrer"
                className="info-card__link"
              >
                Ottieni indicazioni →
              </a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card__icon">🕐</div>
            <div className="info-card__body">
              <h3 className="info-card__title">Orari di apertura</h3>
              <ul className="info-card__hours">
                {HOURS.map(h => (
                  <li key={h.days}>
                    <span className="info-card__hours-day">{h.days}</span>
                    <span className="info-card__hours-time">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card__icon">💬</div>
            <div className="info-card__body">
              <h3 className="info-card__title">Contatti</h3>
              <p className="info-card__text">Per informazioni su orari, allergeni o domande sull'ordine, contattaci telefonicamente.</p>
              <div className="info-card__contacts">
                <a href="tel:+39XXXXXXXXXX" className="info-card__contact-btn">
                  📞 Chiama
                </a>
                <a href="mailto:info@whitecitykebab.it" className="info-card__contact-btn">
                  ✉️ Email
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
