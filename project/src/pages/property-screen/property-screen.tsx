import { OfferType } from '../../types/types';
import { convertRatingToStars, toUpFirstLetter, sortReviewDateUp } from '../../utils';
import { useAppSelector } from '../../hooks';
import Review from '../../components/review/review';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import PremiumBannerForPropertyScreen from '../../components/premium-banner-for-property-screen/premium-banner-for-property-screen';
import FavoriteOfferBannerForPropertyScreen from '../../components/favorite-offer-banner-for-property-screen/favorite-offer-banner-for-property-screen';
import NeighbourhoodOffers from '../../components/neighbourhood-offers/neighbourhood-offers';
import UserInfo from '../../components/user-info/user-info';
import { AuthorizationStatus } from '../../const';
import Logo from '../../components/logo/logo';

type PropertyScreenProps = {
  offer: OfferType;
  setChoosenOffer: (offerId: OfferType) => void;
}

function PropertyScreen ({offer, setChoosenOffer}: PropertyScreenProps): JSX.Element {
  const classNamesForAvatar = (isPro: boolean) => `property__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro ' : ''} user__avatar-wrapper`;

  const {authorizationStatus, nearbyOffers, reviews} = useAppSelector((state) => state);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {
                <Logo />
              }
            </div>
            {
              <UserInfo />
            }
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                offer.images.slice(0, 6)
                  .map((photo) => {
                    const keyValue = `${offer.id}-${photo}`;
                    return (
                      <div key={keyValue} className="property__image-wrapper">
                        <img className="property__image" src={photo} alt="Ph studio"/>
                      </div>
                    );
                  })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                offer.isPremium
                  ? < PremiumBannerForPropertyScreen/>
                  : null
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                {<FavoriteOfferBannerForPropertyScreen offer={offer}/>}
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${convertRatingToStars(offer.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {toUpFirstLetter(offer.type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    offer.goods.map((good) => {
                      const keyValue = `${offer.id}-${good}`;
                      return(
                        <li key={keyValue} className="property__inside-item">
                          {good}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={classNamesForAvatar(offer.host.isPro)}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  <span className="property__user-status">
                    {offer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  {
                    reviews.slice(0, 10).sort(sortReviewDateUp)
                      .map((review) => {
                        const keyValue = `${review.rating}-${review.date}-${review.id}`;
                        return (
                          <Review key={keyValue} review = {review}/>
                        );
                      })
                  }
                </ul>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ? <ReviewForm offerId = {offer.id}/>
                    : null
                }
              </section>
            </div>
          </div>
          <section className="property__map map">
            {
              authorizationStatus === AuthorizationStatus.Auth
                ? <Map mapCenter = {offer} points = {nearbyOffers} styleSettings = {{height: '579px', width: '1144px', marginLeft: 'auto', marginRight: 'auto'}}/>
                : null
            }
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {<NeighbourhoodOffers neighbourhoodOffers = {nearbyOffers} setChoosenOffer = {setChoosenOffer}/>}
          </section>
        </div>
      </main>
    </div>
  );
}


export default PropertyScreen;
