import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MillImage, MillWheel } from "../components/BrandArt";
import useSeo from "../hooks/useSeo";
import "../styles/MillJourney.css";

/* ---------------------------------------------------------------
   DATA
--------------------------------------------------------------- */

const timelineSteps = [
  {
    time: "Morning · 9:00 am",
    title: "Arrival at the Village",
    desc: "You're met at the village entrance by your guide. A short orientation over chai, and the day begins quietly — no schedule, no rush.",
  },
  {
    time: "9:30 am",
    title: "The Village Walk",
    desc: "Walk the terraced paths between fields. Your guide explains how the landscape was shaped by generations of farming without machines.",
  },
  {
    time: "10:30 am",
    title: "Meet the Miller",
    desc: "Enter the mill and meet the family who has kept it running. Hear the history in their own words — the repairs, the floods, the seasons.",
  },
  {
    time: "11:00 am",
    title: "Grinding Your Flour",
    desc: "You turn the stones yourself. It takes more effort than you expect. The flour that comes out smells nothing like anything from a shop.",
  },
  {
    time: "12:30 pm",
    title: "Lunch in the Courtyard",
    desc: "A meal cooked from what the land provides — dal, rice, seasonal greens, and rotis made from the same grain you just ground.",
  },
  {
    time: "Afternoon",
    title: "Take Home Your Flour",
    desc: "Your ground flour is wrapped and yours to keep. A small thing with a long story attached.",
  },
];

const includes = [
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M8 14h18v14a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V14z" />
        <path d="M26 17h3a4 4 0 0 1 0 8h-3" />
        <path d="M13 8 Q15 4 17 8 Q19 4 21 8" />
      </svg>
    ),
    title: "Himalayan Chai",
    desc: "Freshly brewed on arrival and again after lunch. The kind that takes twenty minutes to make.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M20 4 L20 10 M20 30 L20 36 M4 20 L10 20 M30 20 L36 20" />
        <circle cx="20" cy="20" r="10" />
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Guided Village Walk",
    desc: "A one-hour walk through the terraced village with a local guide who has lived here their whole life.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 12 L20 20 L26 26" />
        <path d="M14 6 Q20 2 26 6" />
      </svg>
    ),
    title: "Mill Demonstration",
    desc: "Watch the water wheel in motion, understand how the millstone works, and grind your own portion of grain.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <ellipse cx="20" cy="28" rx="14" ry="6" />
        <path d="M6 28 L6 22 Q6 12 20 10 Q34 12 34 22 L34 28" />
        <path d="M13 18 Q16 14 20 14 Q24 14 27 18" />
      </svg>
    ),
    title: "Traditional Lunch",
    desc: "A home-cooked meal in the family courtyard. Seasonal, simple, and entirely made from what the farm and forest provide.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="10" y="24" width="20" height="10" rx="2" />
        <path d="M14 24 L12 10 Q14 6 20 6 Q26 6 28 10 L26 24" />
        <path d="M15 16 Q20 14 25 16" />
      </svg>
    ),
    title: "Freshly Ground Flour",
    desc: "You leave with your own small packet of stone-ground flour from the grain you milled by hand.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="6" y="8" width="28" height="24" rx="2" />
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
        <path d="M6 16 L34 16" />
      </svg>
    ),
    title: "Photography Welcome",
    desc: "Bring a camera. The light inside a Himalayan water mill at midday is unlike anything you've seen.",
  },
];

const faqs = [
  {
    q: "How do I get to the mill?",
    a: "The mill is located in a village about 40 minutes from Palampur. We share precise directions after you reach out. A personal vehicle or taxi is the most convenient way.",
  },
  {
    q: "Is this suitable for children?",
    a: "Yes. Children tend to love the mill — the sound of the water, the stone, the flour. The walk is gentle and the whole experience moves at a pace that suits families.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable walking clothes and shoes that can handle uneven terrain. The paths are stone and sometimes muddy after rain. Bring a light layer — it can be cooler inside the mill.",
  },
  {
    q: "How many people can visit at once?",
    a: "We keep it small — a maximum of eight people per visit. The mill is a working space, and we want every guest to have real time with the family, not a crowd experience.",
  },
  {
    q: "What's the best time of year to visit?",
    a: "March through June, and September through November. The Himalayan monsoon runs July through August — the mill still works, but the journey there requires more care.",
  },
];

