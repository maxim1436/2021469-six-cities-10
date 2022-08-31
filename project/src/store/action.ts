import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { OfferType } from '../types/types';
import { AuthorizationStatus } from '../const';

export const changeCityName = createAction('changeCityName', (value) => ({
  payload: value,
}));

export const getFilteredOffers = createAction<OfferType[]>('getFilteredOffers');

export const sortByPopular = createAction(SortType.Popular);
export const sortByLowToHigh = createAction(SortType.LowToHigh);
export const sortByHighToLow = createAction(SortType.HighToLow);
export const sortByTopRatedFirst = createAction(SortType.TopRatedFirst);

export const loadOffers = createAction<OfferType[]>('data/offers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
