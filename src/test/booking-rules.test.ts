import { describe, it, expect } from "vitest";
import { stayPeriod, whatsappBookingUrl } from "@/lib/site-content";

describe("booking rules", () => {
  it("sends booking details to +91 78973 69258", () => {
    const url = whatsappBookingUrl({ reference: "NIT-1", room: "AAROH", checkIn: "2026-11-01", checkOut: "2026-11-03", nights: 2, guests: 2, name: "Test", phone: "99", email: "a@b.c", addons: "", notes: "", total: 100 });
    expect(url.startsWith("https://wa.me/917897369258?text=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Room: AAROH");
  });
  it("classifies past, current and upcoming stays", () => {
    expect(stayPeriod("2026-10-01", "2026-10-05", "2026-10-24")).toBe("past");
    expect(stayPeriod("2026-10-23", "2026-10-26", "2026-10-24")).toBe("current");
    expect(stayPeriod("2026-11-01", "2026-11-03", "2026-10-24")).toBe("upcoming");
  });
});
