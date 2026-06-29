import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HoneyJarImage } from "./BrandArt";

export default function CartDrawer() {
  const {
    items, isOpen, setIsOpen, removeItem, updateQty,
    discount, applyDiscount, clearDiscount,
    subtotal, discountAmount, total,
  } = useCart();

  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);

  function handleApply(e) {
    e.preventDefault();
    if (!code.trim()) return;
    const result = applyDiscount(code);
    setMessage(result);
    if (result.success) setCode("");
  }

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "cart-overlay--visible" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__header">
          <h3>Your Cart</h3>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              Shop Honey
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.key} className="cart-item">
                  <div className="cart-item__image">
                    <img src="/product-honey.jpg" alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="cart-item__details">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__variant">{item.variantLabel}</p>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="cart-item__right">
                    <p className="cart-item__price">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                    <button className="cart-item__remove" onClick={() => removeItem(item.key)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__discount">
              {discount ? (
                <div className="discount-applied">
                  <span>Code <strong>{discount.code}</strong> applied · {discount.percent}% off</span>
                  <button onClick={() => { clearDiscount(); setMessage(null); }}>Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApply}>
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    aria-label="Discount code"
                  />
                  <button type="submit" className="btn btn-secondary">Apply</button>
                </form>
              )}
              {message && !discount && (
                <p className={`discount-message ${message.success ? "is-success" : "is-error"}`}>{message.message}</p>
              )}
            </div>

            <div className="cart-drawer__summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discount && (
                <div className="summary-row summary-row--discount">
                  <span>Discount</span>
                  <span>−₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <p className="cart-drawer__shipping-note">Shipping and taxes calculated at checkout.</p>
              <Link to="/checkout" className="btn btn-primary cart-drawer__checkout" onClick={() => setIsOpen(false)}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
