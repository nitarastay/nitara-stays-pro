import { describe, expect, it } from "vitest";
import { siteLinks } from "@/data/site-links";
import vercelConfig from "../../vercel.json";

describe("official Nitara Stays links", () => {
  it("uses the supplied Facebook profile", () => {
    expect(siteLinks.facebook).toBe("https://www.facebook.com/nitarastays");
  });
  it("uses the supplied Instagram profile", () => {
    expect(siteLinks.instagram).toBe("https://www.instagram.com/nitarastays/");
  });
  it("uses the supplied Google review listing", () => {
    expect(siteLinks.googleReviews).toBe("https://share.google/psPlh62cKAOD7EEqL");
  });
});

describe("Vercel routing", () => {
  it("serves files before falling back to the app for direct page visits", () => {
    expect(vercelConfig.framework).toBe("vite");
    expect(vercelConfig.outputDirectory).toBe("dist");
    // Vercel rewrites run after real files are matched, so images still load.
    expect(vercelConfig.rewrites).toEqual([{ source: "/(.*)", destination: "/index.html" }]);
  });
});