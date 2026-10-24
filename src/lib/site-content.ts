import { propertyPhotos, siteMedia } from "@/data/site-media";
import { guestReviews } from "@/data/guest-reviews";
import { retreats } from "@/data/site";

export const OWNER_WHATSAPP = "917897369258";
export const ADMIN_EMAIL = "nitarastays@gmail.com";

export type DbReview = { id: string; name: string; quote: string };
export type DbPhoto = { id: string; section: string; room_id: string | null; category: string; url: string; storage_path: string | null; alt: string };
export type Hidden = { kind: string; item_key: string };

export const galleryCategories = ["Retreats", "Landscapes", "Experiences", "Food"] as const;
export type GalleryCat = typeof galleryCategories[number];

export const builtInGallery: { src: string; alt?: string; cat: GalleryCat }[] = [
  ...propertyPhotos,
  { src: siteMedia["sunset-picnic.webp"], cat: "Experiences" },
  { src: siteMedia["snow-peaks.webp"], cat: "Landscapes" },
  { src: siteMedia["valley-view.webp"], cat: "Landscapes" },
  { src: siteMedia["snow-village.webp"], cat: "Landscapes" },
  { src: siteMedia["snow-roof.webp"], cat: "Landscapes" },
  { src: siteMedia["photo-1414235077428-338989a2e8c0.webp"], cat: "Food" },
  { src: siteMedia["photo-1504674900247-0877df9cc836.webp"], cat: "Food" },
];

const isHidden = (hidden: Hidden[], kind: string, key: string) => hidden.some(h => h.kind === kind && h.item_key === key);

export function mergeReviews(db: DbReview[], hidden: Hidden[]) {
  const builtIn = guestReviews.filter(r => !isHidden(hidden, "review", r.name)).map(r => ({ key: r.name, name: r.name, quote: r.quote, builtIn: true }));
  return [...db.map(r => ({ key: r.id, name: r.name, quote: r.quote, builtIn: false })), ...builtIn];
}

export function mergeGallery(db: DbPhoto[], hidden: Hidden[]) {
  const builtIn = builtInGallery.filter(g => !isHidden(hidden, "gallery", g.src)).map(g => ({ ...g, key: g.src, builtIn: true }));
  const added = db.filter(p => p.section === "gallery").map(p => ({ src: p.url, alt: p.alt, cat: p.category as GalleryCat, key: p.id, builtIn: false, path: p.storage_path }));
  return [...added, ...builtIn];
}

export function roomPhotos(roomId: string, db: DbPhoto[], hidden: Hidden[]) {
  const room = retreats.find(r => r.id === roomId);
  const added = db.filter(p => p.section === "room" && p.room_id === roomId).map(p => ({ src: p.url, key: p.id, builtIn: false, path: p.storage_path }));
  const builtIn = room && !isHidden(hidden, "room", `${roomId}|${room.img}`) ? [{ src: room.img, key: `${roomId}|${room.img}`, builtIn: true, path: null }] : [];
  return [...added, ...builtIn];
}

export type BookingMessage = {
  reference: string; room: string; checkIn: string; checkOut: string; nights: number; guests: number;
  name: string; phone: string; email: string; addons: string; notes: string; total: number;
};

export function whatsappBookingUrl(b: BookingMessage) {
  const lines = [
    `*New Booking — Nitara Stays*`,
    `Ref: ${b.reference}`,
    `Room: ${b.room}`,
    `Check-in: ${b.checkIn}`,
    `Check-out: ${b.checkOut} (${b.nights} nights)`,
    `Guests: ${b.guests}`,
    `Name: ${b.name}`,
    `Phone: ${b.phone || "-"}`,
    `Email: ${b.email}`,
    `Add-ons: ${b.addons || "-"}`,
    `Notes: ${b.notes || "-"}`,
    `Estimated total: ₹${b.total.toLocaleString("en-IN")}`,
  ];
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export type StayPeriod = "current" | "upcoming" | "past";
export function stayPeriod(checkIn: string, checkOut: string, today: string): StayPeriod {
  if (checkOut <= today) return "past";
  if (checkIn > today) return "upcoming";
  return "current";
}
