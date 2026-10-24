import { siteMedia } from "@/data/site-media";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import RetreatCard from "@/components/RetreatCard";
import { retreats } from "@/data/site";
import { useDocumentMeta } from "@/hooks/useReveal";
const snowPeaks = siteMedia["snow-peaks.webp"];

const filters = [
  { id: "all", label: "All" },
  { id: "mountain", label: "Mountain" },
  { id: "forest", label: "Forest" },
  { id: "premium", label: "Premium" },
];

export default function Destinations() {
  useDocumentMeta("Destinations — Nitara Stays", "Explore our nine curated mountain retreats in Mukteshwar.");
  const [f, setF] = useState("all");
  const list = f === "all" ? retreats : retreats.filter(r => r.type === f);
  return (
    <>
      <PageHero image={snowPeaks} eyebrow="Our Collection" title="The Retreats" subtitle="Nine sanctuaries, each with its own character — all with the Himalayas as the view." />
      <section className="py-20 bg-ivory">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {filters.map(x => (
              <button key={x.id} onClick={() => setF(x.id)} className={`px-6 py-2 text-xs uppercase tracking-[0.25em] border transition-all ${f === x.id ? "bg-charcoal text-ivory border-charcoal" : "border-charcoal/20 hover:border-gold hover:text-gold"}`}>{x.label}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map(r => <div key={r.id} className="reveal"><RetreatCard r={r} /></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
