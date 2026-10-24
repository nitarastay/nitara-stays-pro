import { describe, expect, it } from "vitest";
import { retreats } from "@/data/site";
import { siteMedia } from "@/data/site-media";

describe("rooms", () => {
  it("lists exactly the six owner rooms in sentence case", () => {
    expect(retreats.map(r => r.name)).toEqual(["Aaroh", "Aarunya", "Anant", "Saanjh", "The Amber Chamber", "Vyom"]);
  });

  it("keeps existing prices", () => {
    expect(retreats.map(r => r.price)).toEqual([18500, 14500, 24500, 21000, 16500, 12500]);
  });

  it("shows real property photography on every room card, never stock photos", () => {
    const realPhotos = new Set(Object.values(siteMedia).filter(u => !/photo-\d{10}/.test(u)));
    retreats.forEach(room => expect(realPhotos.has(room.img)).toBe(true));
  });

  it("serves images from the site itself, not an external preview host", () => {
    Object.values(siteMedia).forEach(u => expect(u.startsWith("/media/")).toBe(true));
  });
});
