import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';
import { URL_MARKER_DEFAULT } from '../../const';
import { OfferType } from '../../types/types';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: OfferType[];
}

function Map ({points}: MapProps): JSX.Element {
  const mapCenter = points[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, mapCenter);
  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            new Icon({
              iconUrl: URL_MARKER_DEFAULT,
              iconSize: [40, 40],
              iconAnchor: [20, 40]
            })
          )
          .addTo(map);
      });
    }
  },[map, points]);

  return (
    <div
      style={{height: '980px'}}
      ref = {mapRef}
    >
    </div>
  );
}

export default Map;
