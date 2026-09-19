import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — FIRST FAN" },
      { name: "description", content: "Discover FIRST FAN's vision to make authentic Korean beauty more accessible across Pakistan." },
      { property: "og:title", content: "Our Story — FIRST FAN" },
      { property: "og:description", content: "Building Pakistan's leading K-Beauty and beauty-wellness platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const story = [
  "FIRST FAN was created with a simple vision: to make authentic Korean beauty more accessible to consumers in Pakistan.",
  "Korea has become one of the world's most influential beauty markets, known for innovation, skincare technology, ingredient-focused products and constantly evolving beauty trends.",
  "FIRST FAN aims to connect Pakistani consumers with carefully selected Korean beauty brands and products through a modern, trustworthy and customer-focused retail experience.",
  "We do more than import cosmetics. We discover emerging beauty trends, curate products, educate consumers and create a platform where customers can explore Korean beauty with confidence.",
  "Our long-term vision is to build Pakistan's leading K-Beauty and beauty-wellness platform, combining international brands, digital commerce, physical retail, beauty education and eventually our own private-label products.",
];

function About() {
  return (
    <main>
      <section className="border-b-2 border-border bg-secondary">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 lg:px-8">
          <p className="text-xs font-extrabold uppercase text-secondary-foreground">K-Beauty &amp; Wellness</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-none md:text-7xl">Our Story</h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-secondary-foreground/75">
            Authentic Korean beauty, thoughtfully selected for Pakistan.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_17rem] md:py-16 lg:px-8">
        <div className="space-y-6">
          {story.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "font-display text-2xl font-semibold leading-snug" : "text-base leading-8 text-muted-foreground md:text-lg"}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="self-start border-l-4 border-accent pl-5 md:sticky md:top-24" aria-label="FIRST FAN brand details">
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-extrabold uppercase text-accent">Brand</dt>
              <dd className="mt-1 font-display text-2xl font-bold">FIRST FAN</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase text-accent">Company</dt>
              <dd className="mt-1 font-semibold leading-snug">First Fan Beauty (Private) Limited</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase text-accent">Positioning</dt>
              <dd className="mt-1 font-semibold">K-Beauty &amp; Wellness</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center lg:px-8">
          <p className="font-display text-3xl font-bold md:text-5xl">FIRST FAN</p>
          <p className="mt-3 text-lg font-bold">K-Beauty, First Choice.</p>
        </div>
      </section>
    </main>
  );
}