
export type OfferType = {
  photos: string[];
  isPremium: boolean;
  price: number;
  title: string;
  typeOfPlace: string;
  isFavorite: boolean;
  rating: number;
  id: string;
  lat: number;
  lng: number;
};

export type ReviewType = {
  avatar: string;
  userName: string;
  reviewsRating: number;
  date: string;
  textReview: string;
};
