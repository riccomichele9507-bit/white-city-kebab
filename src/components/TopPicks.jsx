import './TopPicks.css'

const PICKS = [
  {
    id: 'mc-5',
    name: 'Menù Panino Kebab',
    description: 'Il classico panino kebab con patatine fritte e bibita. Il più richiesto!',
    price: 11.00,
    image: '/images/kebab.png',
    badge: '⭐ Il più richiesto',
    rating: 4.9,
    orders: '200+ ordini',
  },
  {
    id: 'mc-10',
    name: 'Menù Piadina Grande',
    description: 'La nostra piadina kebab XL con patatine fritte e bibita — per chi ha fame!',
    price: 17.00,
    image: '/images/kebab.png',
    badge: '🔥 Maxi formato',
    rating: 4.8,
    orders: '150+ ordini',
  },
  {
    id: 'mc-3',
    name: 'Menù Falafel',
    description: 'Panino con polpette di ceci vegetali, patatine fritte e bibita. Opzione vegan.',
    price: 8.50,
    image: '/images/falafel.png',
    badge: '🌱 Vegan',
    rating: 4.7,
    orders: '120+ ordini',
  },
]

export default function TopPicks({ onAdd, cart }) {
  return (
    <section className="top-picks">
      <div className="top-picks__inner">
        <div className="top-picks__head">
          <div>
            <h2 className="top-picks__title">I più amati</h2>
            <p className="top-picks__sub">I piatti scelti più spesso dai nostri clienti</p>
          </div>
          <a href="#menu-full" className="top-picks__see-all">
            Vedi tutto il menù
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        <div className="top-picks__grid">
          {PICKS.map((item, idx) => {
            const inCart = cart.find(i => i.id === item.id)
            return (
              <article key={item.id} className="pick-card" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="pick-card__img-wrap">
                  <img src={item.image} alt={item.name} className="pick-card__img" loading="lazy" />
                  <span className="pick-card__badge">{item.badge}</span>
                  <div className="pick-card__rank">#{idx + 1}</div>
                </div>
                <div className="pick-card__body">
                  <div className="pick-card__meta">
                    <span className="pick-card__rating">★ {item.rating}</span>
                    <span className="pick-card__orders">{item.orders}</span>
                  </div>
                  <h3 className="pick-card__name">{item.name}</h3>
                  <p className="pick-card__desc">{item.description}</p>
                  <div className="pick-card__footer">
                    <span className="pick-card__price">€{item.price.toFixed(2)}</span>
                    <button
                      className={`pick-card__btn ${inCart ? 'pick-card__btn--active' : ''}`}
                      onClick={() => onAdd(item)}
                      aria-label={`Aggiungi ${item.name}`}
                    >
                      {inCart ? `✓ ×${inCart.qty}` : 'Aggiungi'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
