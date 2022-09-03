import FavoriteScreeListComponent from '../../components/favorite-screen-list-componet/favorite-screen-list-component';
import { useAppSelector } from '../../hooks';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import UserInfo from '../../components/user-info/user-info';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Logo from '../../components/logo/logo';
import { OfferType } from '../../types/types';

type favoriteOffersArraies = {
  parisOffers: OfferType[],
  cologneOffers: OfferType[],
  brusselsOffers: OfferType[],
  amsterdamOffers: OfferType[],
  hamburgOffers: OfferType[],
  dusseldorfOffers: OfferType[],
};

function FavoritesScreen (): JSX.Element {
  const favoriteOffersArraies: favoriteOffersArraies = {
    parisOffers: [],
    cologneOffers: [],
    brusselsOffers: [],
    amsterdamOffers: [],
    hamburgOffers: [],
    dusseldorfOffers: [],
  };

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
    favoriteOffers.forEach((offer) => {
      switch (offer.city.name) {
        case 'Paris':
          favoriteOffersArraies.parisOffers.push(offer);
          break;
        case 'Cologne':
          favoriteOffersArraies.cologneOffers.push(offer);
          break;
        case 'Brussels':
          favoriteOffersArraies.brusselsOffers.push(offer);
          break;
        case 'Amsterdam':
          favoriteOffersArraies.amsterdamOffers.push(offer);
          break;
        case 'Hamburg':
          favoriteOffersArraies.hamburgOffers.push(offer);
          break;
        default:
          favoriteOffersArraies.dusseldorfOffers.push(offer);
      }
    });
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                {
                  <Logo/>
                }
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
                {
                  <FavoriteScreeListComponent cityName='Paris' offers={favoriteOffersArraies.parisOffers}/>
                }
                {
                  <FavoriteScreeListComponent cityName='Cologne' offers={favoriteOffersArraies.cologneOffers}/>
                }
                {
                  <FavoriteScreeListComponent cityName='Brussels' offers={favoriteOffersArraies.brusselsOffers}/>
                }
                {
                  <FavoriteScreeListComponent cityName='Amsterdam' offers={favoriteOffersArraies.amsterdamOffers}/>
                }
                {
                  <FavoriteScreeListComponent cityName='Hamburg' offers={favoriteOffersArraies.hamburgOffers}/>
                }
                {
                  <FavoriteScreeListComponent cityName='Dusseldorf' offers={favoriteOffersArraies.dusseldorfOffers}/>
                }
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          {
            <Logo/>
          }
        </footer>
      </div>
    );
  }

}

export default FavoritesScreen;
