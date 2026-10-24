import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import writeXlsxFile from "write-excel-file/browser";
import type { Session } from "@supabase/supabase-js";
import { Trash2, Download, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { retreats } from "@/data/site";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ADMIN_EMAIL, galleryCategories, mergeGallery, mergeReviews, roomPhotos, stayPeriod, type StayPeriod } from "@/lib/site-content";
import { useDocumentMeta } from "@/hooks/useReveal";

const input = "w-full px-4 py-3 border border-border bg-background outline-none focus:border-gold";

export default function Admin() {
  useDocumentMeta("Admin — Nitara Stays", "Nitara Stays admin panel.");
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (!ready) return <Shell><p>Loading…</p></Shell>;
  if (!session) return <Shell><Login /></Shell>;
  if (isAdmin === null) return <Shell><p>Checking access…</p></Shell>;
  if (!isAdmin) return (
    <Shell>
      <p className="mb-4">This account ({session.user.email}) does not have admin access.</p>
      <button className="btn-dark" onClick={() => supabase.auth.signOut()}>Sign out</button>
    </Shell>
  );
  return <Dashboard email={session.user.email ?? ""} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <section className="min-h-screen pt-32 pb-20 bg-ivory"><div className="max-w-md mx-auto bg-white p-8">{children}</div></section>;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setMsg(error ? error.message : "Check your email inbox and click the confirmation link, then sign in here.");
    }
    setBusy(false);
  };
  const reset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    setMsg(error ? error.message : "Password reset email sent.");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h1 className="font-serif text-3xl">Admin {mode === "in" ? "Sign In" : "Create Account"}</h1>
      <input className={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input className={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" minLength={8} required />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <button className="btn-gold w-full justify-center" disabled={busy}>{mode === "in" ? "Sign In" : "Create Account"}</button>
      <div className="flex justify-between text-sm">
        <button type="button" className="gold-underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>{mode === "in" ? "First time? Create account" : "Have an account? Sign in"}</button>
        {mode === "in" && <button type="button" className="gold-underline" onClick={reset}>Forgot password</button>}
      </div>
    </form>
  );
}

const tabs = ["Bookings", "Reviews", "Gallery Photos", "Room Photos"] as const;

function Dashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<typeof tabs[number]>("Bookings");
  return (
    <section className="min-h-screen pt-28 pb-20 bg-ivory">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div><p className="eyebrow text-gold">Admin Panel</p><h1 className="font-serif text-4xl">Nitara Stays</h1></div>
          <div className="flex items-center gap-3 text-sm"><span className="text-muted-foreground">{email}</span>
            <button className="btn-dark !py-2" onClick={() => supabase.auth.signOut()}><LogOut size={14} /> Sign out</button></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border ${tab === t ? "bg-charcoal text-ivory border-charcoal" : "border-charcoal/20 bg-white"}`}>{t}</button>)}
        </div>
        {tab === "Bookings" && <Bookings />}
        {tab === "Reviews" && <Reviews />}
        {tab === "Gallery Photos" && <GalleryPhotos />}
        {tab === "Room Photos" && <RoomPhotos />}
      </div>
    </section>
  );
}

function Bookings() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await supabase.from("bookings").select("*").order("check_in", { ascending: false })).data ?? [],
  });
  const [period, setPeriod] = useState<"all" | StayPeriod>("all");
  const [q, setQ] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const list = useMemo(() => data.filter(b =>
    (period === "all" || stayPeriod(b.check_in, b.check_out, today) === period) &&
    (`${b.guest_name} ${b.room_name} ${b.reference} ${b.phone}`.toLowerCase().includes(q.toLowerCase()))), [data, period, q, today]);

  const setStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-bookings"] });
  };

  const exportExcel = async () => {
    const cols = ["Reference", "Stay", "Status", "Room", "Check-in", "Check-out", "Guests", "Name", "Phone", "Email", "Country", "Add-ons", "Notes", "Total (₹)", "Booked on"];
    const rows = list.map(b => [b.reference, stayPeriod(b.check_in, b.check_out, today), b.status, b.room_name, b.check_in, b.check_out, b.guests, b.guest_name, b.phone, b.email, b.country, b.addons, b.notes, b.total, new Date(b.created_at).toLocaleString("en-IN")]);
    await writeXlsxFile([cols.map(c => ({ value: c, fontWeight: "bold" as const })), ...rows.map(r => r.map(v => ({ value: v as string | number })))]).toFile(`nitara-bookings-${today}.xlsx`);
  };

  return (
    <div className="bg-white p-6">
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        {(["all", "current", "upcoming", "past"] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border ${period === p ? "border-gold text-gold" : "border-charcoal/15"}`}>{p}</button>
        ))}
        <input className={`${input} !w-auto flex-1 min-w-[180px] !py-2`} placeholder="Search name, room, phone…" value={q} onChange={e => setQ(e.target.value)} />
        <button className="btn-gold !py-2" onClick={exportExcel} disabled={!list.length}><Download size={14} /> Download Excel</button>
      </div>
      {isLoading ? <p>Loading…</p> : !list.length ? <p className="text-muted-foreground">No bookings here yet.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left border-b border-border">{["Ref", "Stay", "Room", "Dates", "Guests", "Guest", "Contact", "Total", "Status"].map(h => <th key={h} className="p-2 eyebrow">{h}</th>)}</tr></thead>
            <tbody>{list.map(b => (
              <tr key={b.id} className="border-b border-border align-top">
                <td className="p-2 font-medium">{b.reference}</td>
                <td className="p-2 capitalize">{stayPeriod(b.check_in, b.check_out, today)}</td>
                <td className="p-2">{b.room_name}</td>
                <td className="p-2 whitespace-nowrap">{b.check_in} → {b.check_out}</td>
                <td className="p-2">{b.guests}</td>
                <td className="p-2">{b.guest_name}{b.notes && <p className="text-xs text-muted-foreground max-w-[200px]">{b.notes}</p>}</td>
                <td className="p-2">{b.phone}<br /><span className="text-muted-foreground">{b.email}</span></td>
                <td className="p-2">₹{b.total.toLocaleString("en-IN")}</td>
                <td className="p-2"><select value={b.status} onChange={e => setStatus(b.id, e.target.value)} className="border border-border p-1 bg-background">
                  {["pending", "confirmed", "cancelled"].map(s => <option key={s}>{s}</option>)}</select></td>
              </tr>))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function useRefresh() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["site-content"] });
}

async function hide(kind: string, key: string) {
  await supabase.from("hidden_items").insert({ kind, item_key: key });
}

function Reviews() {
  const { data } = useSiteContent();
  const refresh = useRefresh();
  const [name, setName] = useState(""); const [quote, setQuote] = useState(""); const [busy, setBusy] = useState(false);
  const list = data ? mergeReviews(data.reviews, data.hidden) : [];
  const add = async (e: React.FormEvent) => {
    e.preventDefault(); if (!name.trim() || !quote.trim()) return;
    setBusy(true); await supabase.from("reviews").insert({ name: name.trim().slice(0, 100), quote: quote.trim().slice(0, 1500) });
    setName(""); setQuote(""); setBusy(false); refresh();
  };
  const remove = async (r: typeof list[number]) => {
    if (!confirm(`Remove review by ${r.name}?`)) return;
    if (r.builtIn) await hide("review", r.key); else await supabase.from("reviews").delete().eq("id", r.key);
    refresh();
  };
  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-6">
      <form onSubmit={add} className="bg-white p-6 space-y-3 h-fit">
        <h2 className="font-serif text-2xl">Add a review</h2>
        <input className={input} placeholder="Guest name" value={name} onChange={e => setName(e.target.value)} maxLength={100} />
        <textarea className={input} rows={5} placeholder="Review text" value={quote} onChange={e => setQuote(e.target.value)} maxLength={1500} />
        <button className="btn-gold" disabled={busy}>Add review</button>
      </form>
      <div className="bg-white p-6 space-y-4">
        {list.map(r => (
          <div key={r.key} className="flex gap-4 justify-between border-b border-border pb-4">
            <div><p className="font-medium">{r.name}</p><p className="text-sm text-muted-foreground">{r.quote}</p></div>
            <button onClick={() => remove(r)} className="text-destructive shrink-0" aria-label="Remove review"><Trash2 size={18} /></button>
          </div>))}
      </div>
    </div>
  );
}