/* ---------------------------------------------------------------
   SUB-COMPONENTS
--------------------------------------------------------------- */

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="mill-faq__item">
      <button
        className="mill-faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {q}
        <span className={`mill-faq__icon ${isOpen ? "mill-faq__icon--open" : ""}`} aria-hidden="true">
          +
        </span>
      </button>
      <div className={`mill-faq__answer ${isOpen ? "mill-faq__answer--open" : ""}`}>
        <p>{a}</p>
      </div>
    </div>
  );
}

/* A simple fade-in wrapper using IntersectionObserver */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   PAGE
--------------------------------------------------------------- */

export default function MillJourneyPage() {
  useSeo(
    "The Mill Journey — A Living Himalayan Water Mill Experience | GHARRAT",
    "Step inside a working Himalayan water mill. Meet the miller family, grind your own flour, share a traditional lunch. A slow, genuine experience in Kangra Valley."
  );

  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  function handleContact() {
    navigate("/contact");
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="mill-hero" aria-label="The Mill Journey hero">
        <MillImage className="mill-hero__image" />
        <div className="mill-hero__overlay" aria-hidden="true" />
        <div className="mill-hero__content container">
          <span className="eyebrow eyebrow--light mill-hero__eyebrow">The Mill Journey</span>
          <h1 className="mill-hero__heading">
            Not every journey begins<br />
            with a <em>destination.</em><br />
            Some begin with a river.
          </h1>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mill-story" aria-labelledby="mill-story-heading">
        <div className="container">
          <div className="mill-story__inner">

            <Reveal>
              <span className="eyebrow mill-story__label">Why Water Mills Still Matter</span>
              <h2 className="mill-story__heading" id="mill-story-heading">
                A machine built by the river,<br />for the village
              </h2>
              <div className="mill-story__body">
                <p>
                  For centuries, every Himalayan village depended on its <em>gharat</em> — a water mill
                  built into the bank of a stream, using the force of falling water to turn millstones
                  and grind grain. No electricity. No diesel. No noise beyond the creek and the slow
                  rotation of stone on stone.
                </p>
                <p>
                  Stone-ground flour retains the germ and the bran. The slow grinding generates no
                  heat to damage oils or nutrients. The result is flour that tastes and nourishes
                  differently — something you can only understand by tasting it.
                </p>
                <p>
                  Most gharats have gone quiet. Replaced by diesel mills at the roadside, or left
                  to ruin as younger generations move toward cities. What remains are the families
                  who stayed — and a few mills that still turn.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mill-story__aside">
                <blockquote className="mill-story__pull">
                  "The mill doesn't belong to us. It belongs to whoever brings grain."
                </blockquote>
                <ul className="mill-story__fact-list" aria-label="Mill facts">
                  <li className="mill-story__fact">
                    <span className="mill-story__fact-label">Location</span>
                    <span className="mill-story__fact-value">Kangra Valley, Himachal Pradesh</span>
                  </li>
                  <li className="mill-story__fact">
                    <span className="mill-story__fact-label">Altitude</span>
                    <span className="mill-story__fact-value">~1,200m above sea level</span>
                  </li>
                  <li className="mill-story__fact">
                    <span className="mill-story__fact-label">Mill Age</span>
                    <span className="mill-story__fact-value">Over 120 years in operation</span>
                  </li>
                  <li className="mill-story__fact">
                    <span className="mill-story__fact-label">Power Source</span>
                    <span className="mill-story__fact-value">Mountain stream, no electricity</span>
                  </li>
                  <li className="mill-story__fact">
                    <span className="mill-story__fact-label">Group Size</span>
                    <span className="mill-story__fact-value">Maximum 8 guests</span>
                  </li>
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="mill-timeline" aria-labelledby="mill-timeline-heading">
        <div className="container">
          <Reveal className="mill-timeline__head">
            <span className="eyebrow eyebrow--light">A Day at the Mill</span>
            <h2 className="mill-timeline__heading" id="mill-timeline-heading">
              The Experience
            </h2>
          </Reveal>
          <div className="mill-timeline__grid" role="list">
            {timelineSteps.map((step) => (
              <Reveal key={step.title}>
                <article className="mill-timeline__step" role="listitem">
                  <p className="mill-timeline__step-time">{step.time}</p>
                  <h3 className="mill-timeline__step-title">{step.title}</h3>
                  <p className="mill-timeline__step-desc">{step.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MILLER ============ */}
      <section className="mill-miller" aria-labelledby="mill-miller-heading">
        <div className="container">
          <div className="mill-miller__inner">

            <Reveal>
              <div className="mill-miller__portrait">
                <MillImage className="mill-miller__portrait-img" />
              </div>
            </Reveal>

            <Reveal>
              <div className="mill-miller__content">
                <span className="eyebrow mill-miller__eyebrow">Meet the Family</span>
                <h2 className="mill-miller__name" id="mill-miller-heading">
                  The Thakur Family
                </h2>
                <p className="mill-miller__role">Millers · Kangra Valley · Fourth Generation</p>

                <blockquote className="mill-miller__quote">
                  "My grandfather built this with neighbours. I've repaired it every season.
                  My son knows how too — though he says he'll keep it running for visitors now, not just farmers."
                </blockquote>

                <div className="mill-miller__bio">
                  <p>
                    The Thakurs have operated this mill through four generations and two floods that
                    took out the main channel. Each time, the village came to rebuild it. Not because
                    anyone asked — because it was theirs.
                  </p>
                  <p>
                    Today, the mill still grinds grain for a handful of families in the valley. The
                    Thakurs open their home to guests who want to understand what slow food looked
                    like before that phrase existed.
                  </p>
                </div>

                <div className="mill-miller__heritage" aria-label="Family heritage statistics">
                  <div className="mill-miller__stat">
                    <span className="mill-miller__stat-number">4</span>
                    <span className="mill-miller__stat-label">Generations</span>
                  </div>
                  <div className="mill-miller__stat">
                    <span className="mill-miller__stat-number">120+</span>
                    <span className="mill-miller__stat-label">Years Running</span>
                  </div>
                  <div className="mill-miller__stat">
                    <span className="mill-miller__stat-number">0</span>
                    <span className="mill-miller__stat-label">Electricity Used</span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="mill-gallery" aria-labelledby="mill-gallery-heading">
        <div className="container">
          <Reveal className="mill-gallery__head">
            <span className="eyebrow">From the Mill</span>
            <h2 className="mill-gallery__heading" id="mill-gallery-heading">
              What You'll See
            </h2>
          </Reveal>
          <div className="mill-gallery__grid" role="list" aria-label="Mill experience gallery">
            {[
              "The water wheel in motion",
              "Stone grinding chamber",
              "The village path at morning",
              "Fresh flour on stone",
              "Family courtyard at lunch",
            ].map((caption) => (
              <div className="mill-gallery__item" key={caption} role="listitem">
                <MillImage
                  className="mill-gallery__img"
                  alt={caption}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="mill-includes" aria-labelledby="mill-includes-heading">
        <div className="container">
          <Reveal className="mill-includes__head">
            <span className="eyebrow eyebrow--light">Everything Included</span>
            <h2 className="mill-includes__heading" id="mill-includes-heading">
              What's Included
            </h2>
          </Reveal>
          <div className="mill-includes__grid" role="list">
            {includes.map((item) => (
              <Reveal key={item.title}>
                <article className="mill-includes__item" role="listitem">
                  <span className="mill-includes__icon">{item.icon}</span>
                  <h3 className="mill-includes__title">{item.title}</h3>
                  <p className="mill-includes__desc">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mill-faq" aria-labelledby="mill-faq-heading">
        <div className="container">
          <Reveal className="mill-faq__head">
            <span className="eyebrow">Before You Come</span>
            <h2 className="mill-faq__heading" id="mill-faq-heading">
              Common Questions
            </h2>
          </Reveal>
          <div className="mill-faq__list">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="mill-cta" aria-labelledby="mill-cta-heading">
        <div className="container">
          <Reveal>
            <span className="eyebrow mill-cta__eyebrow">Ready When You Are</span>
            <h2 className="mill-cta__heading" id="mill-cta-heading">
              Plan Your Visit
            </h2>
            <p className="mill-cta__sub">
              Reach out and we'll share the details — dates, directions, and everything
              you need to know before you arrive.
            </p>
            <button
              className="btn btn-light"
              onClick={handleContact}
              aria-label="Contact us to plan your mill visit"
            >
              Get in Touch
            </button>
            <p className="mill-cta__note">
              Small groups only · Maximum 8 guests · Kangra Valley, Himachal Pradesh
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
