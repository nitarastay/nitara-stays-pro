import { siteMedia } from "@/data/site-media";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import { destinations } from "@/data/site";
import { siteLinks } from "@/data/site-links";
const nitaraLogo = siteMedia["nitara-wordmark.png"];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-8">
      <div className="container-wide grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <img src={nitaraLogo} alt="Nitara Stays — Deeply rooted in mountains" className="h-auto w-[220px] brightness-0 invert mb-4" />
          <p className="text-ivory/70 text-sm leading-relaxed mb-5">A curated mountain sanctuary above the clouds in Mukteshwar, Uttarakhand.</p>
          <div className="flex gap-4">
            <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Nitara Stays on Instagram" className="text-ivory/70 hover:text-gold"><Instagram size={18} /></a>
            <a href={siteLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Nitara Stays on Facebook" className="text-ivory/70 hover:text-gold"><Facebook size={18} /></a>
          </div>
        </div>

        <FCol title="Navigate" items={[
          { to: "/", label: "Home" },
          { to: "/destinations", label: "Destinations" },
          { to: "/experiences", label: "Experiences" },
          { to: "/gallery", label: "Gallery" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ]} />

        <FCol title="Explore" items={destinations.map(d => ({ to: `/destinations/${d.slug}`, label: d.name }))} />

        <FCol title="Stay" items={[
          { to: "/booking", label: "Book a Retreat" },
          { to: "/destinations", label: "Our Retreats" },
          { to: "/experiences", label: "Experiences" },
          { to: "/contact", label: "Contact" },
        ]} />

        <div>
          <h4 className="text-gold text-xs uppercase tracking-[0.3em] mb-5">Address</h4>
          <p className="text-ivory/70 text-sm leading-relaxed">
            Dhanachuli Village<br />
            Mukteshwar, Uttarakhand<br />
            India 263138<br /><br />
            <a href="tel:+917897369258" className="hover:text-gold">+91 78973 69258</a><br />
            stay@nitarastays.com
          </p>
        </div>
      </div>

      <div className="container-wide border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/50">
        <p>© {new Date().getFullYear()} Nitara Stays. All rights reserved.</p>
        <div className="flex gap-6"><a href="#" className="hover:text-gold">Privacy Policy</a><a href="#" className="hover:text-gold">Terms</a></div>
      </div>
    </footer>
  );
}

function FCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-gold text-xs uppercase tracking-[0.3em] mb-5">{title}</h4>
      <ul className="space-y-3">
        {items.map(i => (
          <li key={i.to + i.label}><Link to={i.to} className="text-sm text-ivory/70 hover:text-gold transition-colors">{i.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
