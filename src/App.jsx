import { useState, useEffect, useCallback } from 'react'
import TopBar      from './components/TopBar'
import Header      from './components/Header'
import Hero        from './components/Hero'
import InfoBanner  from './components/InfoBanner'
import TopPicks    from './components/TopPicks'
import CategoryGrid from './components/CategoryGrid'
import MenuFull    from './components/MenuFull'
import InfoSection from './components/InfoSection'
import SiteFooter  from './components/SiteFooter'
import CartPanel   from './components/CartPanel'
import CheckoutModal from './components/CheckoutModal'
import { categories, menuData } from './data/menu'
import './App.css'

export default function App() {
  const [cart, setCart]             = useState([])
  const [cartOpen, setCartOpen]     = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null) // scroll target

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  useEffect(() => {
    document.body.classList.toggle('no-scroll', cartOpen || checkoutOpen)
  }, [cartOpen, checkoutOpen])

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const found = prev.find(i => i.id === item.id)
      return found
        ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0))
  }, [])

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => setCheckoutOpen(true), 320)
  }

  const handleOrderComplete = () => {
    setCheckoutOpen(false)
    setCart([])
    setSuccessMsg(true)
    setTimeout(() => setSuccessMsg(false), 6000)
  }

  const scrollToMenu = (catId) => {
    const el = document.getElementById(catId ? `menu-cat-${catId}` : 'menu-full')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <TopBar />
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onOrder={() => scrollToMenu(null)} />
        <InfoBanner />
        <TopPicks onAdd={addToCart} cart={cart} />
        <CategoryGrid onCategory={scrollToMenu} />
        <MenuFull
          categories={categories}
          menuData={menuData}
          cart={cart}
          onAdd={addToCart}
        />
        <InfoSection />
      </main>

      <SiteFooter />

      <CartPanel
        open={cartOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />

      {successMsg && (
        <div className="toast-success" role="alert">
          <span>✅</span>
          <div>
            <strong>Ordine inviato su WhatsApp!</strong>
            <p>Ti contatteremo per confermare il ritiro.</p>
          </div>
        </div>
      )}
    </>
  )
}
