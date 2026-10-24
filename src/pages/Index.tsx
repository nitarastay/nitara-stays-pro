import { siteMedia, propertyPhotos } from "@/data/site-media";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { retreats, destinations } from "@/data/site";
import { mergeReviews } from "@/lib/site-content";
import { useSiteContent } from "@/hooks/useSiteContent";
import RetreatCard from "@/components/RetreatCard";
import { useDocumentMeta } from "@/hooks/useReveal";
const sunsetPicnic = siteMedia["sunset-picnic.webp"];
const valleyView = siteMedia["valley-view.webp"];
const snowPeaks = siteMedia["snow-peaks.webp"];
const nitaraTerraceDay = siteMedia["nitara-terrace-day.webp"];

const galleryImgs = propertyPhotos.map(p => p.src);

export default function Index() {
  useDocumentMeta("Nitara Stays — Where the Peaks Meet Stillness", "Ultra-luxury mountain retreat in Mukteshwar, Uttarakhand. A curated sanctuary above the clouds.");
  const { data: content } = useSiteContent();
  const merged = mergeReviews(content?.reviews ?? [], content?.hidden ?? []);
  const guestReviews = merged.length ? merged : [{ key: "none", name: "Nitara Stays", quote: "Guest stories coming soon.", builtIn: true }];
  const [tIndex, setTIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVideoReady(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);
  const count = guestReviews.length;
  useEffect(() => {
    const t = setInterval(() => setTIndex(i => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);
  const t = guestReviews[tIndex % count];

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={sunsetPicnic} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          {videoReady && <iframe
            className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/ZDO-b1uwRGM?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=ZDO-b1uwRGM&start=5400&playsinline=1"
            title="Nitara"
            frameBorder={0}
            allow="autoplay; encrypted-media"
          />}
        </div>
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative h-full container-wide flex flex-col items-center justify-center text-center text-white">
          <p className="eyebrow text-gold mb-6">Mukteshwar · Uttarakhand · 2,286m</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl">
            Where the Peaks <br /><em className="text-gold font-normal">Meet Stillness</em>
          </h1>
          <p className="mt-6 max-w-xl text-white/85 text-base md:text-lg">A curated mountain sanctuary above the clouds — Nitara Stays, Mukteshwar.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/destinations" className="btn-outline">Discover the Retreat</Link>
            <Link to="/booking" className="btn-gold">Reserve Your Stay</Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase">
          <MapPin size={14} className="text-gold" /> Dhanachuli, Mukteshwar, Uttarakhand
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* RETREATS */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="eyebrow text-gold mb-3">Our Retreats</p>
              <h2 className="font-serif text-4xl md:text-5xl">Curated Mountain Escapes</h2>
            </div>
            <Link to="/destinations" className="hidden md:inline-flex text-xs uppercase tracking-[0.25em] gold-underline items-center gap-2">View All Destinations <ArrowRight size={14} /></Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
            {retreats.map(r => (
              <div key={r.id} className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] snap-start reveal">
                <RetreatCard r={r} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16 reveal">
            <p className="eyebrow text-gold mb-3">The Nitara Way</p>
            <h2 className="font-serif text-4xl md:text-5xl">Three Pillars of Quiet Luxury</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { i: "❖", t: "Exclusive Privacy", d: "A private sanctuary designed for space and solitude. No crowds, no noise — only the mountain and you." },
              { i: "✦", t: "World-Class Cuisine", d: "Farm-to-plate Kumaoni tradition, reimagined by our chef using produce from our own orchards." },
              { i: "❈", t: "Sustainable Luxury", d: "Solar energy, zero-waste kitchens, and a commitment to local craft, hire and supply." },
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

      {/* SPLIT EXPERIENCES */}
      <section className="grid md:grid-cols-2">
        {[
          { img: valleyView, eyebrow: "Trek & Explore", title: "Into the Heart of the Forest" },
          { img: snowPeaks, eyebrow: "Himalayan Peaks", title: "Panchachuli at Sunrise" },
        ].map(s => (
          <div key={s.title} className="relative h-[60vh] group overflow-hidden">
            <img src={s.img} loading="lazy" decoding="async" alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="relative h-full flex flex-col justify-end p-10 md:p-16 text-white">
              <p className="eyebrow text-gold mb-3">{s.eyebrow}</p>
              <h3 className="font-serif text-3xl md:text-4xl mb-6 max-w-md">{s.title}</h3>
              <Link to="/experiences" className="btn-gold self-start">Explore</Link>
            </div>
          </div>
        ))}
      </section>

      {/* QUOTE */}
      <section className="relative py-32 md:py-44 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${snowPeaks})` }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container-wide text-center text-white reveal">
          <p className="font-serif italic text-2xl md:text-4xl leading-relaxed max-w-4xl mx-auto">
            “The mountains are not stadiums where I satisfy my ambition to achieve, they are cathedrals where I practice my religion.”
          </p>
          <p className="mt-8 eyebrow text-gold">— Anatoli Boukreev</p>
        </div>
      </section>

      {/* EXPLORE NEARBY */}
      <section className="py-24 md:py-32 bg-charcoal text-ivory">
        <div className="container-wide">
          <div className="text-center mb-16 reveal">
            <p className="eyebrow text-gold mb-3">Beyond the Retreat</p>
            <h2 className="font-serif text-4xl md:text-5xl">Explore The Kumaon</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(d => (
              <Link key={d.slug} to={`/destinations/${d.slug}`} className="group relative aspect-[4/3] overflow-hidden reveal">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="eyebrow text-gold mb-2">{d.category} · {d.sub}</p>
                  <h3 className="font-serif text-2xl mb-3">{d.name}</h3>
                  <span className="text-xs uppercase tracking-[0.25em] inline-flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-gold">View All Destinations ✦</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="eyebrow text-gold mb-3">Guest Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-10">Voices from the Mountain</h2>
            <p className="font-serif italic text-2xl leading-relaxed mb-8">“{t.quote}”</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 text-gold font-serif text-lg flex items-center justify-center">{t.name.charAt(0)}</div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">Stayed at Nitara Stays</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-10">
              <button onClick={() => setTIndex((tIndex - 1 + guestReviews.length) % guestReviews.length)} className="w-10 h-10 border border-charcoal/30 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition"><ChevronLeft size={16} /></button>
              <button onClick={() => setTIndex((tIndex + 1) % guestReviews.length)} className="w-10 h-10 border border-charcoal/30 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition"><ChevronRight size={16} /></button>
              <div className="flex gap-2 ml-4">
                {guestReviews.map((_, i) => (
                  <button key={i} onClick={() => setTIndex(i)} className={`h-1 transition-all ${i === tIndex ? "w-8 bg-gold" : "w-3 bg-charcoal/20"}`} />
                ))}
              </div>
            </div>
          </div>
          <img src={nitaraTerraceDay} loading="lazy" decoding="async" alt="" className="w-full aspect-[4/5] object-cover reveal" />
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="text-center mb-16 reveal">
            <p className="eyebrow text-gold mb-3">Visual Diary</p>
            <h2 className="font-serif text-4xl md:text-5xl">Life at Nitara</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImgs.slice(0, 5).map((g, i) => (
              <img key={i} src={g} alt="" loading="lazy" className={`reveal w-full h-full object-cover ${i === 0 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"}`} />
            ))}
            <Link to="/gallery" className="reveal aspect-square bg-charcoal text-ivory flex flex-col items-center justify-center text-center p-6">
              <p className="font-serif text-3xl mb-2">+120</p>
              <p className="eyebrow text-gold mb-4">More Photos</p>
              <span className="text-xs uppercase tracking-[0.2em] gold-underline inline-flex items-center gap-2">View Gallery <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 bg-ivory">
        <div className="container-wide max-w-2xl text-center reveal">
          <p className="eyebrow text-gold mb-3">Stay in Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Receive The Nitara Dispatch</h2>
          <p className="text-muted-foreground mb-8">Stories, seasonal openings and quiet invitations from the mountain.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you — you're on the list."); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" className="flex-1 px-5 py-3 border border-charcoal/20 bg-white focus:outline-none focus:border-gold" />
            <button className="btn-gold !py-3">Subscribe</button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">No clutter. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
