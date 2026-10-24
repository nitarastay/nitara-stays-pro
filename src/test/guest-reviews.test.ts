import { describe, expect, it } from "vitest";
import { guestReviews } from "@/data/guest-reviews";

describe("homepage guest reviews", () => {
  it("shows exactly the five owner-supplied reviews", () => {
    expect(guestReviews).toHaveLength(5);
  });

  it("includes only approved user-supplied reviews, with no invented ratings or dates", () => {
    guestReviews.forEach(review => {
      expect(review.approved).toBe(true);
      expect(review.source).toBe("user-supplied");
      expect(review).not.toHaveProperty("stars");
      expect(review).not.toHaveProperty("date");
    });
  });
});
