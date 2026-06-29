import { useEffect } from "react";

export default function useSeo(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} | GHARRAT` : "GHARRAT — Raw Himalayan Honey & Mountain Foods";
    document.title = fullTitle;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute("content", description);
  }, [title, description]);
}
