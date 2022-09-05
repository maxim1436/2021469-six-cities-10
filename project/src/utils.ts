import { OfferType, ReviewType } from './types/types';
import { AuthorizationStatus} from './const';

export const convertRatingToStars = (rating: number) => rating * 100 / 5;

export const toUpFirstLetter = (string: string) => string[0].toUpperCase() + string.slice(1);

export const sortOffersPriceUp = (offerA: OfferType, offerB: OfferType) => offerA.price - offerB.price;

export const sortOffersPriceDown = (offerA: OfferType, offerB: OfferType) => offerB.price - offerA.price;

export const sortOffersRatingDown = (offerA: OfferType, offerB: OfferType) => offerB.rating - offerA.rating;

export const sortOffersByPopular = (offers: OfferType[], choosenCity: string) => offers.filter((offer) => offer.city.name === choosenCity );

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const humanizeDate = (date: string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const newDate = new Date(date);
  return `${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
};

export const sortReviewDateUp = (reviewA: ReviewType, reviewB: ReviewType) => {
  const dateA = new Date (reviewA.date);
  const dateB = new Date (reviewB.date);

  if (dateA === dateB) {
    return 0;
  }

  return dateB > dateA
    ? 1
    : -1;
};
