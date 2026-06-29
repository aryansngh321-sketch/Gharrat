import { useState } from "react";

/**
 * WhatsAppOptIn — two modes:
 *   mode="reorder"   product page: "remind me to reorder"
 *   mode="waitlist"  coming-soon category: "notify me when ready"
 */
export default function WhatsAppOptIn({ mode = "reorder", categoryName = "" }) {
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function validate(num) {
    const clean = num.replace(/\D/g, "");
    return clean.length === 10 || (clean.length === 12 && clean.startsWith("91"));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    setError("");
    // In production: POST to backend or WhatsApp Business API to register number
    // e.g. POST /api/whatsapp-optin { phone, mode, category: categoryName }
    setDone(true);
  }

  const config = {
    reorder: {
      icon: "🍯",
      heading: "Get reorder reminders on WhatsApp",
      subtext: "We'll ping you when your jar is likely running low. No spam — one message, when it matters.",
      cta: "Set reminder",
      success: "Done. We'll remind you on WhatsApp before you run out.",
    },
    waitlist: {
      icon: "🌿",
      heading: `Be first to know when ${categoryName} is ready`,
      subtext: "We're still working with growers on this one. One WhatsApp message when it launches — nothing else.",
      cta: "Notify me",
      success: `You're on the list. We'll WhatsApp you the moment ${categoryName} is ready.`,
    },
  };

  const c = config[mode] || config.reorder;

  if (done) {
    return (
      <div className="wa-optin wa-optin--done">
        <span className="wa-optin__check">✓</span>
        <p>{c.success}</p>
      </div>
    );
  }

  return (
    <div className="wa-optin">
      <div className="wa-optin__header">
        <span className="wa-optin__icon">{c.icon}</span>
        <div>
          <p className="wa-optin__heading">{c.heading}</p>
          <p className="wa-optin__sub">{c.subtext}</p>
        </div>
      </div>
      <form className="wa-optin__form" onSubmit={handleSubmit}>
        <div className="wa-optin__input-wrap">
          <span className="wa-optin__prefix">+91</span>
          <input
            type="tel"
            placeholder="98XXXXXXXX"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setError(""); }}
            maxLength={10}
            aria-label="WhatsApp mobile number"
          />
        </div>
        <button type="submit" className="btn btn-primary wa-optin__btn">
          {c.cta}
        </button>
      </form>
      {error && <p className="wa-optin__error">{error}</p>}
      <p className="wa-optin__legal">
        By submitting you agree to receive one WhatsApp message from GHARRAT. No marketing lists.
      </p>
    </div>
  );
}
