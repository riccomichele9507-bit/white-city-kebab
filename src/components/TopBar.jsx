import './TopBar.css'

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner">
        <a
          href="https://maps.google.com/?q=Via+Ferrara+4+Ostuni+BR"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar__item"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Via Ferrara, 4 — Ostuni (BR)
        </a>

        <div className="topbar__sep" aria-hidden="true" />

        <div className="topbar__item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Lun–Dom: 12:00–15:00, 18:00–23:30
        </div>

        <div className="topbar__sep" aria-hidden="true" />

        <div className="topbar__item topbar__item--highlight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          Pagamento online · Al ritiro · Alla consegna
        </div>
      </div>
    </div>
  )
}
