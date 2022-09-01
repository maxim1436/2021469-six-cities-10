import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
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
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppScreenProps = {
  reviews: ReviewType[];
}

function App({reviews}: AppScreenProps): JSX.Element {
  const [choosenOffer, setChoosenOffer] = useState(Object);
  const {authorizationStatus, isDataLoaded, offers} = useAppSelector((state) => state);
  if (isCheckedAuth(authorizationStatus) || isDataLoaded || !offers.length) {
    return (
      <LoadingScreen />
    );
  } else {
    return (
      <HistoryRouter history={browserHistory}>
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
            element = {
              <PrivateRoute
                authorizationStatus = {authorizationStatus}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path = {AppRoute.Room}
            element = {
              <PropertyScreen
                offer = {choosenOffer}
                reviews = {reviews}
                setChoosenOffer = {setChoosenOffer}
              />
            }
          />
          <Route
            path = "*"
            element = {<ErrorScreen />}
          />
        </Routes>
      </HistoryRouter>
    );
  }
}

export default App;
