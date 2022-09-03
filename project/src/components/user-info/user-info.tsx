import { useAppSelector, useAppDispatch } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logoutAction } from '../../services/api-actions';
import { fetchFavoriteOffersAction } from '../../services/api-actions';
import { store } from '../../store';

function UserInfo (): JSX.Element {
  const {authorizationStatus, user, favoriteOffers} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const getFavoriteOffers = () => {
    store.dispatch(fetchFavoriteOffersAction());
  };

  const signOut = () => {
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <Link to={AppRoute.Favorites} title={AppRoute.Favorites} onClick={getFavoriteOffers}>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="/#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user.email}</span>
                <span className="header__favorite-count">{favoriteOffers.length}</span>
              </a>
            </li>
          </Link>
          <Link to='/' onClick={signOut}>
            <li className="header__nav-item">
              <a className="header__nav-link" href="/#">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <Link to={`${AppRoute.Login}`} title = {`${AppRoute.Login}`}>
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="/#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </a>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }

}
export default UserInfo;
