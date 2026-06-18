import { useState } from 'react'
import './MenuCard.css'

const CATEGORY_FALLBACKS = {
  'mc': '/images/kebab.png',
  'k': '/images/kebab.png',
  'b': '/images/biryani.png',
  'p': '/images/kebab.png',
  'i': '/images/falafel.png',
  'f': '/images/fritti.png',
  'bev': null,
  'bir': null,
}

function getFallback(id) {
  const prefix = id.split('-')[0]
  return CATEGORY_FALLBACKS[prefix] ?? '/images/kebab.png'
}

export default function MenuCard({ item, delay = 0, onAdd, cartItems }) {
  const [imgError, setImgError] = useState(false)
  const inCart = cartItems.find(i => i.id === item.id)

  const imgSrc = !imgError && item.image ? item.image : getFallback(item.id)
  const hasImage = !!imgSrc

  const handleAdd = () => {
    onAdd(item)
    // Mini bounce animation on button
  }

  return (
    <article
      className="menu-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      {hasImage && (
        <div className="menu-card__img-wrap">
          <img
            src={imgSrc}
            alt={item.name}
            className="menu-card__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {item.tag && (
            <span className="menu-card__tag">{item.tag}</span>
          )}
          {inCart && (
            <div className="menu-card__in-cart-badge">×{inCart.qty}</div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="menu-card__body">
        {!hasImage && item.tag && (
          <span className="menu-card__tag menu-card__tag--inline">{item.tag}</span>
        )}
        <h3 className="menu-card__name">{item.name}</h3>
        {item.description && (
          <p className="menu-card__desc">{item.description}</p>
        )}
        <div className="menu-card__footer">
          <span className="menu-card__price">
            {item.priceLabel ?? `€${item.price.toFixed(2)}`}
          </span>
          <button
            className={`menu-card__btn ${inCart ? 'menu-card__btn--active' : ''}`}
            onClick={handleAdd}
            aria-label={`Aggiungi ${item.name} al carrello`}
          >
            {inCart ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>×{inCart.qty}</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Aggiungi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
