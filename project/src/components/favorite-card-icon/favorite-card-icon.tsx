import {OfferType} from '../../types/types';
import { convertRatingToStars, toUpFirstLetter } from '../../utils';
import PremiumBanner from '../premium-banner/premium-banner';

const FIRST_INDEX_ELEMENT = 0;

type FavoriteCardIconProps = {
  favoriteOffer: OfferType;
}

function FavoritesCardIcon ({favoriteOffer}: FavoriteCardIconProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {
        favoriteOffer.isPremium
          ? < PremiumBanner/>
          : null
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="/#">
          <img className="place-card__image" src={favoriteOffer.images[FIRST_INDEX_ELEMENT]} width="150" height="110" alt="Place img"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favoriteOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${convertRatingToStars(favoriteOffer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{favoriteOffer.title}</a>
        </h2>
        <p className="place-card__type">{toUpFirstLetter(favoriteOffer.type)}</p>
      </div>
    </article>
  );
}

export default FavoritesCardIcon;
