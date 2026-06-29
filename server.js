/**
 * GHARRAT — Backend Server
 * Handles Razorpay order creation and payment verification.
 * Run with: node server.js
 * Runs on port 3001 alongside the Vite frontend (port 5173).
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "https://gharrat.in"] }));

// ── Razorpay instance ─────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Health check ──────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.RAZORPAY_KEY_ID?.startsWith("rzp_live") ? "LIVE" : "TEST" });
});

// ── STEP 1: Create Razorpay Order ─────────────────────────────────
// Called before opening the payment modal.
// amount is in RUPEES — we convert to paise here.
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "amount is required and must be a number" });
    }

    const amountPaise = Math.round(Number(amount) * 100);
    if (amountPaise < 100) {
      return res.status(400).json({ error: "Minimum amount is ₹1 (100 paise)" });
    }

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });

    console.log(`[ORDER] Created: ${order.id} | ₹${amount} | ${receipt || ""}`);

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("[ORDER ERROR]", err?.error || err.message);
    res.status(500).json({ error: "Failed to create order", details: err?.error?.description });
  }
});

// ── STEP 2: Verify Payment Signature ─────────────────────────────
// Called after successful payment. Verifies the signature
// using HMAC-SHA256 to confirm payment genuinely came from Razorpay.
app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      console.warn(`[VERIFY] Signature mismatch for order ${razorpay_order_id}`);
      return res.status(400).json({ error: "Payment verification failed — signature mismatch" });
    }

    // ✅ Payment is genuine
    console.log(`[VERIFY] ✅ Payment confirmed: ${razorpay_payment_id} for order ${razorpay_order_id}`);

    // TODO (when you have a database): save order to DB here
    // await db.orders.create({ orderId: razorpay_order_id, paymentId: razorpay_payment_id, ... })

    res.json({
      success: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error("[VERIFY ERROR]", err.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ── Start server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  const mode = process.env.RAZORPAY_KEY_ID?.startsWith("rzp_live") ? "🟢 LIVE" : "🟡 TEST";
  console.log(`\n✅ GHARRAT backend running on http://localhost:${PORT}`);
  console.log(`   Razorpay mode: ${mode}`);
  console.log(`   Endpoints: POST /api/create-order  POST /api/verify-payment\n`);
});
