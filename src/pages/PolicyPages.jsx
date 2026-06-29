function PolicyLayout({ eyebrow, title, children }) {
  return (
    <div className="policy-page section">
      <div className="container-narrow">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="policy-page__body">{children}</div>
      </div>
    </div>
  );
}

export function Shipping() {
  return (
    <PolicyLayout eyebrow="Information" title="Shipping Policy">
      <h3>Processing time</h3>
      <p>Orders are packed within 1–2 business days from our facility in Palampur, Himachal Pradesh.</p>
      <h3>Delivery timelines</h3>
      <p>Within India: 3–7 business days depending on location. Metro cities typically see faster delivery; remote areas may take longer.</p>
      <h3>International shipping</h3>
      <p>We currently ship to select international destinations. Delivery typically takes 7–14 business days, and customs duties (if applicable) are the responsibility of the recipient.</p>
      <h3>Shipping costs</h3>
      <p>Calculated at checkout based on weight and destination. We periodically run free-shipping thresholds — these will be shown at checkout when active.</p>
      <h3>Tracking</h3>
      <p>You'll receive a tracking link by email and SMS once your order ships.</p>
    </PolicyLayout>
  );
}

export function Privacy() {
  return (
    <PolicyLayout eyebrow="Information" title="Privacy Policy">
      <h3>What we collect</h3>
      <p>We collect the information you provide at checkout (name, email, phone, address) and basic usage data to improve the site. We do not sell your data to third parties.</p>
      <h3>How we use it</h3>
      <p>To process and ship orders, communicate order updates, and — only if you opt in — send occasional brand and product updates via email.</p>
      <h3>Payment information</h3>
      <p>Payments are processed securely via Razorpay. GHARRAT does not store your card or banking details on our servers.</p>
      <h3>Your rights</h3>
      <p>You can request access to, correction of, or deletion of your personal data at any time by writing to hello@gharrat.in.</p>
    </PolicyLayout>
  );
}

export function Terms() {
  return (
    <PolicyLayout eyebrow="Information" title="Terms of Service">
      <h3>Orders</h3>
      <p>By placing an order, you confirm the information provided is accurate. We reserve the right to cancel orders in cases of suspected fraud or stock unavailability, with a full refund issued.</p>
      <h3>Pricing</h3>
      <p>Prices are listed in INR and may change without notice. The price at the time of order confirmation is the price charged.</p>
      <h3>Returns</h3>
      <p>As a food product, we accept returns only for items damaged in transit or incorrect orders received — please contact us within 48 hours of delivery with photos.</p>
      <h3>Intellectual property</h3>
      <p>All content on this site, including photography, copy, and the GHARRAT name and mark, is the property of GHARRAT and may not be reproduced without permission.</p>
    </PolicyLayout>
  );
}
