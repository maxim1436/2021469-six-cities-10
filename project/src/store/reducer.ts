import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCityName, getAllOffers, sortByPopular, sortByLowToHigh, sortByHighToLow, sortByTopRatedFirst } from './action';
import { sortOffersPriceUp, sortOffersPriceDown, sortOffersRatingDown } from '../utils';

const initialState = {
  city: 'Paris',
  offers: offers.filter((offer) => offer.city === 'Paris'),
};

export const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, action) => {
      state.city = action.payload;
      state.offers = offers.filter((offer) => offer.city === action.payload);
    })
    .addCase(getAllOffers, (state) => {
      state.offers = offers;
    })
    .addCase(sortByPopular, (state) => {
      state.offers = offers.filter((offer) => offer.city === state.city);
    })
    .addCase(sortByLowToHigh, (state) => {
      const offersForSort = [...state.offers];
      state.offers = offersForSort.sort(sortOffersPriceUp);
    })
    .addCase(sortByHighToLow, (state) => {
      const offersForSort = [...state.offers];
      state.offers = offersForSort.sort(sortOffersPriceDown);
    })
    .addCase(sortByTopRatedFirst, (state) => {
      const offersForSort = [...state.offers];
      state.offers = offersForSort.sort(sortOffersRatingDown);
    });
});

