import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../const';

export const changeCityName = createAction('changeCityName', (value) => ({
  payload: value,
}));

export const getAllOffers = createAction('getAllOffers');

export const sortByPopular = createAction(SortType.Popular);
export const sortByLowToHigh = createAction(SortType.LowToHigh);
export const sortByHighToLow = createAction(SortType.HighToLow);
export const sortByTopRatedFirst = createAction(SortType.TopRatedFirst);
