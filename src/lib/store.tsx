import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import serum from "@/assets/glass-skin-serum.jpg";
import serumDetail from "@/assets/glass-skin-serum-detail.jpg";
import serumLifestyle from "@/assets/glass-skin-serum-lifestyle.jpg";
import cleanser from "@/assets/peach-cloud-cleanser.jpg";
import cleanserDetail from "@/assets/peach-cloud-cleanser-detail.jpg";
import cleanserLifestyle from "@/assets/peach-cloud-cleanser-lifestyle.jpg";
import tea from "@/assets/dream-wellness-tea.jpg";
import teaDetail from "@/assets/dream-wellness-tea-detail.jpg";
import teaLifestyle from "@/assets/dream-wellness-tea-lifestyle.jpg";
import mask from "@/assets/rose-petal-mask.jpg";
import maskDetail from "@/assets/rose-petal-mask-detail.jpg";
import maskLifestyle from "@/assets/rose-petal-mask-lifestyle.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Serums" | "Cleansers" | "Wellness" | "Masks";
  detail: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  ingredients: string[];
};

export const products: Product[] = [
  { id: "glass-skin-serum", name: "Glass-Skin Serum", category: "Serums", detail: "30ml · Hydrating", description: "A bouncy daily serum that layers deep hydration with a luminous, glass-skin finish.", price: 8950, image: serum, images: [serum, serumDetail, serumLifestyle], ingredients: ["Niacinamide", "Hyaluronic acid", "Centella"] },
  { id: "peach-cloud-cleanser", name: "Peach Cloud Cleanser", category: "Cleansers", detail: "150ml · Gentle", description: "A low-pH gel-to-foam cleanser that lifts away sunscreen without leaving skin tight.", price: 6650, image: cleanser, images: [cleanser, cleanserDetail, cleanserLifestyle], ingredients: ["Peach water", "Betaine", "Panthenol"] },
  { id: "dream-wellness-tea", name: "Dream Wellness Tea", category: "Wellness", detail: "10 packs · Calming", description: "A caffeine-free evening blend made for a slower, softer end to your day.", price: 4950, image: tea, images: [tea, teaDetail, teaLifestyle], ingredients: ["Lavender", "Chamomile", "Lemon balm"] },
  { id: "rose-petal-mask", name: "Rose Petal Mask", category: "Masks", detail: "5 sheets · Glow", description: "Silky hydrogel masks that cool, plump and revive tired-looking skin in 15 minutes.", price: 4250, image: mask, images: [mask, maskDetail, maskLifestyle], ingredients: ["Rose water", "Ceramide", "Allantoin"] },
];

export const money = (value: number) => `Rs ${value.toLocaleString("en-PK")}`;

type CartContextValue = {
  items: Record<string, number>;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  useEffect(() => {
    const saved = window.localStorage.getItem("first-fan-cart");
    if (saved) setItems(JSON.parse(saved) as Record<string, number>);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("first-fan-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    add: (id: string) => setItems((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 })),
    remove: (id: string) => setItems((current) => { const next = { ...current }; delete next[id]; return next; }),
    setQuantity: (id: string, quantity: number) => setItems((current) => quantity < 1 ? Object.fromEntries(Object.entries(current).filter(([key]) => key !== id)) : ({ ...current, [id]: quantity })),
    clear: () => setItems({}),
    count: Object.values(items).reduce((sum, quantity) => sum + quantity, 0),
    subtotal: products.reduce((sum, product) => sum + product.price * (items[product.id] ?? 0), 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}