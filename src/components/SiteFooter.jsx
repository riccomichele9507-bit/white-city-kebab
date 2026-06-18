import './SiteFooter.css'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">

        <div className="site-footer__brand">
          <div className="site-footer__logo">
            <span>🥙</span>
            <span className="site-footer__logo-name">White City Kebab</span>
          </div>
          <p className="site-footer__tagline">
            Il gusto autentico del Medio Oriente nel cuore della Città Bianca di Ostuni.
            Carne halal fresca, falafel vegetali, biryani aromatico.
          </p>
          <div className="site-footer__badges">
            <span>🥙 Halal</span>
            <span>🌱 Vegan options</span>
            <span>🚗 Solo asporto</span>
          </div>
        </div>

        <div className="site-footer__links">
          <h4 className="site-footer__links-title">Menù</h4>
          <ul>
            <li><a href="#menu-cat-menu-combinati">Menù Combinati</a></li>
            <li><a href="#menu-cat-kebab">Kebab</a></li>
            <li><a href="#menu-cat-biryani">Biryani</a></li>
            <li><a href="#menu-cat-panini">Panini & Hot Dog</a></li>
            <li><a href="#menu-cat-fritti">Fritti</a></li>
            <li><a href="#menu-cat-bevande">Bevande</a></li>
            <li><a href="#menu-cat-birre">Birre</a></li>
          </ul>
        </div>

        <div className="site-footer__links">
          <h4 className="site-footer__links-title">Informazioni</h4>
          <ul>
            <li>
              <a href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR" target="_blank" rel="noopener noreferrer">
                Via Ferrara, 4 — Ostuni (BR)
              </a>
            </li>
            <li><a href="tel:+39XXXXXXXXXX">📞 Telefono</a></li>
            <li><a href="https://wa.me/393200000000" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
          </ul>
        </div>

      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} White City Kebab — Via Ferrara, 4 · 72017 Ostuni (BR)</p>
        <div className="site-footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Allergeni</a>
        </div>
      </div>
    </footer>
  )
}
