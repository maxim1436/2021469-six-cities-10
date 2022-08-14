import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import PrivateRoute from '../../components/private-route/private-route';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<MainPageScreen offersCount = {offersCount} />}
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
              authorizationStatus = {AuthorizationStatus.NoAuth}
            >
              <PropertyScreen />
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
