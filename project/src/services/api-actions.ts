import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { OfferType, ReviewType } from '../types/types';
import { setCommentAddedStatus, setComments, getNewFavoriteProperty, setFavoriteOffers, loadOffers, requireAuthorization, setError, setDataLoadedStatus, getFilteredOffers, redirectToRoute, setUserData, setNearbyOffers } from '../store/action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { CommentData } from '../types/comment-data';
import { store } from '../store';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const addComment = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({commentText: comment, commentRating: rating, offerId: id}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<ReviewType[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(setComments(data));
      dispatch(setCommentAddedStatus(false));
    } catch {
      dispatch(setCommentAddedStatus(false));
    }
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));
    dispatch(getFilteredOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const postNewFavoriteProperty = (offerId: number, status: boolean) => {
  const changeFavoriteProperty = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/changeFavoriteProperty',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.post<OfferType>(`${APIRoute.Favorite}/${offerId}/${status ? '1' : '0'}`);
      dispatch(setDataLoadedStatus(true));
      dispatch(getNewFavoriteProperty(data));
      store.dispatch(fetchFavoriteOffersAction());
      dispatch(setDataLoadedStatus(false));
    },
  );
  store.dispatch(changeFavoriteProperty());
};

export const fetchNearbyOffersAction = (offerId: number) => {
  const getNearbyOffers = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/fetchNearbyOffers',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setDataLoadedStatus(true));
      dispatch(setNearbyOffers(data));
      dispatch(setDataLoadedStatus(false));
    },
  );
  store.dispatch(getNearbyOffers());
};

export const fetchCommentsAction = (offerId: number) => {
  const getComments = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/fetchCommentsAction',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<ReviewType[]>(`${APIRoute.Comments}/${offerId}`);
      dispatch(setDataLoadedStatus(true));
      dispatch(setComments(data));
      dispatch(setDataLoadedStatus(false));
    },
  );
  store.dispatch(getComments());
};

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
    dispatch(setDataLoadedStatus(true));
    dispatch(setFavoriteOffers(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(data));
      store.dispatch(fetchFavoriteOffersAction());
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserData({email, password}));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
