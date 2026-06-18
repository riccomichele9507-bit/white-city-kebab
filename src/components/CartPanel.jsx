import { useEffect, useRef } from 'react'
import './CartPanel.css'

export default function CartPanel({ open, items, total, onClose, onUpdate, onRemove, onCheckout }) {
  const ref = useRef(null)

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])

  useEffect(() => { if (open) ref.current?.focus() }, [open])

  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div className={`cart-bd ${open ? 'cart-bd--on' : ''}`} onClick={onClose} aria-hidden="true" />

      <aside
        className={`cart-panel ${open ? 'cart-panel--open' : ''}`}
        role="dialog"
        aria-label="Il tuo ordine"
        aria-modal="true"
        tabIndex={-1}
        ref={ref}
      >
        {/* Header */}
        <div className="cp-head">
          <h2 className="cp-head__title">
            Il tuo ordine
            {count > 0 && <span className="cp-head__count">{count}</span>}
          </h2>
          <button className="cp-head__close" onClick={onClose} aria-label="Chiudi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="cp-body">
          {items.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty__icon">🛒</div>
              <p className="cp-empty__title">Carrello vuoto</p>
              <p className="cp-empty__sub">Aggiungi qualcosa dal menù!</p>
              <button className="cp-empty__btn" onClick={onClose}>Sfoglia il menù →</button>
            </div>
          ) : (
            <ul className="cp-items">
              {items.map(item => (
                <li key={item.id} className="cp-item">
                  <div className="cp-item__info">
                    <span className="cp-item__name">{item.name}</span>
                    <span className="cp-item__unit">€{item.price.toFixed(2)} cad.</span>
                  </div>
                  <div className="cp-item__actions">
                    <div className="cp-item__qty-wrap">
                      <button className="cp-item__qty-btn" onClick={() => onUpdate(item.id, -1)} aria-label="Rimuovi uno">−</button>
                      <span className="cp-item__qty">{item.qty}</span>
                      <button className="cp-item__qty-btn" onClick={() => onUpdate(item.id, 1)} aria-label="Aggiungi uno">+</button>
                    </div>
                    <span className="cp-item__total">€{(item.price * item.qty).toFixed(2)}</span>
                    <button className="cp-item__del" onClick={() => onRemove(item.id)} aria-label={`Rimuovi ${item.name}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cp-foot">
            <div className="cp-foot__note">🕐 Pronto in 20–30 min · Solo asporto</div>
            <div className="cp-foot__total">
              <span>Totale ordine</span>
              <span className="cp-foot__total-val">€{total.toFixed(2)}</span>
            </div>
            <button className="cp-foot__checkout" onClick={onCheckout}>
              Procedi all'ordine
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
