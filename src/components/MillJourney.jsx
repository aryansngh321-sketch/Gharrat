import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MillImage } from "./BrandArt";
import "../styles/MillJourney.css";

const highlights = [
  "Guided Village Walk",
  "Traditional Water Mill Demonstration",
  "Local Tea & Stories",
  "Freshly Ground Flour",
];

export default function MillJourney() {
  const textRef = useRef(null);
  const visualRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const els = [textRef.current, visualRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mill-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mill-teaser section" aria-labelledby="mill-teaser-heading">
      <div className="container">
        <div className="mill-teaser__inner">

          <div className="mill-teaser__text" ref={textRef}>
            <span className="eyebrow mill-teaser__eyebrow">The Mill Journey</span>
            <h2 className="mill-teaser__heading" id="mill-teaser-heading">
              Where the River Still<br />Turns the Wheel
            </h2>
            <p className="mill-teaser__body">
              For centuries, Himalayan families have trusted flowing mountain water to grind grain slowly,
              preserving flavour, nutrition and tradition.
              <br /><br />
              Step inside a living water mill. Meet the family. Watch the wheel turn.
              Grind your own flour. Share tea and stories that never make it into guidebooks.
            </p>

            <ul className="mill-teaser__highlights" aria-label="What's included">
              {highlights.map((item) => (
                <li className="mill-teaser__highlight" key={item}>
                  <span className="mill-teaser__highlight-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/mill-journey")}
              aria-label="Discover The Mill Journey experience"
            >
              Discover The Mill Journey
            </button>
          </div>

          <div className="mill-teaser__visual" ref={visualRef} aria-hidden="true">
            <MillImage className="mill-teaser__image" />
            <span className="mill-teaser__image-caption">Himalayan Water Mill · Kangra Valley</span>
          </div>

        </div>
      </div>
    </section>
  );
}
