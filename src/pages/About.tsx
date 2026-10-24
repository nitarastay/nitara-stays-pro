import { siteMedia, propertyPhotos } from "@/data/site-media";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { useDocumentMeta } from "@/hooks/useReveal";
const terrace = siteMedia["terrace.webp"];

const team = [
  { name: "Shrey Dwivedi", role: "Owner of Nitara Stays", bio: "Owner of Nitara Stays." },
];

export default function About() {
  useDocumentMeta("About — Nitara Stays", "The story, philosophy and people behind Nitara Stays.");
  return (
    <>
      <PageHero image={terrace} eyebrow="Our Story" title="A Quiet Idea, Carefully Made" />
      <section className="py-24 bg-ivory">
        <div className="container-wide grid md:grid-cols-2 gap-16 items-center">
          <img src={siteMedia["nitara-terrace-day.webp"]} alt="Nitara Stays terrace" loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover reveal" />
          <div className="reveal">
            <p className="eyebrow text-gold mb-3">The Beginning</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Built on stillness, and time.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Nitara began with a single idea — that true luxury in the mountains is not gold leaf or marble, but space, silence and time. We chose Mukteshwar for its altitude, its temple, and the unbroken view of the snow line that defines its horizon.</p>
            <p className="text-muted-foreground leading-relaxed">Every stone in our retreats was sourced within fifty kilometres. Every recipe in our kitchen comes from a Kumaoni grandmother. Every member of our team lives in a village you can walk to.</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <p className="eyebrow text-gold mb-3">What We Believe</p>
            <h2 className="font-serif text-4xl md:text-5xl">Three Pillars of Quiet Luxury</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { i: "❖", t: "Exclusive Privacy", d: "A private sanctuary designed for space and solitude." },
              { i: "✦", t: "World-Class Cuisine", d: "Farm-to-plate Kumaoni tradition, reimagined daily." },
              { i: "❈", t: "Sustainable Luxury", d: "Solar energy, zero waste, deeply local sourcing." },
            ].map(p => (
              <div key={p.t} className="reveal text-center px-6">
                <div className="text-gold text-4xl mb-6">{p.i}</div>
                <h3 className="font-serif text-2xl mb-4">{p.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ivory">
        <div className="container-wide">
          <div className="text-center mb-14 reveal">
            <p className="eyebrow text-gold mb-3">The People</p>
            <h2 className="font-serif text-4xl md:text-5xl">Meet the Owner</h2>
          </div>
          <div className="grid max-w-sm mx-auto gap-8">
            {team.map(t => (
              <div key={t.name} className="reveal text-center">
                <img src={siteMedia["owner-shrey.webp"]} alt="Shrey Dwivedi, Owner of Nitara Stays" loading="lazy" decoding="async" width={704} height={1200} className="w-full aspect-[3/4] object-cover object-center mb-6" />
                <h3 className="font-serif text-2xl mb-1">{t.name}</h3>
                <p className="eyebrow text-gold mb-4">{t.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 bg-ivory">
        <div className="container-wide grid grid-cols-2 md:grid-cols-3 gap-4">
          {propertyPhotos.map(photo => (
            <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover reveal" />
          ))}
        </div>
      </section>

      <section className="py-16 bg-charcoal text-ivory">
        <div className="container-wide flex flex-wrap items-center justify-around gap-6 text-center">
          {["Condé Nast Gold List 2025", "Travel + Leisure Hot List", "Forbes Boutique Top 50", "Vogue Quiet Luxury Pick"].map(a => (
            <div key={a} className="reveal">
              <p className="eyebrow text-gold mb-2">Awarded</p>
              <p className="font-serif text-lg">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-ivory">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="eyebrow text-gold mb-3">Find Us</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Dhanachuli, Mukteshwar</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">A 7-hour drive from Delhi, or a short transfer from Pantnagar Airport. We arrange every detail of arrival.</p>
            <Link to="/booking" className="btn-dark">Come Find Us</Link>
          </div>
          <div className="reveal aspect-[4/3] bg-charcoal/10 flex items-center justify-center text-muted-foreground">
            <iframe title="map" className="w-full h-full" src="https://www.openstreetmap.org/export/embed.html?bbox=79.6%2C29.45%2C79.7%2C29.5&layer=mapnik&marker=29.475%2C79.65" />
          </div>
        </div>
      </section>
    </>
  );
}
