import { useEffect, useRef, useState } from "react";

/**
 * useInView — returns [ref, isVisible].
 * Once an element enters the viewport it stays "visible" (one-shot by default).
 * Pass { reset: true } to re-trigger every time.
 */
export default function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!options.reset) observer.unobserve(el);
        } else if (options.reset) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -60px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.reset, options.threshold, options.rootMargin]);

  return [ref, isVisible];
}
