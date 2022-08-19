import { OfferType } from '../../types/types';
import { convertRatingToStars, toUpFirstLetter } from '../../utils';
import PremiumBanner from '../premium-banner/premium-banner';
import FavoriteOfferBanner from '../favorite-offer-banner/favorite-offer-banner';

const FIRST_INDEX_ELEMENT = 0;

type CardIconProps = {
  offer: OfferType;
  setMouseFocusOffer: (offer: OfferType) => void;
  setChoosenOffer: (offer: OfferType) => void;
}

function CardIcon ({offer, setMouseFocusOffer, setChoosenOffer}: CardIconProps): JSX.Element {

  const onMouseOver = () => {
    setMouseFocusOffer(offer);
  };

  const onClick = () => {
    setChoosenOffer(offer);
  };

  return (
    <article onMouseOver={onMouseOver} onClick = {onClick} className="cities__card place-card">
      {
        offer.isPremium
          ? < PremiumBanner/>
          : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img className="place-card__image" src={offer.photos[FIRST_INDEX_ELEMENT]} width="260" height="200" alt="Place img"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {<FavoriteOfferBanner isOfferFavorite = {offer.isFavorite}/>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${convertRatingToStars(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{toUpFirstLetter(offer.typeOfPlace)}</p>
      </div>
    </article>
  );
}

export default CardIcon;
