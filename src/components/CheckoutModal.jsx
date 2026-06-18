import { useState, useEffect, useRef } from 'react'
import './CheckoutModal.css'

const WA_NUMBER = '393200000000'

export default function CheckoutModal({ open, items, total, onClose, onComplete }) {
  const [form, setForm]       = useState({ name: '', phone: '', time: '', notes: '' })
  const [errors, setErrors]   = useState({})
  const [busy, setBusy]       = useState(false)
  const firstRef              = useRef(null)

  useEffect(() => { if (open) setTimeout(() => firstRef.current?.focus(), 300) }, [open])
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Nome obbligatorio'
    if (!form.phone.trim()) e.phone = 'Telefono obbligatorio'
    else if (!/^[\d\s+\-()]{6,}$/.test(form.phone)) e.phone = 'Numero non valido'
    return e
  }

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const buildMsg = () => {
    const lines = [
      '🥙 *ORDINE — WHITE CITY KEBAB*',
      '',
      `👤 *Nome:* ${form.name}`,
      `📞 *Tel:* ${form.phone}`,
      form.time ? `🕐 *Ritiro:* ${form.time}` : '',
      '',
      '*Articoli:*',
      ...items.map(i => `• ${i.name} ×${i.qty}  –  €${(i.price * i.qty).toFixed(2)}`),
      '',
      `💰 *Totale: €${total.toFixed(2)}*`,
      form.notes ? `\n📝 *Note:* ${form.notes}` : '',
    ].filter(l => l !== undefined && l !== null)
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setBusy(true)
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildMsg()}`, '_blank', 'noopener,noreferrer')
    setTimeout(() => { setBusy(false); setForm({ name:'', phone:'', time:'', notes:'' }); setErrors({}); onComplete() }, 900)
  }

  if (!open) return null

  return (
    <>
      <div className="co-bd" onClick={onClose} aria-hidden="true" />
      <div className="co-modal" role="dialog" aria-modal="true" aria-label="Completa l'ordine">

        {/* Header */}
        <div className="co-head">
          <div>
            <h2 className="co-head__title">Completa l'ordine</h2>
            <p className="co-head__sub">L'ordine verrà inviato su WhatsApp per conferma</p>
          </div>
          <button className="co-head__close" onClick={onClose} aria-label="Chiudi">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Summary */}
        <div className="co-summary">
          <div className="co-summary__label">Riepilogo ordine</div>
          <ul className="co-summary__list">
            {items.map(i => (
              <li key={i.id} className="co-summary__row">
                <span>{i.name} <em>×{i.qty}</em></span>
                <span>€{(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="co-summary__total">
            <span>Totale</span>
            <span className="co-summary__total-val">€{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Form */}
        <form className="co-form" onSubmit={handleSubmit} noValidate>
          <div className="co-form__row">
            <div className="co-field">
              <label htmlFor="co-name" className="co-field__label">Nome e Cognome *</label>
              <input
                ref={firstRef}
                id="co-name" name="name" type="text"
                className={`co-field__input ${errors.name ? 'co-field__input--err' : ''}`}
                value={form.name} onChange={handleChange}
                placeholder="Mario Rossi" autoComplete="name"
              />
              {errors.name && <span className="co-field__err">{errors.name}</span>}
            </div>

            <div className="co-field">
              <label htmlFor="co-phone" className="co-field__label">Telefono *</label>
              <input
                id="co-phone" name="phone" type="tel"
                className={`co-field__input ${errors.phone ? 'co-field__input--err' : ''}`}
                value={form.phone} onChange={handleChange}
                placeholder="+39 320 000 0000" autoComplete="tel"
              />
              {errors.phone && <span className="co-field__err">{errors.phone}</span>}
            </div>
          </div>

          <div className="co-field">
            <label htmlFor="co-time" className="co-field__label">Orario ritiro preferito (opzionale)</label>
            <input
              id="co-time" name="time" type="time"
              className="co-field__input" value={form.time} onChange={handleChange}
            />
          </div>

          <div className="co-field">
            <label htmlFor="co-notes" className="co-field__label">Note (opzionale)</label>
            <textarea
              id="co-notes" name="notes" rows={3}
              className="co-field__input co-field__input--ta"
              value={form.notes} onChange={handleChange}
              placeholder="Senza cipolla, extra salsa, ecc..."
            />
          </div>

          <div className="co-wa-note">
            <span>💬</span>
            <p>Verrai reindirizzato su <strong>WhatsApp</strong>. Il nostro staff confermerà l'ordine e i tempi di ritiro.</p>
          </div>

          <button type="submit" className="co-submit" disabled={busy}>
            {busy
              ? <><div className="co-spinner" /> Invio...</>
              : <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Invia ordine su WhatsApp
                </>
            }
          </button>
        </form>
      </div>
    </>
  )
}
