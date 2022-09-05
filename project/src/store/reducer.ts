import { createReducer } from '@reduxjs/toolkit';
import { setCommentAddedStatus, setComments, getNewFavoriteProperty, setFavoriteOffers, setNearbyOffers, setUserData, changeCityName, getFilteredOffers, sortByPopular, sortByLowToHigh, sortByHighToLow, sortByTopRatedFirst, loadOffers, requireAuthorization, setError, setDataLoadedStatus } from './action';
import { selectOffersPriceUp, selectOffersPriceDown, selectOffersRatingDown, selectOffersByPopular } from './selectors';
import { OfferType, ReviewType } from '../types/types';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

type InitialState = {
  city: string,
  offers: OfferType[],
  sourcedOffers: OfferType[],
  nearbyOffers: OfferType[],
  favoriteOffers: OfferType[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isCommentAdded: boolean,
  error: string | null,
  user: UserData,
  reviews: ReviewType[],
}

const initialState: InitialState = {
  city: 'Paris',
  sourcedOffers: [],
  offers: [],
  nearbyOffers: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isCommentAdded: false,
  error: null,
  user: {
    email: '',
    token: '',
    id: 0
  },
  reviews: [],
};

export const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(changeCityName, (state, action) => {
      state.city = action.payload;
      state.offers = state.sourcedOffers.filter((offer) => offer.city.name === action.payload);
    })
    .addCase(getFilteredOffers, (state) => {
      const filteredOffers = state.sourcedOffers.filter((offer) => offer.city.name === state.city);
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
      state.sourcedOffers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user.email = action.payload.email;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(getNewFavoriteProperty, (state, action) => {
      const deleteIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      const deleteIndexForSourcedOffers = state.sourcedOffers.findIndex((offer) => offer.id === action.payload.id);
      state.offers.splice(deleteIndex, 1, action.payload);
      state.sourcedOffers.splice(deleteIndexForSourcedOffers, 1, action.payload);
    })
    .addCase(setComments, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setCommentAddedStatus, (state, action) => {
      state.isCommentAdded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

