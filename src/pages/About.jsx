import { Link } from "react-router-dom";
import { HeroImage, MillImage, MillWheel, TextureCard } from "../components/BrandArt";
import useSeo from "../hooks/useSeo";

export default function About() {
  useSeo("Our Story", "The story of GHARRAT — named for the traditional Himalayan water mill, built around community, sustainability, and local livelihoods.");
  return (
    <div className="about-page">
      <section className="about-hero">
        <HeroImage className="about-hero__image" />
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="eyebrow eyebrow--light">Our Story</span>
          <h1>Built around an idea older than the brand</h1>
        </div>
      </section>

      <section className="section about-intro">
        <div className="container-narrow">
          <p className="about-intro__lead">
            GHARRAT takes its name from the traditional Himalayan water mill —
            a structure built into mountain streams that turned grain into
            flour using nothing but the force of falling water. No diesel, no
            grid power, no waste. Just careful engineering passed down through
            generations, and a system designed to serve the whole village, not
            one household.
          </p>
          <p>
            That mill is mostly gone now. Diesel mills replaced it in most
            villages decades ago, and the ones that remain are kept running
            more out of memory than necessity. We named the brand after it
            because the gharat represents something we wanted to build a
            company around: sustainability that isn't a marketing word,
            craftsmanship that takes time, and livelihoods that stay rooted in
            the place they come from.
          </p>
        </div>
      </section>

      <section className="about-mill-photo">
        <div className="container">
          <div className="about-mill-photo__inner">
            <MillImage className="about-mill-photo__img" />
            <div className="about-mill-photo__caption">
              <span className="eyebrow">The Namesake</span>
              <p>A working gharat on a mountain stream in Kangra Valley — the kind of mill this brand was named after.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-pillars section">
        <div className="container">
          <div className="about-pillars__grid">
            <div className="about-pillar">
              <MillWheel size={48} />
              <h3>Community first</h3>
              <p>
                A gharat was shared infrastructure — families took turns and
                traded labour for grain. We work the same way with our
                producers: direct relationships, fair payment, shared
                upside as the brand grows.
              </p>
            </div>
            <div className="about-pillar">
              <MillWheel size={48} />
              <h3>Sustainability, practiced</h3>
              <p>
                We harvest honey in rotation with what each hive can give —
                never stripping a colony bare for a bigger batch. The same
                principle will guide every category we add.
              </p>
            </div>
            <div className="about-pillar">
              <MillWheel size={48} />
              <h3>Craftsmanship over scale</h3>
              <p>
                Small-batch isn't a tagline here — it's a production limit we
                set on purpose, because the alternative is asking producers
                to compromise on how they've always worked.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-future section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Where We're Headed</span>
            <h2>Honey is where we started</h2>
            <p className="section-head__sub">
              Kangra's hills grow more than honey. Tea, rajma, turmeric, and
              the makings of a proper Himalayan gift box are all in
              development with the same producers and the same standards.
            </p>
          </div>
          <div className="future-categories__grid">
            {["Tea", "Rajma", "Turmeric", "Gift Boxes"].map((name, i) => (
              <div className="future-card" key={name}>
                <TextureCard tone={["moss", "stone", "honey", "dusk"][i]} className="future-card__image" />
                <p className="future-card__name">{name}</p>
                <span className="future-card__tag">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta section">
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h2>Start with the honey.</h2>
          <p style={{ marginTop: 12, marginBottom: 32 }}>It's where the whole idea began.</p>
          <Link to="/shop/honey" className="btn btn-primary">Shop Raw Himalayan Honey</Link>
        </div>
      </section>
    </div>
  );
}
