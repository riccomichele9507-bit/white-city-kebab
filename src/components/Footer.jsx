import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">🥙</span>
            <span className="footer__logo-name">White City Kebab</span>
          </div>
          <p className="footer__tagline">
            Il gusto autentico del Medio Oriente<br />
            nel cuore della Città Bianca di Ostuni
          </p>
        </div>

        {/* Info */}
        <div className="footer__info">
          <h3 className="footer__info-title">Dove siamo</h3>
          <ul className="footer__info-list">
            <li>
              <span className="footer__info-icon">📍</span>
              <a
                href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR"
                target="_blank"
                rel="noopener noreferrer"
              >
                Via Ferrara, 4 — 72017 Ostuni (BR)
              </a>
            </li>
            <li>
              <span className="footer__info-icon">📞</span>
              <a href="tel:+390831000000">Chiama per ordinare</a>
            </li>
            <li>
              <span className="footer__info-icon">💬</span>
              <a
                href="https://wa.me/393200000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="footer__hours">
          <h3 className="footer__info-title">Orari</h3>
          <ul className="footer__hours-list">
            <li>
              <span>Lun – Ven</span>
              <span>12:00 – 15:00, 18:00 – 23:00</span>
            </li>
            <li>
              <span>Sabato</span>
              <span>12:00 – 23:30</span>
            </li>
            <li>
              <span>Domenica</span>
              <span>13:00 – 23:00</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {year} White City Kebab — Via Ferrara, 4 — Ostuni (BR)</p>
        <div className="footer__bottom-badges">
          <span>🥙 Carne halal</span>
          <span>🌱 Opzioni vegane</span>
          <span>🚗 Solo asporto</span>
        </div>
      </div>
    </footer>
  )
}
