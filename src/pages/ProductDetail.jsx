import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import { reviews } from "../data/reviews";
import { useCart } from "../context/CartContext";
import { HoneyJarImage } from "../components/BrandArt";
import WhatsAppOptIn from "../components/WhatsAppOptIn";
import useSeo from "../hooks/useSeo";

export default function ProductDetail() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  useSeo(
    product?.name,
    product?.shortDescription
  );
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState(product?.variants[1] || product?.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return <Navigate to="/shop" replace />;

  function handleAdd() {
    addItem(product, variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/shop">Shop</Link> / <Link to="/shop/honey">Honey</Link> / <span>{product.name}</span>
        </nav>

        <div className="product-detail__grid">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img
                src="/product-honey.jpg"
                alt="GHARRAT Raw Himalayan Honey"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
              />
            </div>
            <div className="product-detail__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  className={`product-thumb ${activeImage === i ? "is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src="/product-honey.jpg"
                    alt={`View ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail__info">
            <div className="product-detail__badges">
              {product.badges.map((b) => <span key={b} className="badge">{b}</span>)}
            </div>
            <h1>{product.name}</h1>
            <div className="product-detail__rating">
              <Stars rating={product.rating} />
              <span>{product.rating} · {product.reviewCount} reviews</span>
            </div>
            <p className="product-detail__desc">{product.description}</p>

            <div className="product-detail__meta">
              <div><span>Origin</span><strong>{product.origin}</strong></div>
              <div><span>Harvest</span><strong>{product.harvest}</strong></div>
            </div>

            <div className="product-detail__variants">
              <p className="field-label">Weight</p>
              <div className="variant-options">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    className={`variant-pill ${variant.id === v.id ? "variant-pill--active" : ""}`}
                    onClick={() => setVariant(v)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail__price">
              <span className="price">₹{variant.price}</span>
              {variant.comparePrice && <span className="price-compare">₹{variant.comparePrice}</span>}
              <span className="stock-note">{variant.stock < 20 ? `Only ${variant.stock} left` : "In stock"}</span>
            </div>

            <div className="product-detail__purchase">
              <div className="qty-stepper">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="btn btn-primary product-detail__cta" onClick={handleAdd}>
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>
            <p className="product-detail__razorpay-note">Secure checkout powered by Razorpay · UPI, cards & netbanking accepted</p>

            <ul className="product-detail__benefits">
              {product.benefits.map((b) => (
                <li key={b.title}><strong>{b.title}.</strong> {b.text}</li>
              ))}
            </ul>

            {/* WhatsApp reorder reminder */}
            <div style={{ marginTop: 32 }}>
              <WhatsAppOptIn mode="reorder" />
            </div>
          </div>
        </div>

        {/* Batch Passport */}
        {product.batchPassport && (
          <div className="batch-passport">
            <div className="batch-passport__header">
              <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="24" height="24" rx="4"/>
                <path d="M10 12h12M10 16h8M10 20h6"/>
              </svg>
              <div>
                <p className="batch-passport__title">Batch Passport</p>
                <p className="batch-passport__code">{product.batchPassport.batchCode}</p>
              </div>
            </div>
            <div className="batch-passport__grid">
              {[
                { label: "Apiary", value: product.batchPassport.apiary },
                { label: "Beekeeper", value: product.batchPassport.beekeeper },
                { label: "Altitude", value: product.batchPassport.altitude },
                { label: "Harvest", value: product.batchPassport.harvestDate },
                { label: "Floral source", value: product.batchPassport.floralSource },
                { label: "Extraction", value: product.batchPassport.extraction },
                { label: "Bottled at", value: product.batchPassport.bottledAt },
              ].map(({ label, value }) => (
                <div className="batch-passport__item" key={label}>
                  <span className="batch-passport__label">{label}</span>
                  <span className="batch-passport__value">{value}</span>
                </div>
              ))}
              <div className="batch-passport__jars">
                <div>
                  <p className="batch-passport__jars-label">Total jars in this batch</p>
                  <p className="batch-passport__jars-sub">When these are gone, the next harvest begins</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="batch-passport__jars-count">{product.batchPassport.jarCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="product-detail__tabs">
          <div className="tabs-nav">
            {["description", "nutrition", "reviews", "faq"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "faq" ? "FAQ" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tabs-content">
            {activeTab === "description" && (
              <div className="tab-panel">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="tab-panel">
                <table className="nutrition-table">
                  <tbody>
                    <tr><td>Serving size</td><td>{product.nutrition.servingSize}</td></tr>
                    <tr><td>Calories</td><td>{product.nutrition.calories}</td></tr>
                    <tr><td>Carbohydrates</td><td>{product.nutrition.carbs}</td></tr>
                    <tr><td>Sugars</td><td>{product.nutrition.sugars}</td></tr>
                    <tr><td>Protein</td><td>{product.nutrition.protein}</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="tab-panel reviews-panel">
                {reviews.map((r) => (
                  <div className="review-row" key={r.id}>
                    <Stars rating={r.rating} />
                    <p>"{r.text}"</p>
                    <span>{r.name} · {r.location} {r.verified && <em>Verified Buyer</em>}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "faq" && (
              <div className="tab-panel">
                <dl className="faq-mini">
                  <dt>Does it crystallize?</dt>
                  <dd>Yes — that's a sign of raw, unprocessed honey. Warm gently to soften.</dd>
                  <dt>Is it raw?</dt>
                  <dd>Yes, never heated above hive temperature.</dd>
                  <dt>How should I store it?</dt>
                  <dd>Room temperature, lid closed, away from direct sun. No refrigeration needed.</dd>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "star star--full" : "star"}>★</span>
      ))}
    </span>
  );
}
