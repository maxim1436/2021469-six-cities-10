import CardIcon from '../../components/card-icon/card-icon';
import { OfferType } from '../../types/types';

type NeighbourhoodOffersProps = {
  neighbourhoodOffers: OfferType[];
  setChoosenOffer: (offerId: OfferType) => void;
}

function NeighbourhoodOffers ({neighbourhoodOffers, setChoosenOffer}: NeighbourhoodOffersProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {
        neighbourhoodOffers.map((neighbourhoodOffer) => {
          const keyValue = `${neighbourhoodOffer.id}`;
          return (
            <CardIcon key={keyValue} setChoosenOffer = {setChoosenOffer} offer={neighbourhoodOffer} />
          );
        })
      }
    </div>
  );
}

export default NeighbourhoodOffers;
