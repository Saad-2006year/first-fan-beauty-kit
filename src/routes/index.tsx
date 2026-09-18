import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustStrip } from "@/components/store-shell";
import { money, products, useCart } from "@/lib/store";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FIRST FAN — K-Beauty, First Choice" },
    { name: "description", content: "Shop playful, authentic Korean skincare and wellness essentials from FIRST FAN." },
    { property: "og:title", content: "FIRST FAN — K-Beauty, First Choice" },
    { property: "og:description", content: "Your first choice for curated K-Beauty and wellness." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const { add } = useCart();
  return (
    <main className="mx-auto max-w-6xl px-4 pb-8 pt-5 lg:px-8 lg:pt-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-primary-foreground md:min-h-[430px] md:p-12">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/40" /><div className="absolute -bottom-12 left-1/3 size-28 rounded-full bg-orange-400/50" />
        <div className="relative max-w-xl animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-[11px] font-extrabold uppercase"><Sparkles className="size-3.5" /> K-Beauty, First Choice.</span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[.95] md:text-7xl">Glow up,<br />start here.</h1>
          <p className="mt-5 max-w-md text-base text-primary-foreground/85 md:text-lg">Curated Korean skincare and wellness, delivered across Pakistan with authenticity guaranteed.</p>
          <Button asChild variant="hero" size="jumbo" className="mt-7 w-full md:w-auto"><Link to="/shop">Shop the collection <ArrowRight /></Link></Button>
        </div>
      </section>

      <section className="mt-7">
        <div className="flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase text-accent">Fan favourites</p><h2 className="mt-1 font-display text-3xl font-bold">Trending now</h2></div><Link to="/shop" className="text-sm font-extrabold text-primary">View all →</Link></div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{products.map((product) => <article key={product.id} className="rounded-3xl border-2 border-border bg-card p-3 transition-transform hover:-translate-y-1">
          <Link to="/product/$productId" params={{ productId: product.id }}><img src={product.image} alt={product.name} width={816} height={816} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /><h3 className="mt-3 font-display font-bold leading-tight">{product.name}</h3><p className="text-xs text-muted-foreground">{product.detail}</p></Link>
          <div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-extrabold md:text-base">{money(product.price)}</span><Button variant="pop" size="icon" onClick={() => add(product.id)} aria-label={`Add ${product.name}`}><Plus /></Button></div>
        </article>)}</div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2"><TrustStrip /><div className="flex items-center gap-3 rounded-3xl bg-muted p-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card text-xl">🇰🇷</span><div><div className="font-display font-bold">Seoul-picked, Pakistan-ready</div><div className="text-xs text-muted-foreground">Skin-first formulas for real routines.</div></div></div></section>
    </main>
  );
}
