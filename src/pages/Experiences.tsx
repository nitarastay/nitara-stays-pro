import { siteMedia } from "@/data/site-media";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { experiences } from "@/data/site";
import { useDocumentMeta } from "@/hooks/useReveal";
const valleyView = siteMedia["valley-view.webp"];

export default function Experiences() {
  useDocumentMeta("Experiences — Nitara Stays", "Curated experiences in the Kumaon Himalayas.");
  return (
    <>
      <PageHero image={valleyView} eyebrow="Curated Moments" title="Experiences" subtitle="Slow days, considered evenings. A handful of experiences shaped by the mountain." />
      <section className="py-20 bg-ivory">
        <div className="container-wide grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map(e => (
            <div key={e.title} className="reveal bg-white p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{e.icon}</div>
              <h3 className="font-serif text-2xl mb-3">{e.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{e.desc}</p>
              <div className="flex justify-between text-sm border-t border-charcoal/10 pt-4">
                <span className="text-muted-foreground">{e.duration}</span>
                <span className="text-gold font-medium">{e.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-charcoal text-ivory text-center">
        <div className="container-wide">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Ready to Experience It?</h2>
          <p className="text-ivory/70 mb-8 max-w-xl mx-auto">Reserve your stay and we'll tailor a programme to your pace.</p>
          <Link to="/booking" className="btn-gold">Book Now</Link>
        </div>
      </section>
    </>
  );
}
