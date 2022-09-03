import { OfferType } from '../../types/types';
import { convertRatingToStars, toUpFirstLetter } from '../../utils';
import PremiumBanner from '../premium-banner/premium-banner';
import FavoriteOfferBanner from '../favorite-offer-banner/favorite-offer-banner';
import { Link } from 'react-router-dom';
import { fetchNearbyOffersAction, fetchCommentsAction } from '../../services/api-actions';

const FIRST_INDEX_ELEMENT = 0;

type CardIconProps = {
  offer: OfferType;
  setMouseFocusOffer?: (offer: OfferType) => void;
  setChoosenOffer: (offer: OfferType) => void;
}

function CardIcon ({offer, setMouseFocusOffer, setChoosenOffer}: CardIconProps): JSX.Element {
  const onMouseEnter = () => {
    if(setMouseFocusOffer) {
      setMouseFocusOffer(offer);
    }
  };

  const onClick = () => {
    fetchNearbyOffersAction(offer.id);
    fetchCommentsAction(offer.id);
    setChoosenOffer(offer);
  };

  return (
    <article onMouseEnter={onMouseEnter} className="cities__card place-card">
      {
        offer.isPremium
          ? < PremiumBanner/>
          : null
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img className="place-card__image" src={offer.images[FIRST_INDEX_ELEMENT]} width="260" height="200" alt="Place img"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {<FavoriteOfferBanner offer = {offer}/>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${convertRatingToStars(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link to={`/offer/:${offer.id}`} title={`/offer/:${offer.id}`}>
          <h2 className="place-card__name" onClick = {onClick}>
            <a href="/#">{offer.title}</a>
          </h2>
        </Link>
        <p className="place-card__type">{toUpFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default CardIcon;
