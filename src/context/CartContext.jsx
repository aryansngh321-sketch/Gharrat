import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "gharrat_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — fail silently, cart still works in-session */
    }
  }, [items]);

  function addItem(product, variant, qty = 1) {
    setItems((prev) => {
      const key = `${product.id}__${variant.id}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          variantId: variant.id,
          variantLabel: variant.label,
          price: variant.price,
          image: product.images[0],
          qty,
        },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function updateQty(key, qty) {
    if (qty < 1) return removeItem(key);
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)));
  }

  function applyDiscount(code) {
    const known = {
      GHARRAT10: { code: "GHARRAT10", percent: 10 },
      FIRSTJAR: { code: "FIRSTJAR", percent: 15 },
    };
    const found = known[code.trim().toUpperCase()];
    if (found) {
      setDiscount(found);
      return { success: true, message: `${found.percent}% off applied.` };
    }
    return { success: false, message: "That code isn't valid. Check and try again." };
  }

  function clearDiscount() {
    setDiscount(null);
  }

  function clearCart() {
    setItems([]);
    setDiscount(null);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountAmount = discount ? Math.round((subtotal * discount.percent) / 100) : 0;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const value = {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQty,
    discount,
    applyDiscount,
    clearDiscount,
    clearCart,
    subtotal,
    discountAmount,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
