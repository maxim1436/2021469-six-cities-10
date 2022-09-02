import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import MainPageScreenEmpty from '../../pages/main-page-screen-empty/main-pge-screen-empty';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../../components/private-route/private-route';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {isCheckedAuth} from '../../utils';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  const [choosenOffer, setChoosenOffer] = useState(Object);
  const {authorizationStatus, isDataLoaded, offers} = useAppSelector((state) => state);
  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
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
            element = {offers.length === 0 ? <MainPageScreenEmpty/> : <MainPageScreen setChoosenOffer = {setChoosenOffer}/>}
          />
          <Route
            path = {AppRoute.Login}
            element = {
              authorizationStatus === AuthorizationStatus.Auth ? <MainPageScreen setChoosenOffer = {setChoosenOffer}/> : <LoginScreen routeName = {AppRoute.Main}/>
            }
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
