import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../../components/private-route/private-route';
import { OfferType, ReviewType } from '../../types/types';

type AppScreenProps = {
  offersCount: number;
  offers: OfferType[];
  reviews: ReviewType[];
}

function App({offersCount, offers, reviews}: AppScreenProps): JSX.Element {
  const [choosenOffer, setChoosenOffer] = useState(offers[0]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPageScreen offersCount = {offersCount} offers = {offers} setChoosenOffer = {setChoosenOffer}/>}
        />
        <Route
          path = {AppRoute.Login}
          element = {<LoginScreen />}
        />
        <Route
          path = {AppRoute.Favorites}
          element = {<FavoritesScreen />}
        />
        <Route
          path = {AppRoute.Room}
          element = {
            <PrivateRoute
              authorizationStatus = {AuthorizationStatus.Auth}
            >
              <PropertyScreen
                offer = {choosenOffer}
                reviews = {reviews}
              />
            </PrivateRoute>
          }
        />
        <Route
          path = "*"
          element = {<ErrorScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
