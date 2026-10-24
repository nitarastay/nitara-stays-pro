export type GuestReview = {
  name: string;
  quote: string;
  approved: boolean;
  source: "user-supplied";
};

export function selectGuestReviews(reviews: readonly GuestReview[]) {
  return reviews.filter(review => review.approved && review.source === "user-supplied");
}

export const guestReviews = selectGuestReviews([
  {
    name: "Ankur Shukla",
    quote: "Had a great stay great ambiance great accomodation excellent food and hospitality served. Must recommended. Owner Shrey Bhai Helped us a lot throughout our stay.",
    approved: true,
    source: "user-supplied",
  },
  {
    name: "Shubham Kaushik",
    quote: "We have stayed at nitara stays at mukteshwar dhanachuli. Awesome property with great location and ambience. We have enjoyed a lot. Thanks to owner Shrey Bhai to take care of us and helped a lot.",
    approved: true,
    source: "user-supplied",
  },
  {
    name: "Avinash Trivedi",
    quote: "Whenever I go mukteswar I always stay at this hotel It’s a very nice hotel the people there are wonderful and everything about it is excellent",
    approved: true,
    source: "user-supplied",
  },
  {
    name: "Shivakant Trivedi",
    quote: "A must go place ,if you are looking for a peaceful trip , Specially, their hospitality it's so heartfilling. stunning Himalayas astonishes you ,when you will see them from your window...",
    approved: true,
    source: "user-supplied",
  },
  {
    name: "Abhay pratap Singh",
    quote: "Beautiful hotel with amazing view, and the staff and owner was very humble and caring, food was too good , made my trip more memorable and happiest",
    approved: true,
    source: "user-supplied",
  },
]);