import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";
import About from "./pages/About";
import Producers from "./pages/Producers";
import Contact from "./pages/Contact";
import { Shipping, Privacy, Terms } from "./pages/PolicyPages";
import NotFound from "./pages/NotFound";

import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:categorySlug" element={<Shop />} />
      <Route path="/shop/:categorySlug/:productSlug" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmed" element={<OrderConfirmed />} />
      <Route path="/about" element={<About />} />
      <Route path="/producers" element={<Producers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Header />
        <CartDrawer />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
      </CartProvider>
    </BrowserRouter>
  );
}
