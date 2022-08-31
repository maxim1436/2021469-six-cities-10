import { createReducer } from '@reduxjs/toolkit';
import { changeCityName, getFilteredOffers, sortByPopular, sortByLowToHigh, sortByHighToLow, sortByTopRatedFirst, loadOffers, requireAuthorization, setError, setDataLoadedStatus } from './action';
import { selectOffersPriceUp, selectOffersPriceDown, selectOffersRatingDown, selectOffersByPopular } from './selectors';
import { OfferType } from '../types/types';
import { AuthorizationStatus } from '../const';

type InitialState = {
  city: string,
  offers: OfferType[],
  sourcedOffers: OfferType[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
}

const initialState: InitialState = {
  city: 'Paris',
  sourcedOffers: [],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
};

export const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, action) => {
      state.city = action.payload;
      state.offers = state.sourcedOffers.filter((offer) => offer.city.name === action.payload);
    })
    .addCase(getFilteredOffers, (state, action) => {
      state.sourcedOffers = action.payload;
      const filteredOffers = action.payload.filter((offer) => offer.city.name === state.city);
      state.offers = filteredOffers;
    })
    .addCase(sortByPopular, (state) => {
      state.offers = selectOffersByPopular(state.sourcedOffers, state.city);
    })
    .addCase(sortByLowToHigh, (state) => {
      state.offers = selectOffersPriceUp(state.offers);
    })
    .addCase(sortByHighToLow, (state) => {
      state.offers = selectOffersPriceDown(state.offers);
    })
    .addCase(sortByTopRatedFirst, (state) => {
      state.offers = selectOffersRatingDown(state.offers);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

