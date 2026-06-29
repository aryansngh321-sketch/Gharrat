import { useEffect, useRef, useState } from "react";

/**
 * Reveal — SECTION-level scroll entrance only.
 * Use this only on top-level section wrappers, never on individual
 * paragraphs or items deep inside a section.
 * 
 * Content is always visible and readable. The animation is purely cosmetic.
 */
export default function Reveal({ children, variant = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in viewport on mount? Mark seen immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSeen(true); },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Transition only kicks in after mount, so no flash of invisible content
  const style = {
    opacity: seen ? 1 : 0.999, // effectively visible — just hooks CSS transition
    transform: seen ? "none" : undefined,
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
