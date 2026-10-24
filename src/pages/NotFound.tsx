import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <p className="eyebrow text-gold mb-3">Page Not Found</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">404</h1>
        <p className="text-muted-foreground mb-8">The path you sought has gone quiet in the mountains.</p>
        <Link to="/" className="btn-dark">Return Home</Link>
      </div>
    </section>
  );
}
