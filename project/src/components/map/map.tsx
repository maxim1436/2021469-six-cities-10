import { useRef, useEffect, useState } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT } from '../../const';
import { OfferType } from '../../types/types';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';

type MapProps = {
  mapCenter: OfferType;
  points: OfferType[];
  styleSettings?: object;
}

function Map ({mapCenter, points, styleSettings}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const [choosenOffer, setChoosenOffer] = useState({});
  const [markers, setMarkers] = useState <LayerGroup | null>(null);
  const map = useMap(mapRef, mapCenter);

  if(markers && mapCenter !== choosenOffer) {
    markers.clearLayers();
  }

  useEffect(() => {
    const markerGroup = leaflet.layerGroup();
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
          .addTo(markerGroup);
      });
      setMarkers(markerGroup);
      setChoosenOffer(mapCenter);
      markerGroup.addTo(map);
    }
  },[map, points, mapCenter]);
  return (
    <div
      style={styleSettings}
      ref = {mapRef}
    >
    </div>
  );
}

export default Map;
