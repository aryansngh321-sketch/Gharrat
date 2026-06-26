import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

// Pages that open with a full-bleed dark/photographic hero, where the
// header should start in its light (stone-colored) state before scroll.
function startsWithDarkHero(pathname) {
  if (pathname === "/") return true;
  if (pathname === "/shop" || pathname.startsWith("/shop/")) {
    // product detail pages (3 segments) have a light top — only category listing is dark
    const segments = pathname.split("/").filter(Boolean);
    return segments.length <= 2;
  }
  if (pathname === "/about" || pathname === "/producers") return true;
  return false;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { pathname } = useLocation();
  const darkHero = startsWithDarkHero(pathname);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${!darkHero && !scrolled ? "site-header--on-light" : ""}`}>
        <div className="site-header__inner container">
          <button
            className={`site-header__burger ${menuOpen ? "site-header__burger--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>

          <nav className="site-header__nav site-header__nav--left">
            <NavLink to="/shop" className="nav-link">Shop</NavLink>
            <NavLink to="/about" className="nav-link">Our Story</NavLink>
            <NavLink to="/producers" className="nav-link">Producers</NavLink>
          </nav>

          <Link to="/" className="site-header__logo" aria-label="GHARRAT home">
            <img
              src="/logo.png"
              alt="GHARRAT"
              className="site-header__logo-img"
            />
          </Link>

          <nav className="site-header__nav site-header__nav--right">
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            <a
              href="https://wa.me/919882238158"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-link--whatsapp"
            >
              WhatsApp
            </a>
            <button
              className="cart-trigger"
              onClick={() => setIsOpen(true)}
              aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            >
              Cart
              {itemCount > 0 && <span className="cart-trigger__badge">{itemCount}</span>}
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="GHARRAT" className="mobile-menu__logo-img" />
          </Link>
          <ul className="mobile-menu__links">
            <li><NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink></li>
            {categories.map((c) => (
              <li key={c.slug} className="mobile-menu__sublink">
                <NavLink
                  to={c.live ? `/shop/${c.slug}` : "/shop"}
                  onClick={() => setMenuOpen(false)}
                >
                  {c.name}{!c.live && <span className="soon-tag">Coming soon</span>}
                </NavLink>
              </li>
            ))}
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Story</NavLink></li>
            <li><NavLink to="/producers" onClick={() => setMenuOpen(false)}>Producers</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
          </ul>
          <a href="https://wa.me/919882238158" target="_blank" rel="noopener noreferrer" className="mobile-menu__whatsapp">
            Chat on WhatsApp
          </a>
          <a href="https://instagram.com/gharrat.in" target="_blank" rel="noopener noreferrer" className="mobile-menu__instagram">
            @gharrat.in on Instagram
          </a>
        </div>
      </div>
    </>
  );
}
