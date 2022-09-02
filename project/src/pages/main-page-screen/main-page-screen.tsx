import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import CardIcon from '../../components/card-icon/card-icon';
import UserInfo from '../../components/user-info/user-info';
import { OfferType } from '../../types/types';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSortingForm from '../../components/places-sorting/places-sorting-form';
import Logo from '../../components/logo/logo';

type MainPageScreenProps = {
  setChoosenOffer: (offerId: OfferType) => void;
}

function MainPageScreen ({setChoosenOffer}: MainPageScreenProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const choosenCity = useAppSelector((state) => state.city);
  const [mouseFocusOffer, setMouseFocusOffer] = useState(Object);
  return (
    <div className="page page--gray page--main">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          {
            <CitiesList/>
          }
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {choosenCity}</b>
              {
                <PlacesSortingForm/>
              }
              <div className="cities__places-list places__list tabs__content">
                {
                  offers.map((offer) => {
                    const keyValue = `${offer.id}`;
                    return (
                      <CardIcon key={keyValue} setChoosenOffer = {setChoosenOffer} setMouseFocusOffer = {setMouseFocusOffer} offer={offer} />
                    );
                  })
                }
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {
                  <Map
                    selectedPoint = {mouseFocusOffer}
                    mapCenter = {offers[0]}
                    points = {offers}
                    styleSettings = {{height: '980px'}}
                  />
                }
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
