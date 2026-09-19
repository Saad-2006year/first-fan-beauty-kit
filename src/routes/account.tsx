import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/account")({ head: () => ({ meta: [{ title: "My Account — FIRST FAN" }, { name: "description", content: "Sign in and manage your FIRST FAN orders." }, { property: "og:title", content: "My Account — FIRST FAN" }, { property: "og:description", content: "Your orders and FIRST FAN profile." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Account });

function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { full_name: String(form.get("name") ?? "") } } });
    setBusy(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (!result.data.session) {
      setMessage("Almost there — check your email to confirm your account.");
      return;
    }
    setMessage("");
    await navigate({ to: "/shop" });
  }

  async function signInWithGoogle() {
    setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (result.redirected) return;
    await navigate({ to: "/shop" });
  }

  if (user) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-[2rem] bg-secondary p-7">
          <p className="text-xs font-extrabold uppercase text-accent">My account</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Hi, {user.user_metadata["full_name"] || "First Fan"}!</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-xl"><Link to="/tracking">View my orders</Link></Button>
            <Button variant="outline" className="rounded-xl" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-[2rem] border-2 border-border bg-card p-6">
        <p className="text-xs font-extrabold uppercase text-accent">Welcome, fan</p>
        <h1 className="mt-2 font-display text-3xl font-bold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <Button variant="outline" className="mt-6 h-12 w-full rounded-xl font-bold" onClick={signInWithGoogle}>Continue with Google — 1 tap</Button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or with email<span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={submit} className="grid gap-3">
          {mode === "signup" && <Input name="name" required placeholder="Full name" className="h-12 rounded-xl" />}
          <Input name="email" required type="email" autoComplete="email" placeholder="Email" className="h-12 rounded-xl" />
          <Input name="password" required type="password" minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder="Password (min 6 characters)" className="h-12 rounded-xl" />
          <Button disabled={busy} type="submit" className="h-12 rounded-xl">{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}</Button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-bold text-primary">{message}</p>}
        <button type="button" className="mt-5 w-full text-sm font-bold text-primary" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>{mode === "signin" ? "New here? Create account" : "Already a fan? Sign in"}</button>
      </div>
    </main>
  );
}
