import FavoriteCityIcon from '../../components/favorite-city-icon/favorite-city-icon';
import FavoriteCardIcon from '../../components/favorite-card-icon/favorite-card-icon';
import { OfferType } from '../../types/types';

type FavoriteScreeListComponentProps = {
  offers: OfferType[];
  cityName: string;
};

function FavoriteScreeListComponent ({offers, cityName}: FavoriteScreeListComponentProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      {
        offers.length
          ? <FavoriteCityIcon cityName={cityName}/>
          : null
      }
      <div className="favorites__places">
        {
          offers.map((offer) => {
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
  );
}

export default FavoriteScreeListComponent;
