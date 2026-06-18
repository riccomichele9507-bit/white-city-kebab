import { useState, useEffect, useRef } from 'react'
import './CheckoutModal.css'

const DELIVERY_FEE = 2.50

function generateOrderId() {
  return 'WCK-' + Date.now().toString(36).toUpperCase().slice(-6)
}

export default function CheckoutModal({ open, items, total, onClose, onComplete }) {
  const [step, setStep]       = useState(1) // 1=options, 2=info, 3=success
  const [mode, setMode]       = useState('asporto')    // 'asporto' | 'consegna'
  const [payment, setPayment] = useState('contanti')   // 'online' | 'contanti'
  const [form, setForm]       = useState({ name: '', phone: '', email: '', address: '', city: '', notes: '' })
  const [errors, setErrors]   = useState({})
  const [orderId, setOrderId] = useState('')
  const firstRef              = useRef(null)

  const orderTotal = mode === 'consegna' ? total + DELIVERY_FEE : total

  useEffect(() => {
    if (!open) { setTimeout(() => { setStep(1); setErrors({}) }, 400) }
  }, [open])

  useEffect(() => {
    if (open && step === 2) setTimeout(() => firstRef.current?.focus(), 100)
  }, [open, step])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Campo obbligatorio'
    if (!form.phone.trim()) e.phone = 'Campo obbligatorio'
    else if (!/^[\d\s+\-()]{6,}$/.test(form.phone)) e.phone = 'Numero non valido'
    if (mode === 'consegna') {
      if (!form.address.trim()) e.address = 'Indirizzo obbligatorio'
      if (!form.city.trim())    e.city    = 'Città obbligatoria'
    }
    if (payment === 'online') {
      // placeholder — Stripe verrà integrato qui
    }
    return e
  }

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const id = generateOrderId()
    setOrderId(id)
    setStep(3)
    // TODO: submit order to backend / Stripe here
  }

  const handleClose = () => {
    if (step === 3) onComplete()
    else onClose()
  }

  if (!open) return null

  return (
    <>
      <div className="co-bd" onClick={handleClose} aria-hidden="true" />
      <div className="co-modal" role="dialog" aria-modal="true" aria-label="Checkout ordine">

        {/* ——— STEP 3: SUCCESS ——— */}
        {step === 3 && (
          <div className="co-success">
            <div className="co-success__icon">✅</div>
            <h2 className="co-success__title">Ordine confermato!</h2>
            <div className="co-success__id">Ordine #{orderId}</div>
            <div className="co-success__details">
              <div className="co-success__row">
                <span>{mode === 'asporto' ? '🏃 Asporto' : '🛵 Consegna'}</span>
                <span>{mode === 'asporto' ? 'Ritiro in negozio' : form.address + ', ' + form.city}</span>
              </div>
              <div className="co-success__row">
                <span>{payment === 'online' ? '💳 Pagamento online' : mode === 'asporto' ? '💵 Pagamento in negozio' : '💵 Pagamento al rider'}</span>
                <span>€{orderTotal.toFixed(2)}</span>
              </div>
              <div className="co-success__row">
                <span>⏱ Tempo stimato</span>
                <span>{mode === 'asporto' ? '20–30 min' : '35–50 min'}</span>
              </div>
            </div>
            <p className="co-success__note">
              Riceverai una conferma all'indirizzo fornito. Puoi contattarci per qualsiasi aggiornamento.
            </p>
            <button className="co-success__btn" onClick={handleClose}>
              Torna al menù
            </button>
          </div>
        )}

        {/* ——— STEP 1 + 2 ——— */}
        {step < 3 && (<>
          {/* Header */}
          <div className="co-head">
            <div className="co-head__left">
              {step === 2 && (
                <button className="co-head__back" onClick={() => setStep(1)} aria-label="Indietro">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
              )}
              <div>
                <h2 className="co-head__title">
                  {step === 1 ? 'Opzioni ordine' : 'Le tue informazioni'}
                </h2>
                <div className="co-steps">
                  <span className={`co-step ${step >= 1 ? 'co-step--done' : ''}`}>1</span>
                  <span className="co-steps__line" />
                  <span className={`co-step ${step >= 2 ? 'co-step--done' : ''}`}>2</span>
                  <span className="co-steps__line" />
                  <span className="co-step">3</span>
                </div>
              </div>
            </div>
            <button className="co-head__close" onClick={onClose} aria-label="Chiudi">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Order summary strip */}
          <div className="co-strip">
            <span className="co-strip__items">{items.reduce((s,i)=>s+i.qty,0)} articoli</span>
            <div className="co-strip__prices">
              {mode === 'consegna' && (
                <span className="co-strip__sub">+ €{DELIVERY_FEE.toFixed(2)} consegna</span>
              )}
              <span className="co-strip__total">€{orderTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* ——— STEP 1 ——— */}
          {step === 1 && (
            <div className="co-body">
              {/* Delivery mode */}
              <div className="co-section">
                <div className="co-section__label">Come vuoi ricevere l'ordine?</div>
                <div className="co-toggle-group">
                  <button
                    className={`co-toggle ${mode === 'asporto' ? 'co-toggle--active' : ''}`}
                    onClick={() => setMode('asporto')}
                    type="button"
                  >
                    <span className="co-toggle__icon">🏃</span>
                    <div>
                      <div className="co-toggle__title">Asporto</div>
                      <div className="co-toggle__sub">Ritiri in negozio · Via Ferrara, 4</div>
                    </div>
                    {mode === 'asporto' && <span className="co-toggle__check">✓</span>}
                  </button>
                  <button
                    className={`co-toggle ${mode === 'consegna' ? 'co-toggle--active' : ''}`}
                    onClick={() => setMode('consegna')}
                    type="button"
                  >
                    <span className="co-toggle__icon">🛵</span>
                    <div>
                      <div className="co-toggle__title">Consegna a domicilio</div>
                      <div className="co-toggle__sub">+€{DELIVERY_FEE.toFixed(2)} · 35–50 min</div>
                    </div>
                    {mode === 'consegna' && <span className="co-toggle__check">✓</span>}
                  </button>
                </div>
              </div>

              {/* Payment method */}
              <div className="co-section">
                <div className="co-section__label">Come vuoi pagare?</div>
                <div className="co-toggle-group">
                  <button
                    className={`co-toggle co-toggle--disabled`}
                    onClick={() => {}}
                    type="button"
                    aria-disabled="true"
                    title="Presto disponibile"
                  >
                    <span className="co-toggle__icon">💳</span>
                    <div>
                      <div className="co-toggle__title">
                        Pagamento online
                        <span className="co-toggle__coming">Presto disponibile</span>
                      </div>
                      <div className="co-toggle__sub">Carta di credito · Stripe</div>
                    </div>
                  </button>
                  <button
                    className={`co-toggle ${payment === 'contanti' ? 'co-toggle--active' : ''}`}
                    onClick={() => setPayment('contanti')}
                    type="button"
                  >
                    <span className="co-toggle__icon">💵</span>
                    <div>
                      <div className="co-toggle__title">
                        {mode === 'asporto' ? 'Pagamento in negozio' : 'Pagamento al rider'}
                      </div>
                      <div className="co-toggle__sub">
                        {mode === 'asporto' ? 'Contanti o POS al ritiro' : 'Contanti o POS alla consegna'}
                      </div>
                    </div>
                    {payment === 'contanti' && <span className="co-toggle__check">✓</span>}
                  </button>
                </div>
              </div>

              <button className="co-next" onClick={() => setStep(2)}>
                Continua
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          )}

          {/* ——— STEP 2 ——— */}
          {step === 2 && (
            <form className="co-body co-form" onSubmit={handleConfirm} noValidate>

              <div className="co-section">
                <div className="co-section__label">I tuoi dati</div>
                <div className="co-fields">
                  <div className="co-field">
                    <label htmlFor="co-name" className="co-field__label">Nome e Cognome *</label>
                    <input
                      ref={firstRef} id="co-name" name="name" type="text"
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

                  <div className="co-field co-field--full">
                    <label htmlFor="co-email" className="co-field__label">Email (opzionale)</label>
                    <input
                      id="co-email" name="email" type="email"
                      className="co-field__input"
                      value={form.email} onChange={handleChange}
                      placeholder="mario@esempio.it" autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {mode === 'consegna' && (
                <div className="co-section">
                  <div className="co-section__label">Indirizzo di consegna</div>
                  <div className="co-fields">
                    <div className="co-field co-field--full">
                      <label htmlFor="co-address" className="co-field__label">Via e numero civico *</label>
                      <input
                        id="co-address" name="address" type="text"
                        className={`co-field__input ${errors.address ? 'co-field__input--err' : ''}`}
                        value={form.address} onChange={handleChange}
                        placeholder="Via Roma, 12" autoComplete="street-address"
                      />
                      {errors.address && <span className="co-field__err">{errors.address}</span>}
                    </div>
                    <div className="co-field">
                      <label htmlFor="co-city" className="co-field__label">Città *</label>
                      <input
                        id="co-city" name="city" type="text"
                        className={`co-field__input ${errors.city ? 'co-field__input--err' : ''}`}
                        value={form.city} onChange={handleChange}
                        placeholder="Ostuni" autoComplete="address-level2"
                      />
                      {errors.city && <span className="co-field__err">{errors.city}</span>}
                    </div>
                  </div>
                </div>
              )}

              <div className="co-section">
                <div className="co-section__label">Note aggiuntive</div>
                <textarea
                  name="notes" id="co-notes" rows={2}
                  className="co-field__input co-field__input--ta"
                  value={form.notes} onChange={handleChange}
                  placeholder="Senza cipolla, citofono rotto, ecc..."
                />
              </div>

              {/* Order recap */}
              <div className="co-recap">
                <div className="co-recap__row">
                  <span>Subtotale</span><span>€{total.toFixed(2)}</span>
                </div>
                {mode === 'consegna' && (
                  <div className="co-recap__row">
                    <span>Consegna</span><span>€{DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                )}
                <div className="co-recap__row co-recap__row--total">
                  <span>Totale</span><span>€{orderTotal.toFixed(2)}</span>
                </div>
                <div className="co-recap__payment">
                  {payment === 'online'
                    ? '💳 Pagamento online con carta'
                    : mode === 'asporto'
                      ? '💵 Pagamento in negozio al ritiro'
                      : '💵 Pagamento al rider alla consegna'
                  }
                </div>
              </div>

              <button type="submit" className="co-confirm">
                Conferma ordine · €{orderTotal.toFixed(2)}
              </button>
            </form>
          )}
        </>)}
      </div>
    </>
  )
}
