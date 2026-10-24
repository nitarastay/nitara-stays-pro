import { Link, useParams } from "react-router-dom";
import { destinations } from "@/data/site";
import PageHero from "@/components/PageHero";
import { useDocumentMeta } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";
import NotFound from "./NotFound";

export default function DestinationDetail() {
  const { slug } = useParams();
  const d = destinations.find(x => x.slug === slug);
  useDocumentMeta(d ? `${d.name} — Nitara Stays` : "Destination", d?.tagline);
  if (!d) return <NotFound />;
  const others = destinations.filter(x => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero image={d.img} eyebrow={`${d.category} · ${d.sub}`} title={d.name} subtitle={d.tagline} />

      <section className="py-20 bg-ivory">
        <div className="container-wide max-w-4xl">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed reveal">{d.intro}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-y border-charcoal/10 py-8 reveal">
            {Object.entries(d.facts).map(([k, v]) => (
              <div key={k}>
                <p className="eyebrow text-gold mb-2">{k}</p>
                <p className="font-serif text-lg">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-wide grid lg:grid-cols-[1fr_320px] gap-12">
          <div className="space-y-5 reveal">
            {d.body.map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed text-[17px]">{p}</p>)}
          </div>
          <aside className="bg-charcoal text-ivory p-7 h-fit lg:sticky lg:top-24 reveal">
            <p className="eyebrow text-gold mb-4">Highlights</p>
            <ul className="space-y-3 text-sm">
              {d.highlights.map(h => <li key={h} className="flex gap-2"><span className="text-gold">✦</span>{h}</li>)}
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10 text-xs text-ivory/70">
              <p className="mb-1"><span className="text-gold">Tip:</span> Visit at sunrise for the most dramatic light.</p>
              <p>Carry water, layered clothing and good walking shoes.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="container-wide grid md:grid-cols-3 gap-4">
          {d.gallery.map((g, i) => <img key={i} src={g} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover reveal" />)}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-wide max-w-3xl">
          <p className="eyebrow text-gold mb-3">Getting There</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">From Nitara Stays</h2>
          <ol className="space-y-6">
            {[
              "Concierge arranges a chauffeured private vehicle from Nitara.",
              `Drive ${d.facts.distance} through forested mountain roads.`,
              "Arrive at the parking area; a short walk leads to the site.",
              "Best visited early morning or late afternoon for ideal light.",
            ].map((s, i) => (
              <li key={i} className="flex gap-5 reveal">
                <span className="font-serif text-3xl text-gold w-10">0{i + 1}</span>
                <p className="text-muted-foreground leading-relaxed pt-1">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-ivory">
        <div className="container-wide">
          <div className="text-center mb-12 reveal">
            <p className="eyebrow text-gold mb-3">Nearby</p>
            <h2 className="font-serif text-4xl">More to Explore</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.map(o => (
              <Link key={o.slug} to={`/destinations/${o.slug}`} className="group block reveal">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.img} alt={o.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="pt-4">
                  <p className="eyebrow text-gold mb-1">{o.category} · {o.sub}</p>
                  <h3 className="font-serif text-xl gold-underline inline-block">{o.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal text-ivory text-center">
        <div className="container-wide reveal">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Stay close to {d.name}</h2>
          <p className="text-ivory/70 mb-8 max-w-xl mx-auto">Just a short journey from Nitara Stays — let us arrange the visit.</p>
          <Link to="/booking" className="btn-gold">Book at Nitara <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
