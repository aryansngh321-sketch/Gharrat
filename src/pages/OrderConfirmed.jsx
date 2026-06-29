import { useLocation, Link } from "react-router-dom";
import { MillWheel } from "../components/BrandArt";

export default function OrderConfirmed() {
  const { state } = useLocation();
  const { payment_id, order_id, name, email } = state || {};

  return (
    <div className="container order-confirmed">
      <MillWheel size={72} />
      <span className="eyebrow">Order Confirmed</span>
      <h1>Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h1>
      <p>
        Your order is confirmed and will be packed from Kangra Valley shortly.
        {email && <> A confirmation has been sent to <strong>{email}</strong>.</>}
      </p>
      {payment_id && (
        <div className="order-confirmed__details">
          <p><span>Payment ID</span><strong>{payment_id}</strong></p>
          {order_id && <p><span>Order ID</span><strong>{order_id}</strong></p>}
        </div>
      )}
      <p className="order-confirmed__note">
        Questions? WhatsApp us at{" "}
        <a href="https://wa.me/919882238158" target="_blank" rel="noopener noreferrer">
          +91 98822 38158
        </a>
      </p>
      <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
    </div>
  );
}
