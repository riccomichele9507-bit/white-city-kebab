import { useEffect, useRef } from 'react'
import './CategoryNav.css'

export default function CategoryNav({ categories, active, onChange }) {
  const navRef = useRef(null)
  const activeRef = useRef(null)

  // Scroll active pill into view
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const pill = activeRef.current
      const navRect = nav.getBoundingClientRect()
      const pillRect = pill.getBoundingClientRect()
      const scrollTarget = pill.offsetLeft - nav.offsetWidth / 2 + pill.offsetWidth / 2
      nav.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    }
  }, [active])

  const handleClick = (catId) => {
    onChange(catId)
    // Scroll to section
    const el = document.getElementById(`cat-${catId}`)
    if (el) {
      const offset = 140
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="cat-nav-wrap">
      <nav className="cat-nav" ref={navRef} aria-label="Categorie menù">
        {categories.map(cat => (
          <button
            key={cat.id}
            ref={active === cat.id ? activeRef : null}
            className={`cat-nav__pill ${active === cat.id ? 'cat-nav__pill--active' : ''}`}
            onClick={() => handleClick(cat.id)}
            aria-pressed={active === cat.id}
          >
            <span className="cat-nav__pill-emoji" aria-hidden="true">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>
      <div className="cat-nav__fade-left" aria-hidden="true" />
      <div className="cat-nav__fade-right" aria-hidden="true" />
    </div>
  )
}
