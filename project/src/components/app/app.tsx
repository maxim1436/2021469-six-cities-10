import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../../components/private-route/private-route';
import { ReviewType } from '../../types/types';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {isCheckedAuth} from '../../utils';

type AppScreenProps = {
  reviews: ReviewType[];
}

function App({reviews}: AppScreenProps): JSX.Element {
  const [choosenOffer, setChoosenOffer] = useState(Object);
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPageScreen setChoosenOffer = {setChoosenOffer}/>}
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
              authorizationStatus = {authorizationStatus}
            >
              <PropertyScreen
                offer = {choosenOffer}
                reviews = {reviews}
                setChoosenOffer = {setChoosenOffer}
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
