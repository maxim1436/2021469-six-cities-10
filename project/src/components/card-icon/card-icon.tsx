import { OfferType } from '../../types/types';
import { convertRatingToStars, toUpFirstLetter } from '../../utils';

const FIRST_INDEX_ELEMENT = 0;

type CardIconProps = {
  offer: OfferType;
  onMouseOver: (offer: OfferType) => void;
  onClick: (offer: OfferType) => void;
}

function CardIcon ({offer, onMouseOver, onClick}: CardIconProps): JSX.Element {

  function PremiumBanner () {
    return (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    );
  }

  function FavoriteOfferBanner () {
    if (offer.isFavorite) {
      return (
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">In bookmarks</span>
        </button>
      );
    }

    return (
      <button className="place-card__bookmark-button button" type="button">
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">In bookmarks</span>
      </button>
    );
  }
  return (
    <article onMouseOver={() => onMouseOver(offer)} onClick = {() => onClick(offer)} className="cities__card place-card">
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
          {FavoriteOfferBanner()}
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
