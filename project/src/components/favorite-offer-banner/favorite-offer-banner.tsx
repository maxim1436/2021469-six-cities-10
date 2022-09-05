import { OfferType } from '../../types/types';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { postNewFavoriteProperty } from '../../services/api-actions';

type FavoriteOfferBannerProps = {
  offer: OfferType;
}

function FavoriteOfferBanner ({offer}: FavoriteOfferBannerProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [offerFavoriteProperty, setOfferFavoriteProperty] = useState(offer.isFavorite);
  const classNamesForFavoriteOfferButton = (isFavorite: boolean) => `place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`;

  const changeOfferFavoriteProperty = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      setOfferFavoriteProperty(!offerFavoriteProperty);
      postNewFavoriteProperty(offer.id, !offer.isFavorite);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className={classNamesForFavoriteOfferButton(offerFavoriteProperty)} type="button" onClick={changeOfferFavoriteProperty}>
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default FavoriteOfferBanner;
