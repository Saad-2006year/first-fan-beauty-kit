import { Link } from "@tanstack/react-router";
import { Heart, Menu, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import logoAsset from "@/assets/first-fan-logo.jpeg.asset.json";

export function Brand() {
  return <Link to="/" className="flex items-center gap-2" aria-label="First Fan home">
    <img src={logoAsset.url} alt="" className="size-10 rounded-2xl object-cover" width={40} height={40} />
    <span className="leading-none"><strong className="block font-display text-lg">FIRST FAN</strong><span className="mt-1 block text-[10px] font-extrabold uppercase text-accent">K-Beauty</span></span>
  </Link>;
}

export function StoreShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const links = [{ to: "/shop", label: "Shop" }, { to: "/about", label: "About" }, { to: "/gallery", label: "Gallery" }, { to: "/contact", label: "Contact" }] as const;
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-7 md:flex">{links.map((link) => <Link key={link.to} to={link.to} className="text-sm font-bold text-muted-foreground hover:text-primary" activeProps={{ className: "text-primary" }}>{link.label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon" className="rounded-2xl"><Link to="/account" aria-label="Account"><UserRound /></Link></Button>
          <Button asChild variant="outline" size="icon" className="relative rounded-2xl"><Link to="/cart" aria-label={`Cart with ${count} items`}><ShoppingBag />{count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-extrabold text-accent-foreground">{count}</span>}</Link></Button>
          <Button variant="outline" size="icon" className="rounded-2xl md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && <nav className="grid border-t-2 border-border bg-background px-4 py-3 md:hidden">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="py-3 font-display text-lg font-bold">{link.label}</Link>)}</nav>}
    </header>
    {children}
    <footer className="mt-16 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div><div className="font-display text-3xl font-bold">FIRST FAN</div><p className="mt-2 text-sm text-background/70">K-Beauty, First Choice.</p><p className="mt-5 max-w-sm text-sm text-background/55">Curated skincare and wellness rituals for every kind of glow.</p></div>
        <div><p className="font-display font-bold">Explore</p><div className="mt-3 grid gap-2 text-sm text-background/70"><Link to="/shop">Shop</Link><Link to="/about">Our story</Link><Link to="/tracking">Track order</Link></div></div>
        <div><p className="font-display font-bold">Good to know</p><div className="mt-3 grid gap-2 text-sm text-background/70"><span>Authenticity guaranteed</span><span>Delivery across Pakistan</span><span>Secure checkout</span></div></div>
      </div>
      <div className="border-t border-background/10 px-5 py-4 text-center text-xs text-background/50">© 2026 First Fan Beauty (Private) Limited</div>
    </footer>
  </div>;
}

export function TrustStrip() {
  return <div className="flex items-center gap-3 rounded-3xl bg-secondary p-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-card"><Sparkles className="text-primary" /></span><div><div className="font-display font-bold">Authentic K-Beauty, always</div><div className="text-xs text-muted-foreground">Carefully sourced. Thoughtfully delivered.</div></div></div>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="mx-auto max-w-md py-24 text-center"><Heart className="mx-auto size-10 text-accent" /><h1 className="mt-4 font-display text-3xl font-bold">{title}</h1><p className="mt-2 text-muted-foreground">{text}</p><Button asChild className="mt-6 rounded-xl"><Link to="/shop">Browse products</Link></Button></div>;
}