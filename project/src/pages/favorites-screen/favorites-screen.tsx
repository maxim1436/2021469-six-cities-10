import FavoriteCardIcon from '../../components/favorite-card-icon/favorite-card-icon';
import { useAppSelector } from '../../hooks';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import UserInfo from '../../components/user-info/user-info';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function FavoritesScreen (): JSX.Element {

  const {isDataLoaded, favoriteOffers} = useAppSelector((state) => state);
  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  } else if (!favoriteOffers.length) {
    return (
      <FavoritesEmptyScreen />
    );
  } else {
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>
              {
                <UserInfo/>
              }
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="/#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {
                      favoriteOffers.map((offer) => {
                        const keyValue = `${offer.id}`;
                        if (offer.isFavorite) {
                          return (
                            <FavoriteCardIcon key={keyValue} favoriteOffer = {offer}/>
                          );
                        }
                        return null;
                      })
                    }
                  </div>
                </li>

                <li className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#/">
                        <span>Cologne</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </a>
        </footer>
      </div>
    );
  }

}

export default FavoritesScreen;
