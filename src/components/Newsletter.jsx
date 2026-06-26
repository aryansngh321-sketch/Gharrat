import { useState } from "react";
import { saveNewsletter } from "../services/googleSheets";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  async function handleSubmit(e) {
  e.preventDefault();

  console.log(email);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus("error");
    return;
  }

  try {
    await saveNewsletter(email);
    setStatus("success");
    setEmail("");
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
}

  return (
    <section className="newsletter">
      <div className="container container-narrow newsletter__inner">
        <span className="eyebrow eyebrow--light">Stay Close To The Source</span>
        <h2 className="newsletter__heading">Join the GHARRAT Collective</h2>
        <p className="newsletter__body">
          New harvests, producer stories, and early access to limited batches —
          sent only when there's something worth saying.
        </p>
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            required
          />
          <button type="submit" className="btn btn-light">Subscribe</button>
        </form>
        {status === "success" && (
          <p className="newsletter__feedback is-success">You're in. Welcome to the Collective.</p>
        )}
        {status === "error" && (
          <p className="newsletter__feedback is-error">That doesn't look like a valid email — try again.</p>
        )}
      </div>
    </section>
  );
}
