import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function RetreatCard({ r }: { r: { id: string; name: string; price: number; img: string; desc?: string } }) {
  return (
    <div className="group bg-white overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={r.img} alt={r.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl mb-2">{r.name}</h3>
        {r.desc && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{r.desc}</p>}
        <div className="flex items-center justify-between">
          <p className="text-sm"><span className="text-gold font-medium">₹{r.price.toLocaleString("en-IN")}</span> <span className="text-muted-foreground">/ night</span></p>
          <Link to="/booking" className="text-xs uppercase tracking-[0.2em] text-charcoal gold-underline inline-flex items-center gap-2">
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
