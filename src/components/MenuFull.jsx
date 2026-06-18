import { useState, useEffect, useRef } from 'react'
import './MenuFull.css'

/* ——— Menu Item Card ——— */
function ItemCard({ item, onAdd, inCart }) {
  const fallbacks = {
    'mc': '/images/kebab.png',
    'k':  '/images/kebab.png',
    'b':  '/images/biryani.png',
    'p':  '/images/panini.png',
    'i':  '/images/falafel.png',
    'f':  '/images/fritti.png',
  }
  const prefix = item.id.split('-')[0]
  const img = item.image || fallbacks[prefix] || null

  return (
    <article className="item-card">
      {img && (
        <div className="item-card__img-wrap">
          <img src={img} alt={item.name} className="item-card__img" loading="lazy" />
        </div>
      )}
      <div className="item-card__body">
        <div className="item-card__top">
          {item.tag && <span className="item-card__tag">{item.tag}</span>}
          <h4 className="item-card__name">{item.name}</h4>
          {item.description && <p className="item-card__desc">{item.description}</p>}
        </div>
        <div className="item-card__foot">
          <span className="item-card__price">{item.priceLabel ?? `€${item.price.toFixed(2)}`}</span>
          <button
            className={`item-card__add ${inCart ? 'item-card__add--active' : ''}`}
            onClick={() => onAdd(item)}
            aria-label={`Aggiungi ${item.name}`}
          >
            {inCart ? (
              <><span className="item-card__add-check">✓</span> ×{inCart.qty}</>
            ) : (
              <><span className="item-card__add-plus">+</span> Aggiungi</>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

/* ——— Drink Row ——— */
function DrinkRow({ item, onAdd, inCart }) {
  return (
    <div className="drink-row">
      <div className="drink-row__info">
        <span className="drink-row__name">{item.name}</span>
        {item.description && <span className="drink-row__desc"> · {item.description}</span>}
        {item.tag && <span className="drink-row__tag">{item.tag}</span>}
      </div>
      <div className="drink-row__right">
        <span className="drink-row__price">€{item.price.toFixed(2)}</span>
        <button
          className={`drink-row__btn ${inCart ? 'drink-row__btn--active' : ''}`}
          onClick={() => onAdd(item)}
          aria-label={`Aggiungi ${item.name}`}
        >
          {inCart ? `×${inCart.qty}` : '+'}
        </button>
      </div>
    </div>
  )
}

/* ——— Main Component ——— */
export default function MenuFull({ categories, menuData, cart, onAdd }) {
  const [activeId, setActiveId] = useState(categories[0]?.id)
  const navRef    = useRef(null)
  const sectRefs  = useRef({})

  // Intersection observer — highlight active category in sticky nav
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.dataset.catid)
        })
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    )

    Object.values(sectRefs.current).forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const scrollToCategory = (id) => {
    const el = document.getElementById(`menu-cat-${id}`)
    if (el) {
      const offset = 130
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setActiveId(id)
  }

  return (
    <section id="menu-full" className="menu-full">

      {/* Sticky category nav */}
      <div className="menu-nav" role="navigation" aria-label="Categorie menù">
        <div className="menu-nav__inner" ref={navRef}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`menu-nav__pill ${activeId === cat.id ? 'menu-nav__pill--active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
              aria-current={activeId === cat.id ? 'true' : undefined}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* All menu sections */}
      <div className="menu-full__body">
        <div className="menu-full__inner">
          {categories.map(cat => {
            const data = menuData[cat.id]
            if (!data) return null
            const isDrinks = ['bevande', 'birre'].includes(cat.id)

            return (
              <div
                key={cat.id}
                id={`menu-cat-${cat.id}`}
                data-catid={cat.id}
                ref={el => sectRefs.current[cat.id] = el}
                className="menu-cat"
              >
                {/* Section header */}
                <div className="menu-cat__header">
                  <span className="menu-cat__emoji">{cat.emoji}</span>
                  <div>
                    <h2 className="menu-cat__title">{data.title}</h2>
                    {data.subtitle && <p className="menu-cat__sub">{data.subtitle}</p>}
                  </div>
                  {data.ageWarning && (
                    <span className="menu-cat__age">🔞 +18</span>
                  )}
                </div>

                {isDrinks ? (
                  <div className="menu-cat__drinks">
                    {data.items.map(item => (
                      <DrinkRow
                        key={item.id}
                        item={item}
                        onAdd={onAdd}
                        inCart={cart.find(i => i.id === item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="menu-cat__grid">
                    {data.items.map(item => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onAdd={onAdd}
                        inCart={cart.find(i => i.id === item.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
