import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useRazorpay from "../hooks/useRazorpay";
import useSeo from "../hooks/useSeo";

export default function Checkout() {
  useSeo("Checkout", "Complete your GHARRAT order securely.");
  const { items, subtotal, discount, discountAmount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { pay, loading, error, clearError } = useRazorpay();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [formError, setFormError] = useState("");

  function update(field) {
    return (e) => { setForm((f) => ({ ...f, [field]: e.target.value })); setFormError(""); };
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return "Please enter a valid 10-digit mobile number.";
    if (!form.address.trim()) return "Please enter your delivery address.";
    if (!form.city.trim()) return "Please enter your city.";
    if (!/^\d{6}$/.test(form.pincode)) return "Please enter a valid 6-digit PIN code.";
    return null;
  }

  async function handlePayment(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setFormError(err); return; }
    clearError();

    // Build receipt string
    const receipt = `gharrat_${Date.now()}`;
    const productSummary = items.map(i => `${i.name} ${i.variantLabel} x${i.qty}`).join(", ");

    await pay({
      amount: total,          // in rupees
      productName: productSummary,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: `91${form.phone.replace(/\s/g, "")}`,
      receipt,
      onSuccess: ({ payment_id, order_id }) => {
        clearCart();
        navigate("/order-confirmed", {
          state: { payment_id, order_id, name: form.name, email: form.email }
        });
      },
      onCancel: () => {
        // User dismissed — do nothing, stay on checkout
      },
    });
  }

  if (items.length === 0) {
    return (
      <div className="container checkout-empty">
        <h1>Your cart is empty</h1>
        <p>Add something from the shop before checking out.</p>
        <Link to="/shop" className="btn btn-primary">Shop Honey</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handlePayment} noValidate>
          <h2>Delivery Details</h2>
          <div className="form-row">
            <label>
              Full name
              <input required value={form.name} onChange={update("name")} placeholder="Rahul Sharma" />
            </label>
          </div>
          <div className="form-row form-row--split">
            <label>
              Email
              <input type="email" required value={form.email} onChange={update("email")} placeholder="rahul@example.com" />
            </label>
            <label>
              Mobile number
              <input type="tel" required value={form.phone} onChange={update("phone")} placeholder="98XXXXXXXX" maxLength={10} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Address
              <input required value={form.address} onChange={update("address")} placeholder="House/Flat, Street, Area" />
            </label>
          </div>
          <div className="form-row form-row--split">
            <label>
              City
              <input required value={form.city} onChange={update("city")} placeholder="Bengaluru" />
            </label>
            <label>
              PIN code
              <input required value={form.pincode} onChange={update("pincode")} placeholder="560001" maxLength={6} />
            </label>
          </div>

          {formError && <p className="checkout-form__error">{formError}</p>}
          {error && <p className="checkout-form__error">{error}</p>}

          <h2>Payment</h2>
          <div className="payment-method">
            <div className="payment-method__option payment-method__option--active">
              <span>Pay securely with Razorpay</span>
              <span className="payment-icons">UPI · Cards · Netbanking · Wallets</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary checkout-submit"
            disabled={loading}
          >
            {loading ? "Opening payment…" : `Pay ₹${total.toLocaleString("en-IN")}`}
          </button>
          <p className="product-detail__razorpay-note">
            🔒 Powered by Razorpay · 100% secure · UPI, all major cards & netbanking accepted
          </p>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul>
            {items.map((item) => (
              <li key={item.key}>
                <span>{item.name} ({item.variantLabel}) × {item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__totals">
            <div><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            {discount && (
              <div><span>Discount ({discount.code})</span><span>−₹{discountAmount.toLocaleString("en-IN")}</span></div>
            )}
            <div><span>Shipping</span><span>Free above ₹999</span></div>
            <div className="checkout-summary__total">
              <span>Total</span><span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
