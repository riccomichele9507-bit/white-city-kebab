import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryNav from './components/CategoryNav'
import MenuSection from './components/MenuSection'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import Footer from './components/Footer'
import { categories, menuData } from './data/menu'
import './App.css'

export default function App() {
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('menu-combinati')
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Lock body scroll when cart is open
  useEffect(() => {
    if (cartOpen || checkoutOpen) {
      document.body.classList.add('cart-open')
    } else {
      document.body.classList.remove('cart-open')
    }
  }, [cartOpen, checkoutOpen])

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId))
  }, [])

  const updateQty = useCallback((itemId, delta) => {
    setCartItems(prev => {
      return prev
        .map(i => i.id === itemId ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => setCheckoutOpen(true), 300)
  }

  const handleOrderComplete = () => {
    setCheckoutOpen(false)
    clearCart()
    setOrderSuccess(true)
    setTimeout(() => setOrderSuccess(false), 6000)
  }

  return (
    <div className="page">
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <Hero onOrderNow={() => {
        const el = document.getElementById('menu-section')
        el?.scrollIntoView({ behavior: 'smooth' })
      }} />

      <main id="menu-section">
        <CategoryNav
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        {categories.map(cat => (
          <MenuSection
            key={cat.id}
            category={cat}
            data={menuData[cat.id]}
            isActive={activeCategory === cat.id}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        ))}
      </main>

      <Footer />

      <Cart
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onUpdate={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleOrderComplete}
      />

      {orderSuccess && (
        <div className="success-toast" role="alert">
          <span className="success-toast__icon">✅</span>
          <div>
            <strong>Ordine inviato!</strong>
            <p>Ti contatteremo presto per confermare il ritiro.</p>
          </div>
        </div>
      )}
    </div>
  )
}
