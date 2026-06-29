export const reviews = [
  {
    id: 1,
    name: "Ananya R.",
    location: "Bengaluru",
    rating: 5,
    text:
      "The crystallisation was actually what convinced me it was real. Tastes like the honey my grandmother used to bring from the hills — nothing like the supermarket stuff.",
    verified: true,
  },
  {
    id: 2,
    name: "Rohan M.",
    location: "Mumbai",
    rating: 5,
    text:
      "Gifted the 500g jar to my parents and they immediately asked where to reorder from. The packaging alone felt like something worth giving.",
    verified: true,
  },
  {
    id: 3,
    name: "Devika S.",
    location: "Delhi NCR",
    rating: 4,
    text:
      "Genuinely raw — you can taste the difference batch to batch, which I've come to like. Wish the 1kg jar shipped a little faster, but worth the wait.",
    verified: true,
  },
  {
    id: 4,
    name: "Karan T.",
    location: "Chandigarh",
    rating: 5,
    text:
      "Been buying local honey for years and this is the first brand that tells you which apiary it came from. That traceability matters to me.",
    verified: true,
  },
];

export function getAverageRating() {
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / reviews.length).toFixed(1);
}
