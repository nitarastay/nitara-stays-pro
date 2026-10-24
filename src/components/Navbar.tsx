import { siteMedia } from "@/data/site-media";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { destinations, retreats } from "@/data/site";
const nitaraLogo = siteMedia["nitara-wordmark.png"];

const links = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMega(false); }, [loc.pathname]);

  const solid = scrolled || !isHome;
  const textCls = solid ? "text-charcoal" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link to="/" aria-label="Nitara Stays home" className="shrink-0">
          <img src={nitaraLogo} alt="Nitara Stays — Deeply rooted in mountains" className={`h-auto w-[170px] sm:w-[200px] md:w-[230px] ${solid ? "" : "brightness-0 invert"}`} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <div key={l.to} className="relative" onMouseEnter={() => l.label === "Destinations" && setMega(true)} onMouseLeave={() => l.label === "Destinations" && setMega(false)}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `gold-underline text-xs uppercase tracking-[0.25em] font-medium transition-colors ${textCls} ${isActive ? "text-gold" : ""}`
                }
              >
                {l.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/booking" className="!hidden md:!inline-flex btn-gold !py-2 !px-5 text-[11px]">
            Book Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className={`lg:hidden ${textCls}`}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mega dropdown */}
      {mega && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-charcoal text-ivory animate-slide-down"
          onMouseEnter={() => setMega(true)}
          onMouseLeave={() => setMega(false)}
        >
          <div className="container-wide grid grid-cols-4 gap-10 py-10">
            <MegaCol title="Mountain Retreats" items={retreats.filter(r => r.type === "mountain").map(r => ({ to: `/destinations`, label: r.name }))} />
            <MegaCol title="Forest & Village" items={retreats.filter(r => r.type === "forest").map(r => ({ to: `/destinations`, label: r.name }))} />
            <MegaCol title="Premium Collection" items={retreats.filter(r => r.type === "premium").map(r => ({ to: `/destinations`, label: r.name }))} />
            <MegaCol title="Browse All" items={[{ to: "/destinations", label: "All Retreats" }, ...destinations.map(d => ({ to: `/destinations/${d.slug}`, label: d.name }))]} />
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-charcoal text-ivory p-8 transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between mb-12">
            <img src={nitaraLogo} alt="Nitara Stays — Deeply rooted in mountains" className="h-auto w-[210px] brightness-0 invert" />
            <button onClick={() => setOpen(false)} aria-label="Close"><X size={26} /></button>
          </div>
          <nav className="flex flex-col gap-6">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ animationDelay: `${i * 60}ms` }}
                className="font-serif text-3xl animate-fade-in"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/booking" className="btn-gold mt-6 self-start">Book Now</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function MegaCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-gold text-xs uppercase tracking-[0.3em] mb-5">{title}</h4>
      <ul className="space-y-3">
        {items.slice(0, 6).map((i, idx) => (
          <li key={idx}><Link to={i.to} className="text-sm text-ivory/80 hover:text-gold transition-colors">{i.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
