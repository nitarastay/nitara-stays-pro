// Absolute asset origin keeps the same CDN images working on Vercel and in preview.
const assetOrigin = "https://id-preview--83dcbc59-7520-443a-b1a3-951ed9e139d8.lovable.app";

import asset0 from "@/assets/mountain-journey.webp.asset.json";
import asset1 from "@/assets/nitara-room-detail.webp.asset.json";
import asset2 from "@/assets/nitara-room-interior.webp.asset.json";
import asset3 from "@/assets/nitara-room-terrace.webp.asset.json";
import asset4 from "@/assets/nitara-room-wide.webp.asset.json";
import asset5 from "@/assets/nitara-terrace-day.webp.asset.json";
import asset6 from "@/assets/nitara-terrace-night.webp.asset.json";
import asset7 from "@/assets/nitara-wordmark.png.asset.json";
import asset8 from "@/assets/owner-shrey.webp.asset.json";
import asset9 from "@/assets/photo-1414235077428-338989a2e8c0.webp.asset.json";
import asset10 from "@/assets/photo-1432405972618-c60b0225b8f9.webp.asset.json";
import asset11 from "@/assets/photo-1464822759023-fed622ff2c3b.webp.asset.json";
import asset12 from "@/assets/photo-1469474968028-56623f02e42e.webp.asset.json";
import asset13 from "@/assets/photo-1470770841072-f978cf4d019e.webp.asset.json";
import asset14 from "@/assets/photo-1482938289607-e9573fc25ebb.webp.asset.json";
import asset15 from "@/assets/photo-1501854140801-50d01698950b.webp.asset.json";
import asset16 from "@/assets/photo-1504674900247-0877df9cc836.webp.asset.json";
import asset17 from "@/assets/photo-1506905925346-21bda4d32df4.webp.asset.json";
import asset18 from "@/assets/photo-1518002171953-a080ee817e1f.webp.asset.json";
import asset19 from "@/assets/photo-1519681393784-d120267933ba.webp.asset.json";
import asset20 from "@/assets/photo-1540541338287-41700207dee6.webp.asset.json";
import asset21 from "@/assets/photo-1545194445-dddb8f4487c6.webp.asset.json";
import asset22 from "@/assets/photo-1571896349842-33c89424de2d.webp.asset.json";
import asset23 from "@/assets/photo-1623625434462-e5e42318ae49.webp.asset.json";
import asset24 from "@/assets/snow-peaks.webp.asset.json";
import asset25 from "@/assets/snow-roof.webp.asset.json";
import asset26 from "@/assets/snow-village.webp.asset.json";
import asset27 from "@/assets/sunset-picnic.webp.asset.json";
import asset28 from "@/assets/terrace.webp.asset.json";
import asset29 from "@/assets/valley-view.webp.asset.json";

export const siteMedia = {
  "mountain-journey.webp": new URL(asset0.url, assetOrigin).href,
  "nitara-room-detail.webp": new URL(asset1.url, assetOrigin).href,
  "nitara-room-interior.webp": new URL(asset2.url, assetOrigin).href,
  "nitara-room-terrace.webp": new URL(asset3.url, assetOrigin).href,
  "nitara-room-wide.webp": new URL(asset4.url, assetOrigin).href,
  "nitara-terrace-day.webp": new URL(asset5.url, assetOrigin).href,
  "nitara-terrace-night.webp": new URL(asset6.url, assetOrigin).href,
  "nitara-wordmark.png": new URL(asset7.url, assetOrigin).href,
  "owner-shrey.webp": new URL(asset8.url, assetOrigin).href,
  "photo-1414235077428-338989a2e8c0.webp": new URL(asset9.url, assetOrigin).href,
  "photo-1432405972618-c60b0225b8f9.webp": new URL(asset10.url, assetOrigin).href,
  "photo-1464822759023-fed622ff2c3b.webp": new URL(asset11.url, assetOrigin).href,
  "photo-1469474968028-56623f02e42e.webp": new URL(asset12.url, assetOrigin).href,
  "photo-1470770841072-f978cf4d019e.webp": new URL(asset13.url, assetOrigin).href,
  "photo-1482938289607-e9573fc25ebb.webp": new URL(asset14.url, assetOrigin).href,
  "photo-1501854140801-50d01698950b.webp": new URL(asset15.url, assetOrigin).href,
  "photo-1504674900247-0877df9cc836.webp": new URL(asset16.url, assetOrigin).href,
  "photo-1506905925346-21bda4d32df4.webp": new URL(asset17.url, assetOrigin).href,
  "photo-1518002171953-a080ee817e1f.webp": new URL(asset18.url, assetOrigin).href,
  "photo-1519681393784-d120267933ba.webp": new URL(asset19.url, assetOrigin).href,
  "photo-1540541338287-41700207dee6.webp": new URL(asset20.url, assetOrigin).href,
  "photo-1545194445-dddb8f4487c6.webp": new URL(asset21.url, assetOrigin).href,
  "photo-1571896349842-33c89424de2d.webp": new URL(asset22.url, assetOrigin).href,
  "photo-1623625434462-e5e42318ae49.webp": new URL(asset23.url, assetOrigin).href,
  "snow-peaks.webp": new URL(asset24.url, assetOrigin).href,
  "snow-roof.webp": new URL(asset25.url, assetOrigin).href,
  "snow-village.webp": new URL(asset26.url, assetOrigin).href,
  "sunset-picnic.webp": new URL(asset27.url, assetOrigin).href,
  "terrace.webp": new URL(asset28.url, assetOrigin).href,
  "valley-view.webp": new URL(asset29.url, assetOrigin).href,
} as const;

export const propertyPhotos = [
  { src: siteMedia["nitara-room-wide.webp"], alt: "Nitara Stays bedroom with balcony", cat: "Retreats" as const },
  { src: siteMedia["nitara-terrace-day.webp"], alt: "Nitara Stays terrace in daylight", cat: "Retreats" as const },
  { src: siteMedia["nitara-room-interior.webp"], alt: "Nitara Stays bedroom interior", cat: "Retreats" as const },
  { src: siteMedia["nitara-room-detail.webp"], alt: "Nitara Stays room seating and television", cat: "Retreats" as const },
  { src: siteMedia["nitara-room-terrace.webp"], alt: "Nitara Stays room opening onto the terrace", cat: "Retreats" as const },
  { src: siteMedia["nitara-terrace-night.webp"], alt: "Nitara Stays terrace at night", cat: "Retreats" as const },
  { src: siteMedia["mountain-journey.webp"], alt: "A journey beneath snow-covered Himalayan peaks", cat: "Landscapes" as const },
];
