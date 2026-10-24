export default function PageHero({ image, eyebrow, title, subtitle }: { image: string; eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
      <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover animate-ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      <div className="relative container-wide pb-16 text-white">
        {eyebrow && <p className="eyebrow text-gold mb-4">{eyebrow}</p>}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-white/80">{subtitle}</p>}
      </div>
    </section>
  );
}
