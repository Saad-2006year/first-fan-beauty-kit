import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money, products, useCart } from "@/lib/store";

export function ProductGrid({ category }: { category?: string }) {
  const { add } = useCart();
  const shown = category && category !== "All" ? products.filter((item) => item.category === category) : products;
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">{shown.map((product) => <article key={product.id} className="rounded-3xl border-2 border-border bg-card p-3">
    <Link to="/product/$productId" params={{ productId: product.id }}><img src={product.image} alt={product.name} width={816} height={816} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /><p className="mt-3 text-[10px] font-extrabold uppercase text-accent">{product.category}</p><h2 className="font-display font-bold leading-tight">{product.name}</h2><p className="text-xs text-muted-foreground">{product.detail}</p></Link>
    <div className="mt-3 flex items-center justify-between"><span className="text-sm font-extrabold">{money(product.price)}</span><Button variant="pop" size="icon" onClick={() => add(product.id)} aria-label={`Add ${product.name}`}><Plus /></Button></div>
  </article>)}</div>;
}

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mb-7 max-w-2xl"><p className="text-xs font-extrabold uppercase text-accent">{eyebrow}</p><h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">{title}</h1><p className="mt-3 text-muted-foreground md:text-lg">{text}</p></div>;
}