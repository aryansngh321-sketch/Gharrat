import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="contact-page section">
      <div className="container-narrow">
        <span className="eyebrow">Get In Touch</span>
        <h1>Contact GHARRAT</h1>
        <p className="contact-page__lead">
          Questions about an order, a producer, or just want to say hello —
          we read every message ourselves.
        </p>

        <div className="contact-page__options">
          <a href="https://wa.me/919882238158" target="_blank" rel="noopener noreferrer" className="contact-option">
            <strong>WhatsApp</strong>
            <span>Fastest way to reach us — usually within the hour.</span>
          </a>
          <a href="mailto:hello@gharrat.in" className="contact-option">
            <strong>Email</strong>
            <span>hello@gharrat.in</span>
          </a>
          <a href="https://instagram.com/gharrat.in" target="_blank" rel="noopener noreferrer" className="contact-option">
            <strong>Instagram</strong>
            <span>@gharrat.in — DMs open</span>
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input required value={form.name} onChange={update("name")} />
          </label>
          <label>
            Email
            <input type="email" required value={form.email} onChange={update("email")} />
          </label>
          <label>
            Message
            <textarea rows={5} required value={form.message} onChange={update("message")} />
          </label>
          <button type="submit" className="btn btn-primary">Send Message</button>
          {sent && <p className="newsletter__feedback is-success">Thanks — we'll be in touch soon.</p>}
        </form>
      </div>
    </div>
  );
}
