import { useState, useEffect, useRef } from 'react'
import './CheckoutModal.css'

const PHONE_NUMBER = '3200000000' // placeholder — replace with real number

export default function CheckoutModal({ open, items, total, onClose, onComplete }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    time: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const firstInputRef = useRef(null)

  useEffect(() => {
    if (open && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Il nome è obbligatorio'
    if (!form.phone.trim()) errs.phone = 'Il numero di telefono è obbligatorio'
    else if (!/^[\d\s+\-()]{6,}$/.test(form.phone)) errs.phone = 'Numero non valido'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const buildWhatsAppMessage = () => {
    const itemLines = items
      .map(i => `• ${i.name} ×${i.qty} — €${(i.price * i.qty).toFixed(2)}`)
      .join('\n')
    const lines = [
      `🥙 *ORDINE ASPORTO — WHITE CITY KEBAB*`,
      ``,
      `👤 *Nome:* ${form.name}`,
      `📞 *Telefono:* ${form.phone}`,
      form.time ? `🕐 *Orario ritiro:* ${form.time}` : '',
      ``,
      `*Articoli:*`,
      itemLines,
      ``,
      `💰 *Totale: €${total.toFixed(2)}*`,
      form.notes ? `\n📝 *Note:* ${form.notes}` : '',
    ].filter(Boolean).join('\n')
    return encodeURIComponent(lines)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitting(true)

    // Open WhatsApp with pre-filled order
    const msg = buildWhatsAppMessage()
    const url = `https://wa.me/39${PHONE_NUMBER.replace(/\s/g,'')}?text=${msg}`
    window.open(url, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      setSubmitting(false)
      setForm({ name: '', phone: '', time: '', notes: '' })
      setErrors({})
      onComplete()
    }, 800)
  }

  if (!open) return null

  return (
    <>
      <div
        className="checkout-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="checkout-modal"
        role="dialog"
        aria-label="Completa il tuo ordine"
        aria-modal="true"
      >
        {/* Header */}
        <div className="checkout-modal__header">
          <div>
            <h2 className="checkout-modal__title">Completa l'ordine</h2>
            <p className="checkout-modal__subtitle">Verrai reindirizzato su WhatsApp per confermare</p>
          </div>
          <button className="checkout-modal__close" onClick={onClose} aria-label="Chiudi">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3 className="checkout-summary__title">Riepilogo ordine</h3>
          <ul className="checkout-summary__list">
            {items.map(item => (
              <li key={item.id} className="checkout-summary__item">
                <span className="checkout-summary__item-name">
                  {item.name}
                  <span className="checkout-summary__qty">×{item.qty}</span>
                </span>
                <span className="checkout-summary__item-price">
                  €{(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__total">
            <span>Totale</span>
            <span className="checkout-summary__total-value">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="checkout-form__row">
            <div className="checkout-field">
              <label className="checkout-field__label" htmlFor="checkout-name">
                Nome e Cognome *
              </label>
              <input
                ref={firstInputRef}
                className={`checkout-field__input ${errors.name ? 'checkout-field__input--error' : ''}`}
                id="checkout-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Mario Rossi"
                autoComplete="name"
              />
              {errors.name && <span className="checkout-field__error">{errors.name}</span>}
            </div>

            <div className="checkout-field">
              <label className="checkout-field__label" htmlFor="checkout-phone">
                Numero di telefono *
              </label>
              <input
                className={`checkout-field__input ${errors.phone ? 'checkout-field__input--error' : ''}`}
                id="checkout-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+39 320 000 0000"
                autoComplete="tel"
              />
              {errors.phone && <span className="checkout-field__error">{errors.phone}</span>}
            </div>
          </div>

          <div className="checkout-field">
            <label className="checkout-field__label" htmlFor="checkout-time">
              Orario ritiro preferito (opzionale)
            </label>
            <input
              className="checkout-field__input"
              id="checkout-time"
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-field">
            <label className="checkout-field__label" htmlFor="checkout-notes">
              Note aggiuntive (opzionale)
            </label>
            <textarea
              className="checkout-field__input checkout-field__input--textarea"
              id="checkout-notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Senza cipolla, extra salsa, ecc..."
              rows={3}
            />
          </div>

          <div className="checkout-whatsapp-note">
            <span>💬</span>
            <p>L'ordine verrà inviato via <strong>WhatsApp</strong>. Il nostro staff ti confermerà i tempi di ritiro.</p>
          </div>

          <button
            type="submit"
            className="checkout-submit"
            disabled={submitting}
          >
            {submitting ? (
              <><div className="checkout-spinner" />Invio in corso...</>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Invia ordine su WhatsApp
              </>
            )}
          </button>
        </form>
      </div>
    </>
  )
}
