import { OfferType } from '../../types/types';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, AppRoute } from '../../const';
import {useNavigate} from 'react-router-dom';
import { postNewFavoriteProperty } from '../../services/api-actions';

type FavoriteOfferBannerForPropertyScreenProps = {
  offer: OfferType;
}

function FavoriteOfferBannerForPropertyScreen ({offer}: FavoriteOfferBannerForPropertyScreenProps): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [offerFavoriteProperty, setOfferFavoriteProperty] = useState(offer.isFavorite);
  const classNamesForFavoriteOfferButton = (isFavorite: boolean) => `property__bookmark-icon${isFavorite ? '--active' : ''}`;

  const changeOfferFavoriteProperty = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      setOfferFavoriteProperty(!offerFavoriteProperty);
      postNewFavoriteProperty(offer.id, !offer.isFavorite);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button className="property__bookmark-button  button" type="button" onClick={changeOfferFavoriteProperty}>
      <svg className={classNamesForFavoriteOfferButton(offerFavoriteProperty)} width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteOfferBannerForPropertyScreen;
