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

        <a href="tel:+39XXXXXXXXXX" className="topbar__item topbar__item--phone">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13.5 19.79 19.79 0 011.61 4.9 2 2 0 013.6 2.69h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 10.09a16 16 0 006 6l.52-.53a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Chiama per info
        </a>
      </div>
    </div>
  )
}
