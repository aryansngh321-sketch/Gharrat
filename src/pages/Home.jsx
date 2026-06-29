import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductBySlug } from "../data/products";
import { reviews, getAverageRating } from "../data/reviews";
import {
  HeroImage, HoneyJarImage, MillImage, MillWheel, TextureCard, PortraitPlaceholder,
} from "../components/BrandArt";
import Newsletter from "../components/Newsletter";
import WhatsAppOptIn from "../components/WhatsAppOptIn";
import MillJourney from "../components/MillJourney";
import useSeo from "../hooks/useSeo";

const honey = getProductBySlug("raw-himalayan-honey");

const benefitIcons = {
  "Single Origin": (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
      <path d="M24 6v8M24 34v8M6 24h8M34 24h8" />
    </svg>
  ),
  "Mountain Sourced": (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 38 L18 16 L26 28 L32 19 L44 38 Z" />
      <circle cx="32" cy="12" r="4" />
    </svg>
  ),
  "Small Batch": (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="14" y="18" width="20" height="22" rx="2" />
      <path d="M19 18v-5a5 5 0 0 1 10 0v5M19 27h10" />
    </svg>
  ),
  "Traceable Origin": (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M24 4C15 4 9 11 9 19c0 12 15 25 15 25s15-13 15-25c0-8-6-15-15-15z" />
      <circle cx="24" cy="19" r="5" />
    </svg>
  ),
};

const differentiators = [
  { title: "Single Origin", text: "Every jar traces back to the forests of Kangra Valley — never blended across regions." },
  { title: "Mountain Sourced", text: "Harvested above 1,200m, where the air is cooler and the forage is wild, not farmed." },
  { title: "Small Batch", text: "We bottle in limited runs rather than scaling past what the hives can sustainably give." },
  { title: "Traceable Origin", text: "Each batch is logged to its apiary and harvest date — ask us and we'll tell you exactly where yours came from." },
];

const faqs = [
  { q: "Does the honey crystallize?", a: "Yes — and that's a good sign. Raw, unprocessed honey naturally crystallizes over time. To soften it, place the jar in warm (not boiling) water for a few minutes." },
  { q: "Is it really raw honey?", a: "Yes. Never heated above hive temperature and never ultra-filtered. Extract, strain lightly, bottle — nothing else." },
  { q: "Where is it sourced from?", a: "Every batch comes from apiaries in Kangra Valley, Himachal Pradesh, kept by beekeepers we work with directly." },
  { q: "How should I store it?", a: "Room temperature, away from direct sunlight, lid closed. No refrigeration needed — it doesn't expire." },
];

const comingSoon = [
  { name: "Tea", tone: "moss", tagline: "High-altitude leaf, hand-picked." },
  { name: "Rajma", tone: "stone", tagline: "Heirloom mountain kidney beans." },
  { name: "Turmeric", tone: "honey", tagline: "Stone-ground Himalayan haldi." },
  { name: "Gift Boxes", tone: "dusk", tagline: "Curated Himalayan pantry sets." },
];

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "star star--full" : "star"}>★</span>
      ))}
    </span>
  );
}

const comingSoonIcons = {
  Tea: (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M8 14h18v14a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V14z" />
      <path d="M26 17h3a4 4 0 0 1 0 8h-3" />
      <path d="M13 8 Q15 4 17 8 Q19 4 21 8" />
    </svg>
  ),
  Rajma: (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="15" cy="22" rx="7" ry="5" transform="rotate(-20 15 22)" />
      <ellipse cx="25" cy="20" rx="7" ry="5" transform="rotate(10 25 20)" />
      <path d="M10 14 Q20 8 30 14" />
    </svg>
  ),
  Turmeric: (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20 6 Q28 12 26 22 Q24 30 16 32 Q8 30 10 20 Q12 10 20 6z" />
      <path d="M20 6 Q14 14 16 24" strokeDasharray="2 3" />
    </svg>
  ),
  "Gift Boxes": (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="6" y="18" width="28" height="18" rx="1.5" />
      <rect x="4" y="12" width="32" height="7" rx="1.5" />
      <path d="M20 12V36" />
      <path d="M20 12 C20 12 14 8 14 5 C14 3 16 2 18 3 C20 4 20 8 20 12z" />
      <path d="M20 12 C20 12 26 8 26 5 C26 3 24 2 22 3 C20 4 20 8 20 12z" />
    </svg>
  ),
};

function ComingSoonSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [doneFor, setDoneFor] = useState({});

  function handleNotify(name) {
    if (doneFor[name]) return;
    setActiveCard(activeCard === name ? null : name);
    setPhone("");
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const clean = phone.replace(/\D/g, "");
    if (clean.length !== 10 && !(clean.length === 12 && clean.startsWith("91"))) {
      setError("Enter a valid 10-digit number.");
      return;
    }
    setDoneFor((prev) => ({ ...prev, [activeCard]: true }));
    setActiveCard(null);
    setPhone("");
    setError("");
  }

  return (
    <section className="cs-section section">
      <div className="container">
        <div className="cs-head">
          <span className="eyebrow">What's Next From GHARRAT</span>
          <h2 className="cs-head__title">Beyond Honey</h2>
          <p className="cs-head__sub">
            Every item on this list is grown or made within 200km of our honey. We're taking our time to source it right.
          </p>
        </div>

        <div className="cs-grid">
          {comingSoon.map((c) => {
            const done = doneFor[c.name];
            const open = activeCard === c.name;
            return (
              <div className={`cs-card cs-card--${c.tone} ${open ? "cs-card--open" : ""}`} key={c.name}>
                <div className="cs-card__icon">{comingSoonIcons[c.name]}</div>
                <div className="cs-card__body">
                  <span className="cs-card__badge">Coming Soon</span>
                  <h3 className="cs-card__name">{c.name}</h3>
                  <p className="cs-card__tagline">{c.tagline}</p>
                </div>
                <div className="cs-card__footer">
                  {done ? (
                    <p className="cs-card__done">✓ You're on the list</p>
                  ) : (
                    <button
                      className="cs-card__notify-btn"
                      onClick={() => handleNotify(c.name)}
                      aria-expanded={open}
                    >
                      {open ? "Cancel" : "Notify me"}
                    </button>
                  )}
                </div>

                {open && (
                  <div className="cs-inline-form">
                    <p className="cs-inline-form__label">
                      One WhatsApp message when <strong>{c.name}</strong> is ready. Nothing else.
                    </p>
                    <form className="cs-inline-form__row" onSubmit={handleSubmit}>
                      <div className="cs-inline-form__input-wrap">
                        <span className="cs-inline-form__prefix">+91</span>
                        <input
                          type="tel"
                          placeholder="98XXXXXXXX"
                          value={phone}
                          maxLength={10}
                          onChange={(e) => { setPhone(e.target.value); setError(""); }}
                          aria-label="WhatsApp mobile number"
                          autoFocus
                        />
                      </div>
                      <button type="submit" className="btn btn-primary cs-inline-form__btn">
                        Notify me
                      </button>
                    </form>
                    {error && <p className="cs-inline-form__error">{error}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="cs-footnote">
          No mailing list. No spam. One message per category, sent the day it's available.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo(
    "Raw Himalayan Honey from Kangra Valley",
    "Raw, single-origin Himalayan honey sourced directly from beekeepers in Kangra Valley, Himachal Pradesh."
  );

  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(honey.variants[1]);
  const [openFaq, setOpenFaq] = useState(0);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(honey, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero hero--dark">
        <div className="hero__media">
          <HeroImage className="hero__image" />
          <div className="hero__media-overlay hero__media-overlay--dark" />
        </div>
        <div className="hero__content container">
          <span className="eyebrow eyebrow--light hero__eyebrow">
            Kangra Valley · Himachal Pradesh · Est. 2024
          </span>
          <h1 className="hero__headline">
            From the Heart<br />of the Himalayas
          </h1>
          <p className="hero__subheadline">
            Raw Himalayan honey and thoughtfully curated mountain foods,
            sourced from Kangra Valley and brought to your table unhurried.
          </p>
          <div className="hero__ctas">
            <Link to="/shop/honey" className="btn btn-light">Shop Honey</Link>
            <Link to="/about" className="btn btn-outline-light">Our Story</Link>
          </div>
          <div className="hero__trust-bar">
            <span>⭐ 4.8 · 312 reviews</span>
            <span className="hero__trust-dot" />
            <span>Free shipping above ₹999</span>
            <span className="hero__trust-dot" />
            <span>100% raw &amp; traceable</span>
          </div>
        </div>
        <div className="hero__scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* ============ BENTO GRID ============ */}
      <section className="bento section">
        <div className="container">
          <div className="bento__eyebrow">
            <span className="eyebrow">The GHARRAT Range</span>
          </div>
          <div className="bento__grid">

            {/* Hero product cell */}
            <div className="bento__cell bento__cell--hero">
              <div className="bento__cell-inner bento__cell--product">
                <div className="bento__product-image">
                  <img src="/product-honey.jpg" alt="GHARRAT Raw Himalayan Honey jar" />
                </div>
                <div className="bento__product-info">
                  <span className="eyebrow">Hero Product</span>
                  <h2>Raw Himalayan<br />Honey</h2>
                  <p>Unprocessed. Single-origin.<br />Kangra Valley.</p>
                  <div className="bento__variants">
                    {honey.variants.map((v) => (
                      <button
                        key={v.id}
                        className={`variant-pill variant-pill--sm ${selectedVariant.id === v.id ? "variant-pill--active" : ""}`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                  <div className="bento__price-row">
                    <span className="price">₹{selectedVariant.price}</span>
                    <span className="price-compare">₹{selectedVariant.comparePrice}</span>
                  </div>
                  <button className="btn btn-primary" onClick={handleAdd}>
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>

            {/* Review quote */}
            <div className="bento__cell bento__cell--quote">
              <div className="bento__cell-inner bento__cell--dark">
                <Stars rating={4.8} />
                <p className="bento__quote-text">
                  "Tastes like the honey my grandmother used to bring from the hills."
                </p>
                <p className="bento__quote-attr">— Ananya R., Bengaluru</p>
                <span className="bento__verified">Verified Buyer</span>
              </div>
            </div>

            {/* Batch provenance */}
            <div className="bento__cell bento__cell--provenance">
              <div className="bento__cell-inner bento__cell--moss">
                <MillWheel size={48} className="bento__mill" />
                <p className="bento__prov-label eyebrow eyebrow--light">Current Batch</p>
                <p className="bento__prov-code">GH-KV-2025-A7</p>
                <ul className="bento__prov-list">
                  <li><span>Apiary</span><strong>Baijnath forests</strong></li>
                  <li><span>Altitude</span><strong>1,340m</strong></li>
                  <li><span>Harvest</span><strong>Spring 2025</strong></li>
                  <li><span>Jars</span><strong>214 made</strong></li>
                </ul>
                <Link to="/shop/honey/raw-himalayan-honey" className="bento__prov-link">Full batch passport →</Link>
              </div>
            </div>

            {/* Brand story teaser */}
            <div className="bento__cell bento__cell--story">
              <div className="bento__cell-inner bento__cell--stone">
                <span className="eyebrow">The Name</span>
                <h3>Named for the water mill that ran every village</h3>
                <p>A gharat was never owned by one family. It was shared infrastructure — built by the community, for the community. That's the spirit we borrowed.</p>
                <Link to="/about" className="bento__story-link">Our full story →</Link>
              </div>
            </div>

            {/* Differentiators */}
            <div className="bento__cell bento__cell--diffs">
              <div className="bento__cell-inner">
                {differentiators.map((d) => (
                  <div className="bento__diff" key={d.title}>
                    <span className="bento__diff-icon">{benefitIcons[d.title]}</span>
                    <div>
                      <p className="bento__diff-title">{d.title}</p>
                      <p className="bento__diff-text">{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Producer */}
            <div className="bento__cell bento__cell--producer">
              <div className="bento__cell-inner bento__cell--dark bento__cell--producer-inner">
                <PortraitPlaceholder seed={1} className="bento__producer-img" />
                <div className="bento__producer-text">
                  <p className="bento__producer-name">Tilak Raj</p>
                  <p className="bento__producer-role">Beekeeper · Baijnath</p>
                  <p className="bento__producer-quote">"I still extract the way my father taught me."</p>
                  <Link to="/producers" className="bento__prov-link">Meet our producers →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ BRAND STORY ============ */}
      <section className="brand-story section">
        <div className="container">
          <div className="brand-story__head">
            <span className="eyebrow">Where The Name Comes From</span>
            <h2>The Story of GHARRAT</h2>
          </div>

          <div className="brand-story__flow">
            <div className="brand-story__line" aria-hidden="true" />

            <div className="story-block">
              <div className="story-block__marker">
                <div className="story-block__mill-photo"><MillImage /></div>
              </div>
              <div className="story-block__text">
                <h3>What a Gharat is</h3>
                <p>Long before electricity reached the hills, every Himalayan village ran on its <em>gharat</em> — a water mill built into the side of a stream, turning grain into flour using nothing but the force of falling water. No fuel, no waste, no machinery beyond what the village itself could build and repair.</p>
              </div>
            </div>

            <div className="story-block">
              <div className="story-block__marker story-block__marker--dot"><span className="story-block__dot" /></div>
              <div className="story-block__text">
                <h3>A symbol of community</h3>
                <p>A gharat was never owned by one household. Families took turns, shared upkeep, and traded labour for grain. It was built around the idea that what the land gives should move through the community, not sit with one person.</p>
              </div>
            </div>

            <div className="story-block">
              <div className="story-block__marker story-block__marker--dot"><span className="story-block__dot" /></div>
              <div className="story-block__text">
                <h3>Why preserving mountain livelihoods matters</h3>
                <p>Most gharats have gone quiet — replaced by diesel mills, or abandoned as younger generations moved to cities. The same is happening to beekeeping, terrace farming, and the small crafts that once sustained Himalayan households.</p>
              </div>
            </div>

            <div className="story-block">
              <div className="story-block__marker story-block__marker--dot"><span className="story-block__dot" /></div>
              <div className="story-block__text">
                <h3>How GHARRAT supports local producers</h3>
                <p>We work directly with beekeepers and growers in Kangra Valley — paying fairly, sourcing in rotation with what the land can sustainably offer, and building a market for Himalayan products that doesn't ask producers to compromise on how they've always worked.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ MILL JOURNEY TEASER ============ */}
      <MillJourney />

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--light">From Our Customers</span>
            <h2 className="testimonials__heading">
              {getAverageRating()} average · 312 verified reviews
            </h2>
          </div>
          <div className="testimonials__grid">
            {reviews.map((r) => (
              <article className="testimonial-card" key={r.id}>
                <Stars rating={r.rating} />
                <p className="testimonial-card__text">"{r.text}"</p>
                <p className="testimonial-card__author">
                  {r.name} <span>· {r.location}</span>
                  {r.verified && <span className="verified-tag">Verified</span>}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq section">
        <div className="container-narrow">
          <div className="section-head section-head--center">
            <span className="eyebrow">Good to Know</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq__list">
            {faqs.map((item, i) => (
              <div className="faq-item" key={item.q}>
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <span className={`faq-item__icon ${openFaq === i ? "is-open" : ""}`}>+</span>
                </button>
                <div className={`faq-item__answer ${openFaq === i ? "is-open" : ""}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <Newsletter />

      {/* ============ COMING SOON ============ */}
      <ComingSoonSection />
    </>
  );
}