async function uploadPhoto(file: File) {
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const { error } = await supabase.storage.from("site-photos").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("site-photos").createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
  if (e2 || !data) throw e2;
  return { path, url: data.signedUrl };
}

async function removePhoto(p: { key: string; builtIn: boolean; path?: string | null }, kind: string) {
  if (p.builtIn) return hide(kind, p.key);
  if (p.path) await supabase.storage.from("site-photos").remove([p.path]);
  await supabase.from("site_photos").delete().eq("id", p.key);
}

function Uploader({ onFiles, children }: { onFiles: (f: File[]) => Promise<void>; children?: React.ReactNode }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3">
      {children}
      <label className="btn-gold cursor-pointer">
        {busy ? "Uploading…" : "Upload photos"}
        <input type="file" accept="image/*" multiple className="hidden" disabled={busy} onChange={async e => {
          const files = Array.from(e.target.files ?? []); e.target.value = "";
          if (!files.length) return; setBusy(true); setErr("");
          try { await onFiles(files); } catch { setErr("Upload failed. Please try a smaller image."); }
          setBusy(false);
        }} />
      </label>
      {err && <p className="text-sm text-destructive">{err}</p>}
    </div>
  );
}

function PhotoGrid({ items, onRemove }: { items: { key: string; src: string; label?: string }[]; onRemove: (key: string) => void }) {
  if (!items.length) return <p className="text-muted-foreground">No photos.</p>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {items.map(p => (
        <div key={p.key} className="relative group">
          <img src={p.src} alt="" className="w-full aspect-square object-cover" loading="lazy" />
          {p.label && <span className="absolute bottom-1 left-1 bg-background/90 text-xs px-2 py-0.5">{p.label}</span>}
          <button onClick={() => onRemove(p.key)} className="absolute top-1 right-1 bg-background/90 text-destructive p-1.5" aria-label="Remove photo"><Trash2 size={16} /></button>
        </div>))}
    </div>
  );
}

function GalleryPhotos() {
  const { data } = useSiteContent();
  const refresh = useRefresh();
  const [cat, setCat] = useState<string>("Retreats");
  const list = data ? mergeGallery(data.photos, data.hidden) : [];
  return (
    <div className="bg-white p-6 space-y-6">
      <Uploader onFiles={async files => {
        for (const f of files) { const { path, url } = await uploadPhoto(f); await supabase.from("site_photos").insert({ section: "gallery", category: cat, url, storage_path: path }); }
        refresh();
      }}>
        <select value={cat} onChange={e => setCat(e.target.value)} className="border border-border p-3 bg-background">{galleryCategories.map(c => <option key={c}>{c}</option>)}</select>
      </Uploader>
      <PhotoGrid items={list.map(p => ({ key: p.key, src: p.src, label: p.cat }))} onRemove={async key => {
        const p = list.find(x => x.key === key); if (!p || !confirm("Remove this photo from the gallery?")) return;
        await removePhoto(p, "gallery"); refresh();
      }} />
    </div>
  );
}

function RoomPhotos() {
  const { data } = useSiteContent();
  const refresh = useRefresh();
  const [room, setRoom] = useState(retreats[0].id);
  const list = data ? roomPhotos(room, data.photos, data.hidden) : [];
  return (
    <div className="bg-white p-6 space-y-6">
      <p className="text-sm text-muted-foreground">The first photo is shown on the room's card.</p>
      <Uploader onFiles={async files => {
        for (const f of files) { const { path, url } = await uploadPhoto(f); await supabase.from("site_photos").insert({ section: "room", room_id: room, url, storage_path: path }); }
        refresh();
      }}>
        <select value={room} onChange={e => setRoom(e.target.value)} className="border border-border p-3 bg-background">{retreats.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
      </Uploader>
      <PhotoGrid items={list.map((p, i) => ({ key: p.key, src: p.src, label: i === 0 ? "Card photo" : undefined }))} onRemove={async key => {
        const p = list.find(x => x.key === key); if (!p || !confirm("Remove this photo from the room?")) return;
        await removePhoto(p, "room"); refresh();
      }} />
    </div>
  );
}
