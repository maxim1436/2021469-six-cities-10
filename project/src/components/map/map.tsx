import { useRef, useEffect, useState } from 'react';
import { Icon, Marker, LayerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { OfferType } from '../../types/types';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';

type MapProps = {
  selectedPoint?: OfferType | undefined;
  mapCenter: OfferType;
  points: OfferType[];
  styleSettings?: object;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const markerGroupsArray: Array<LayerGroup> = [];

function Map ({selectedPoint, mapCenter, points, styleSettings}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const [choosenOffer, setChoosenOffer] = useState({});
  const map = useMap(mapRef, mapCenter);

  if (mapCenter !== choosenOffer) {
    markerGroupsArray.forEach((group) => {
      group.clearLayers();
    });
    markerGroupsArray.splice(0);
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
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerGroup);
      });
      markerGroupsArray.push(markerGroup);
      setChoosenOffer(mapCenter);
      markerGroup.addTo(map);
    }
  },[map, points, mapCenter, selectedPoint]);

  return (
    <div
      style={styleSettings}
      ref = {mapRef}
    >
    </div>
  );
}

export default Map;
