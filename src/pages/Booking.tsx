import { siteMedia } from "@/data/site-media";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import PageHero from "@/components/PageHero";
import { addons, retreats } from "@/data/site";
import { useDocumentMeta } from "@/hooks/useReveal";
import { supabase } from "@/integrations/supabase/client";
import { whatsappBookingUrl } from "@/lib/site-content";
const snowPeaks = siteMedia["snow-peaks.webp"];
import { CheckCircle2 } from "lucide-react";

const guestSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter your phone number").max(30),
  country: z.string().trim().max(60),
  notes: z.string().trim().max(1000),
});

export default function Booking() {
  useDocumentMeta("Reserve — Nitara Stays", "Reserve your sanctuary in Mukteshwar.");
  const [params] = useSearchParams();
  const initialRoom = retreats.some(x => x.id === params.get("room")) ? params.get("room")! : retreats[0].id;
  const [step, setStep] = useState(1);
  const [retreat, setRetreat] = useState(initialRoom);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [picked, setPicked] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "India", notes: "" });
  const [done, setDone] = useState<{ ref: string; wa: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const r = retreats.find(x => x.id === retreat)!;
  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0;
    const d = (new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000;
    return Math.max(0, Math.round(d));
  }, [checkin, checkout]);
  const addonsTotal = picked.reduce((s, id) => s + (addons.find(a => a.id === id)?.price || 0), 0);
  const subtotal = nights * r.price + addonsTotal;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const toGuest = () => {
    const res = guestSchema.safeParse(form);
    if (!res.success) { setError(res.error.issues[0].message); return; }
    setError(""); setStep(3);
  };

  const confirm = async () => {
    setSaving(true); setError("");
    const g = guestSchema.parse(form);
    const ref = "NIT-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const addonNames = picked.map(p => addons.find(a => a.id === p)?.name).filter(Boolean).join(", ");
    const { error: dbError } = await supabase.from("bookings").insert({
      reference: ref, room_id: r.id, room_name: r.name, check_in: checkin, check_out: checkout, guests,
      guest_name: g.name, email: g.email, phone: g.phone, country: g.country, addons: addonNames, notes: g.notes, total,
    });
    setSaving(false);
    if (dbError) { setError("We couldn't save your booking. Please try again."); return; }
    const wa = whatsappBookingUrl({ reference: ref, room: r.name, checkIn: checkin, checkOut: checkout, nights, guests, name: g.name, phone: g.phone, email: g.email, addons: addonNames, notes: g.notes, total });
    window.open(wa, "_blank");
    setDone({ ref, wa });
  };

  return (
    <>
      <PageHero image={snowPeaks} eyebrow="Reservations" title="Reserve Your Sanctuary" />
      <section className="py-20 bg-ivory">
        <div className="container-wide grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="bg-white p-8 md:p-12">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-12">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex-1 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${step >= s ? "bg-gold text-charcoal" : "bg-charcoal/10 text-charcoal/50"}`}>{s}</div>
                  <span className={`eyebrow ${step >= s ? "text-charcoal" : "text-charcoal/40"}`}>{s === 1 ? "Stay" : s === 2 ? "Guest" : "Review"}</span>
                  {s < 3 && <div className={`flex-1 h-px ${step > s ? "bg-gold" : "bg-charcoal/10"}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-3xl mb-6">Stay Details</h2>
                <Field label="Retreat">
                  <select value={retreat} onChange={e => setRetreat(e.target.value)} className="input">
                    {retreats.map(r => <option key={r.id} value={r.id}>{r.name} — ₹{r.price.toLocaleString("en-IN")}/night</option>)}
                  </select>
                </Field>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Check-in"><input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="input" /></Field>
                  <Field label="Check-out"><input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="input" /></Field>
                </div>
                <Field label="Guests"><input type="number" min={1} max={10} value={guests} onChange={e => setGuests(+e.target.value)} className="input" /></Field>
                <button onClick={() => setStep(2)} disabled={!nights} className="btn-gold disabled:opacity-40">Continue</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-3xl mb-6">Guest Details</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name"><input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
                  <Field label="Email"><input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
                  <Field label="Phone"><input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
                  <Field label="Country"><input className="input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} /></Field>
                </div>
                <div>
                  <p className="eyebrow text-gold mb-3">Add to your stay</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {addons.map(a => {
                      const on = picked.includes(a.id);
                      return (
                        <button key={a.id} onClick={() => setPicked(on ? picked.filter(x => x !== a.id) : [...picked, a.id])} className={`text-left p-4 border transition ${on ? "border-gold bg-gold/5" : "border-charcoal/15 hover:border-gold/50"}`}>
                          <p className="font-medium">{a.name}</p>
                          <p className="text-sm text-muted-foreground">₹{a.price.toLocaleString("en-IN")}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Field label="Special Requests"><textarea rows={4} className="input resize-none" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></Field>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-dark">Back</button>
                  <button onClick={() => setStep(3)} disabled={!form.name || !form.email} className="btn-gold disabled:opacity-40">Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-3xl mb-6">Review & Confirm</h2>
                <div className="border border-charcoal/10 divide-y divide-charcoal/10">
                  {[
                    ["Retreat", r.name],
                    ["Check-in", checkin],
                    ["Check-out", checkout],
                    ["Nights", String(nights)],
                    ["Guests", String(guests)],
                    ["Guest", form.name],
                    ["Email", form.email],
                    ["Add-ons", picked.length ? picked.map(p => addons.find(a => a.id === p)?.name).join(", ") : "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between p-4 text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                  ))}
                </div>
                <div className="border border-charcoal/10 p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Stay ({nights} × ₹{r.price.toLocaleString("en-IN")})</span><span>₹{(nights * r.price).toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>Add-ons</span><span>₹{addonsTotal.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between font-serif text-xl border-t border-charcoal/10 pt-2 mt-2"><span>Total</span><span className="text-gold">₹{total.toLocaleString("en-IN")}</span></div>
                </div>
                <p className="text-xs text-muted-foreground">No payment required now. Our concierge will confirm and arrange payment securely.</p>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-dark">Back</button>
                  <button onClick={confirm} className="btn-gold">Confirm Reservation</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="bg-charcoal text-ivory p-6 h-fit lg:sticky lg:top-24">
            <img src={r.img} alt={r.name} className="w-full aspect-[4/3] object-cover mb-5" />
            <h3 className="font-serif text-2xl mb-2">{r.name}</h3>
            <p className="text-gold text-sm mb-4">₹{r.price.toLocaleString("en-IN")} / night</p>
            <ul className="text-sm text-ivory/70 space-y-1 mb-6">
              <li>{checkin || "—"} → {checkout || "—"}</li>
              <li>{nights} nights · {guests} guests</li>
            </ul>
            <div className="border-t border-white/10 pt-4 text-xs text-ivory/60 space-y-1">
              <p>✦ Free cancellation up to 7 days</p>
              <p>✦ Best price guarantee</p>
              <p>✦ Personal concierge included</p>
            </div>
          </aside>
        </div>
      </section>

      {done && (
        <div className="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white max-w-md w-full p-10 text-center">
            <CheckCircle2 className="text-gold mx-auto mb-4" size={56} />
            <h3 className="font-serif text-3xl mb-3">Reservation Received</h3>
            <p className="text-muted-foreground mb-4">Your booking is saved. Please press send in WhatsApp so our team receives your details.</p>
            <a href={done.wa} target="_blank" rel="noreferrer" className="btn-gold mb-6 inline-flex">Open WhatsApp</a>
            <p className="eyebrow text-gold mb-1">Booking Reference</p>
            <p className="font-serif text-2xl mb-8">{done.ref}</p>
            <button onClick={() => { setDone(null); setStep(1); }} className="btn-dark">Done</button>
          </div>
        </div>
      )}

      <style>{`.input{ width:100%; padding:.7rem 1rem; border:1px solid hsl(var(--border)); background:white; outline:none; transition:border-color .2s }.input:focus{ border-color: hsl(var(--gold)); }`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">{label}</span>
      {children}
    </label>
  );
}
