import { useParams, Link, Navigate } from "react-router-dom";
import { categories, products, getProductsByCategory } from "../data/products";
import { HoneyJarImage, TextureCard } from "../components/BrandArt";
import useSeo from "../hooks/useSeo";

export default function Shop() {
  useSeo("Shop Himalayan Foods", "Shop raw Himalayan honey and discover upcoming mountain pantry staples from GHARRAT.");
  const { categorySlug } = useParams();

  if (categorySlug) {
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return <Navigate to="/shop" replace />;
    if (!category.live) {
      return <ComingSoonCategory category={category} />;
    }
  }

  const activeCategory = categorySlug || null;
  const visibleProducts = activeCategory ? getProductsByCategory(activeCategory) : products;

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">The Full Range</span>
          <h1>Shop GHARRAT</h1>
          <p>Starting with raw honey from Kangra Valley — more of the Himalayan pantry is on its way.</p>
        </div>
      </section>

      <div className="container">
        <nav className="shop-filters" aria-label="Product categories">
          <Link to="/shop" className={`shop-filter ${!activeCategory ? "is-active" : ""}`}>All</Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={c.live ? `/shop/${c.slug}` : "/shop"}
              className={`shop-filter ${activeCategory === c.slug ? "is-active" : ""} ${!c.live ? "shop-filter--disabled" : ""}`}
              onClick={(e) => { if (!c.live) e.preventDefault(); }}
              aria-disabled={!c.live}
            >
              {c.name}{!c.live && <span className="soon-tag">Soon</span>}
            </Link>
          ))}
        </nav>

        <div className="shop-grid">
          {visibleProducts.map((p) => (
            <Link to={`/shop/honey/${p.slug}`} className="product-card" key={p.id}>
              <div className="product-card__image">
                <HoneyJarImage />
              </div>
              <div className="product-card__body">
                <p className="product-card__name">{p.name}</p>
                <p className="product-card__desc">{p.shortDescription}</p>
                <p className="product-card__price">From ₹{Math.min(...p.variants.map((v) => v.price))}</p>
              </div>
            </Link>
          ))}
        </div>

        {!activeCategory && (
          <div className="shop-future">
            <p className="eyebrow">Coming Soon To The Range</p>
            <div className="shop-future__grid">
              {categories.filter((c) => !c.live).map((c, i) => (
                <div className="future-card" key={c.slug}>
                  <TextureCard tone={["moss", "stone", "honey", "dusk"][i % 4]} className="future-card__image" />
                  <p className="future-card__name">{c.name}</p>
                  <span className="future-card__tag">{c.tagline}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ComingSoonCategory({ category }) {
  return (
    <div className="container shop-page__coming-soon">
      <span className="eyebrow">Coming Soon</span>
      <h1>{category.name}</h1>
      <p>{category.tagline}. We're still working directly with growers on this one — join the Collective and we'll let you know the moment it's ready.</p>
      <Link to="/shop/honey" className="btn btn-primary">Shop Honey Instead</Link>
    </div>
  );
}
