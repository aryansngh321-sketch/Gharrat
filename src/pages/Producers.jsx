import { PortraitPlaceholder } from "../components/BrandArt";

const producers = [
  {
    name: "Tilak Raj",
    role: "Beekeeper, Baijnath",
    seed: 1,
    text: "Tilak Raj has kept bees in the forests above Baijnath for over twenty years, moving hives with the bloom — from plum orchards in spring to wild rhododendron higher up by summer. He still extracts honey by hand, the way his father taught him, and can tell you which slope a batch came from just by its colour.",
  },
  {
    name: "Meera Devi",
    role: "Beekeeper, Bir",
    seed: 2,
    text: "Meera Devi took over her family's hives after her husband's passing and is one of very few women beekeeping independently in the region. She manages twelve boxes across two terraces above Bir and has trained several other women in the valley to start their own.",
  },
  {
    name: "Sanjay Thakur",
    role: "Apiary Coordinator, Palampur",
    seed: 3,
    text: "Sanjay is the link between GHARRAT and eight beekeeping families spread across Kangra Valley. He coordinates harvest timing, runs quality checks at each apiary, and keeps the records that let us trace every jar back to the hive it came from.",
  },
  {
    name: "Vinod Kumar",
    role: "Beekeeper, Andretta",
    seed: 4,
    text: "Vinod's apiary sits just below the Dhauladhar range, where the forage shifts from mustard fields in the valley to wild forest flowers higher up. He's been experimenting with rotational hive placement to reduce strain on any single forage area.",
  },
];

export default function Producers() {
  return (
    <div className="producers-page">
      <section className="about-hero about-hero--short">
        <div className="about-hero__overlay" style={{ background: "var(--dusk)" }} />
        <div className="container about-hero__content">
          <span className="eyebrow eyebrow--light">Behind Every Jar</span>
          <h1>The People We Work With</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow" style={{ textAlign: "center", marginBottom: 64 }}>
          <p>
            GHARRAT works directly with beekeepers across Kangra Valley —
            no middlemen, no anonymous sourcing. Every batch is traceable to
            the person who kept the hive it came from.
          </p>
        </div>

        <div className="producers-page__grid">
          {producers.map((p) => (
            <article className="producer-profile" key={p.name}>
              <PortraitPlaceholder seed={p.seed} className="producer-profile__image" />
              <div className="producer-profile__body">
                <h2>{p.name}</h2>
                <p className="producer-profile__role">{p.role}</p>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
