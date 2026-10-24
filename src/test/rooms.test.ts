import { describe, expect, it } from "vitest";
import { retreats } from "@/data/site";
import { siteMedia } from "@/data/site-media";

describe("room renaming preserves the existing rooms", () => {
  const names = ["AAROH", "AARUNYA", "ANANT", "SAANJH", "THE AMBER CHAMBER", "VYOM"];
  const ids = ["dhanachuli-house", "forest-terrace", "summit-suite", "alpine-chalet", "valley-retreat", "orchard-cottage"];
  const prices = [18500, 14500, 24500, 21000, 16500, 12500];

  names.forEach((name, index) => {
    it(`renames ${ids[index]} to ${name} without changing its price`, () => {
      expect(retreats[index]).toMatchObject({ id: ids[index], name, price: prices[index] });
    });
  });

  it("retains all nine existing room entries", () => {
    expect(retreats).toHaveLength(9);
    expect(retreats.slice(6).map(room => room.id)).toEqual(["ridgeline-studio", "kumaoni-farmhouse", "cloud-villa"]);
  });

  it("shows real property photography on every room card, never stock photos", () => {
    const realPhotos = new Set(Object.values(siteMedia).filter(u => !/photo-\d{10}/.test(u)));
    retreats.forEach(room => expect(realPhotos.has(room.img)).toBe(true));
  });
});