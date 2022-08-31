import { sortOffersPriceUp, sortOffersPriceDown, sortOffersRatingDown, sortOffersByPopular } from '../utils';
import { OfferType } from '../types/types';

export const selectOffersByPopular = (state: OfferType[], choosenCity: string) => sortOffersByPopular([...state], choosenCity);

export const selectOffersPriceUp = (state: OfferType[]) => [...state].sort(sortOffersPriceUp);

export const selectOffersPriceDown = (state: OfferType[]) => [...state].sort(sortOffersPriceDown);

export const selectOffersRatingDown = (state: OfferType[]) => [...state].sort(sortOffersRatingDown);

