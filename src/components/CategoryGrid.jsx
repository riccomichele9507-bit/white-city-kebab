import './CategoryGrid.css'

const TILES = [
  { id: 'menu-combinati', label: 'Menù Combinati', emoji: '🍽️', img: '/images/kebab.png', sub: 'Pasto completo' },
  { id: 'kebab',         label: 'Kebab',          emoji: '🥙', img: '/images/kebab.png',  sub: 'Classici & piadine' },
  { id: 'biryani',       label: 'Biryani',         emoji: '🍛', img: '/images/biryani.png', sub: 'Riso aromatico' },
  { id: 'panini',        label: 'Panini & Hot Dog', emoji: '🌭', img: '/images/panini.png', sub: 'Veloci e gustosi' },
  { id: 'fritti',        label: 'Fritti',           emoji: '🍟', img: '/images/fritti.png', sub: 'Croccanti e dorati' },
  { id: 'insalate',      label: 'Insalate',         emoji: '🥗', img: '/images/falafel.png', sub: 'Leggere e fresche' },
  { id: 'bevande',       label: 'Bevande',          emoji: '🥤', img: null,                  sub: 'Bibite & energy' },
  { id: 'birre',         label: 'Birre',             emoji: '🍺', img: null,                  sub: '+18 · Solo maggiorenni' },
]

export default function CategoryGrid({ onCategory }) {
  return (
    <section className="cat-grid">
      <div className="cat-grid__inner">
        <div className="cat-grid__head">
          <h2 className="cat-grid__title">Esplora il Menù</h2>
          <p className="cat-grid__sub">Scegli la categoria e ordina ciò che preferisci</p>
        </div>

        <div className="cat-grid__grid">
          {TILES.map((tile, i) => (
            <button
              key={tile.id}
              className="cat-tile"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => onCategory(tile.id)}
              aria-label={`Vai a ${tile.label}`}
            >
              {tile.img ? (
                <div className="cat-tile__img-wrap">
                  <img src={tile.img} alt={tile.label} className="cat-tile__img" loading="lazy" />
                  <div className="cat-tile__overlay" />
                </div>
              ) : (
                <div className="cat-tile__color-wrap">
                  <span className="cat-tile__emoji-big">{tile.emoji}</span>
                </div>
              )}
              <div className="cat-tile__body">
                <span className="cat-tile__emoji">{tile.emoji}</span>
                <div>
                  <div className="cat-tile__label">{tile.label}</div>
                  <div className="cat-tile__sub">{tile.sub}</div>
                </div>
                <svg className="cat-tile__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
