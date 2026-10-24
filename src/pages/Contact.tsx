import { siteMedia } from "@/data/site-media";
import PageHero from "@/components/PageHero";
import { useDocumentMeta } from "@/hooks/useReveal";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
const sunsetPicnic = siteMedia["sunset-picnic.webp"];

export default function Contact() {
  useDocumentMeta("Contact — Nitara Stays", "Speak with our concierge in Mukteshwar.");
  return (
    <>
      <PageHero image={sunsetPicnic} eyebrow="Concierge" title="Get In Touch" subtitle="We answer every message personally, usually within a few hours." />
      <section className="py-20 bg-ivory">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <form onSubmit={(e) => { e.preventDefault(); console.log("contact form"); alert("Thank you — we'll be in touch shortly."); }} className="bg-white p-8 md:p-10 reveal">
            <h2 className="font-serif text-3xl mb-8">Send a Message</h2>
            {[
              { l: "Full Name", t: "text", n: "name" },
              { l: "Email", t: "email", n: "email" },
              { l: "Phone", t: "tel", n: "phone" },
            ].map(f => (
              <div key={f.n} className="mb-5">
                <label className="eyebrow block mb-2">{f.l}</label>
                <input type={f.t} name={f.n} required className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold bg-transparent" />
              </div>
            ))}
            <div className="mb-8">
              <label className="eyebrow block mb-2">Message</label>
              <textarea rows={5} required className="w-full border-b border-charcoal/20 py-2 focus:outline-none focus:border-gold bg-transparent resize-none" />
            </div>
            <button className="btn-gold">Send Message</button>
          </form>

          <div className="reveal space-y-6">
            <div className="bg-charcoal text-ivory p-8">
              <h3 className="font-serif text-2xl mb-6">Reach Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><MapPin size={18} className="text-gold mt-0.5" /> Dhanachuli Village, Mukteshwar, Uttarakhand 263138</li>
                <li className="flex gap-3"><Phone size={18} className="text-gold" /> <a href="tel:+917897369258" className="hover:text-gold">+91 78973 69258</a></li>
                <li className="flex gap-3"><Mail size={18} className="text-gold" /> stay@nitarastays.com</li>
                <li className="flex gap-3"><MessageCircle size={18} className="text-gold" /> <a href="https://wa.me/917897369258" target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp +91 78973 69258</a></li>
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-ivory/70">
                <p className="text-gold eyebrow mb-2">Hours</p>
                <p>Concierge: 7 AM – 11 PM IST</p>
                <p>Reservations: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-wide grid md:grid-cols-3 gap-6 mt-10">
          {[
            { t: "How to Reach", d: "Pantnagar (PGH) is the nearest airport, 90 minutes away. Delhi is a 7-hour scenic drive." },
            { t: "Best Time to Visit", d: "October–March for snow & clear views. April–June for warmth. Monsoon for waterfalls." },
            { t: "Check-in Time", d: "Check-in 2 PM, check-out 11 AM. Early arrivals welcomed for tea and a walk." },
          ].map(c => (
            <div key={c.t} className="bg-white p-8 reveal">
              <p className="eyebrow text-gold mb-3">{c.t}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
