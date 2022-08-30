export const convertRatingToStars = (rating) => rating * 100 / 5;

export const toUpFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

export const sortOffersPriceUp = (offerA, offerB) => offerA.price - offerB.price;

export const sortOffersPriceDown = (offerA, offerB) => offerB.price - offerA.price;

export const sortOffersRatingDown = (offerA, offerB) => offerB.rating - offerA.rating;
