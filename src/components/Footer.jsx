import { Link } from "react-router-dom";
import { MillWheel } from "./BrandArt";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <img src="/logo.png" alt="GHARRAT" className="site-footer__logo-img" />
            <p className="site-footer__name">GHARRAT</p>
            <p className="site-footer__tag">
              Himalayan heritage foods, sourced at origin and brought to your table unhurried.
            </p>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">Shop</p>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop/honey">Raw Honey</Link></li>
              <li><Link to="/shop">Gift Boxes</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">About</p>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/producers">Producers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">Support</p>
            <ul>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><a href="https://wa.me/919882238158" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
              <li><a href="https://instagram.com/gharrat.in" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">Get in touch</p>
            <ul>
              <li><a href="mailto:hello@gharrat.in">hello@gharrat.in</a></li>
              <li>Palampur, Kangra Valley</li>
              <li>Himachal Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} GHARRAT. All rights reserved.</p>
          <p>Made in the hills of Himachal Pradesh.</p>
        </div>
      </div>
    </footer>
  );
}
