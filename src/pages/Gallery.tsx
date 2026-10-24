import { siteMedia, propertyPhotos } from "@/data/site-media";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useDocumentMeta } from "@/hooks/useReveal";
const sunsetPicnic = siteMedia["sunset-picnic.webp"];
const terrace = siteMedia["terrace.webp"];
const valleyView = siteMedia["valley-view.webp"];
const snowPeaks = siteMedia["snow-peaks.webp"];
const snowVillage = siteMedia["snow-village.webp"];
const snowRoof = siteMedia["snow-roof.webp"];
import { retreats } from "@/data/site";

const filters = ["All", "Retreats", "Landscapes", "Experiences", "Food"] as const;

const items: { src: string; alt?: string; cat: typeof filters[number] }[] = [
  ...propertyPhotos,
  { src: sunsetPicnic, cat: "Experiences" },
  { src: terrace, cat: "Retreats" },
  { src: snowPeaks, cat: "Landscapes" },
  { src: valleyView, cat: "Landscapes" },
  { src: snowVillage, cat: "Landscapes" },
  { src: snowRoof, cat: "Landscapes" },
  ...retreats.map(r => ({ src: r.img, cat: "Retreats" as const })),
  { src: siteMedia["photo-1414235077428-338989a2e8c0.webp"], cat: "Food" },
  { src: siteMedia["photo-1504674900247-0877df9cc836.webp"], cat: "Food" },
];

export default function Gallery() {
  useDocumentMeta("Gallery — Nitara Stays", "Visual diary of the retreat and the Kumaon Himalayas.");
  const [f, setF] = useState<typeof filters[number]>("All");
  const list = f === "All" ? items : items.filter(i => i.cat === f);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((open + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((open - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  return (
    <>
      <PageHero image={terrace} eyebrow="Visual Diary" title="Gallery" subtitle="Moments from the mountain — light, stillness and life at Nitara." />
      <section className="py-16 bg-ivory">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {filters.map(x => (
              <button key={x} onClick={() => setF(x)} className={`px-5 py-2 text-xs uppercase tracking-[0.25em] border transition ${f === x ? "bg-charcoal text-ivory border-charcoal" : "border-charcoal/20 hover:border-gold hover:text-gold"}`}>{x}</button>
            ))}
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {list.map((it, i) => (
              <button key={i} onClick={() => setOpen(i)} className="block w-full mb-4 group overflow-hidden">
                <img src={it.src} loading="lazy" decoding="async" alt={it.alt ?? ""} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open !== null && (
        <div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center animate-fade-in">
          <button onClick={() => setOpen(null)} className="absolute top-6 right-6 text-white"><X size={28} /></button>
          <button onClick={() => setOpen((open - 1 + list.length) % list.length)} className="absolute left-4 md:left-8 text-white"><ChevronLeft size={36} /></button>
          <img src={list[open].src} alt={list[open].alt ?? ""} className="max-w-[92vw] max-h-[88vh] object-contain" />
          <button onClick={() => setOpen((open + 1) % list.length)} className="absolute right-4 md:right-8 text-white"><ChevronRight size={36} /></button>
        </div>
      )}
    </>
  );
}
