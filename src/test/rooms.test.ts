import { describe, expect, it } from "vitest";
import { retreats } from "@/data/site";

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
});