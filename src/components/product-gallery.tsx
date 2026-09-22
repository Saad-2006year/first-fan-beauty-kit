import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(images.length - 1, index));
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    setActive(next);
  };

  const updateActive = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className="min-w-0" aria-label={`${name} image gallery`}>
      <div className="group relative overflow-hidden rounded-[2rem] bg-muted">
        <div
          ref={trackRef}
          onScroll={updateActive}
          className="flex aspect-square snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${name} — view ${index + 1} of ${images.length}`}
              width={816}
              height={816}
              loading={index === 0 ? "eager" : "lazy"}
              className="aspect-square w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        <Button
          variant="secondary"
          size="icon"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous product image"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-sm disabled:opacity-30"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => goTo(active + 1)}
          disabled={active === images.length - 1}
          aria-label="Next product image"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-sm disabled:opacity-30"
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2" aria-label="Choose product image">
        {images.map((image, index) => (
          <Button
            key={image}
            variant="ghost"
            size="icon"
            onClick={() => goTo(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            className="size-7 rounded-full p-0"
          >
            <span className={`block rounded-full transition-all ${active === index ? "h-2.5 w-6 bg-primary" : "size-2.5 bg-muted-foreground/35"}`} />
          </Button>
        ))}
      </div>
    </div>
  );
}