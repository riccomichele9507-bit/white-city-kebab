import { useEffect, useRef, useState } from 'react'
import MenuCard from './MenuCard'
import './MenuSection.css'

export default function MenuSection({ category, data, isActive, onAddToCart, cartItems }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { rootMargin: '-80px 0px -80px 0px', threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const isBeveragesOrBeer = ['bevande', 'birre'].includes(category.id)

  return (
    <section
      id={`cat-${category.id}`}
      ref={sectionRef}
      className={`menu-section ${visible ? 'menu-section--visible' : ''}`}
      aria-labelledby={`cat-title-${category.id}`}
    >
      <div className="menu-section__inner">

        {/* Section Header */}
        <div className="menu-section__header">
          <div className="menu-section__header-left">
            <span className="menu-section__emoji" aria-hidden="true">{category.emoji}</span>
            <div>
              <h2
                className="menu-section__title"
                id={`cat-title-${category.id}`}
              >
                {data.title}
              </h2>
              {data.subtitle && (
                <p className="menu-section__subtitle">{data.subtitle}</p>
              )}
            </div>
          </div>
          {data.ageWarning && (
            <div className="menu-section__age-warning" role="note">
              🔞 Solo maggiorenni
            </div>
          )}
        </div>

        {/* Menu Grid */}
        {isBeveragesOrBeer ? (
          <div className="menu-section__drinks-grid">
            {data.items.map((item, i) => (
              <DrinkRow
                key={item.id}
                item={item}
                delay={i * 40}
                onAdd={onAddToCart}
                cartItems={cartItems}
              />
            ))}
          </div>
        ) : (
          <div className="menu-section__grid">
            {data.items.map((item, i) => (
              <MenuCard
                key={item.id}
                item={item}
                delay={i * 60}
                onAdd={onAddToCart}
                cartItems={cartItems}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function DrinkRow({ item, delay, onAdd, cartItems }) {
  const inCart = cartItems.find(i => i.id === item.id)

  return (
    <div className="drink-row" style={{ animationDelay: `${delay}ms` }}>
      <div className="drink-row__info">
        <span className="drink-row__name">{item.name}</span>
        {item.description && (
          <span className="drink-row__desc">{item.description}</span>
        )}
        {item.tag && <span className="drink-row__tag">{item.tag}</span>}
      </div>
      <div className="drink-row__right">
        <span className="drink-row__price">€{item.price.toFixed(2)}</span>
        <button
          className={`drink-row__btn ${inCart ? 'drink-row__btn--in-cart' : ''}`}
          onClick={() => onAdd(item)}
          aria-label={`Aggiungi ${item.name} al carrello`}
        >
          {inCart ? `×${inCart.qty}` : '+'}
        </button>
      </div>
    </div>
  )
}
