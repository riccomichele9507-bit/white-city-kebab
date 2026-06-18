import { useEffect, useRef } from 'react'
import './Cart.css'

export default function Cart({ open, items, total, onClose, onUpdate, onRemove, onCheckout }) {
  const panelRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Focus trap
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus()
    }
  }, [open])

  const isEmpty = items.length === 0

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${open ? 'cart-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`cart-panel ${open ? 'cart-panel--open' : ''}`}
        role="dialog"
        aria-label="Carrello"
        aria-modal="true"
        ref={panelRef}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="cart-panel__header">
          <div className="cart-panel__title-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
            </svg>
            <h2 className="cart-panel__title">Il tuo ordine</h2>
            {items.length > 0 && (
              <span className="cart-panel__count">{items.reduce((s,i) => s + i.qty, 0)}</span>
            )}
          </div>
          <button className="cart-panel__close" onClick={onClose} aria-label="Chiudi carrello">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart-panel__body">
          {isEmpty ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛒</div>
              <p className="cart-empty__title">Il carrello è vuoto</p>
              <p className="cart-empty__sub">Aggiungi qualcosa dal menù!</p>
              <button className="cart-empty__browse" onClick={onClose}>
                Sfoglia il menù
              </button>
            </div>
          ) : (
            <ul className="cart-items" role="list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.name}</span>
                    <span className="cart-item__unit">€{item.price.toFixed(2)} cad.</span>
                  </div>
                  <div className="cart-item__actions">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => onUpdate(item.id, -1)}
                      aria-label={`Rimuovi un ${item.name}`}
                    >−</button>
                    <span className="cart-item__qty">{item.qty}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => onUpdate(item.id, 1)}
                      aria-label={`Aggiungi un ${item.name}`}
                    >+</button>
                    <span className="cart-item__line-total">
                      €{(item.price * item.qty).toFixed(2)}
                    </span>
                    <button
                      className="cart-item__remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Elimina ${item.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="cart-panel__footer">
            <div className="cart-total">
              <span className="cart-total__label">Totale ordine</span>
              <span className="cart-total__value">€{total.toFixed(2)}</span>
            </div>
            <p className="cart-panel__note">
              🕐 Ordine pronto in circa 15–25 min
            </p>
            <button className="cart-checkout-btn" onClick={onCheckout}>
              <span>Procedi con l'ordine</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
