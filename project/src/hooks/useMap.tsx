import { useState, useEffect, MutableRefObject } from 'react';
import { Map } from 'leaflet';
import leaflet from 'leaflet';
import { OfferType } from '../types/types';

function useMap (mapRef: MutableRefObject<HTMLElement | null>, mapCenter: OfferType): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const [prevMapCenter, setPrevMapCenter] = useState(mapCenter);
  useEffect(() => {
    if (prevMapCenter !== mapCenter && map !== null) {
      map.panTo(new leaflet.LatLng(mapCenter.city.location.latitude, mapCenter.city.location.longitude));
      setPrevMapCenter(mapCenter);
    }
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: mapCenter.city.location.latitude,
          lng: mapCenter.city.location.longitude,
        },
        zoom: mapCenter.city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);
      setMap(instance);
    }
  }, [mapRef, map, mapCenter, prevMapCenter]);
  return map;
}

export default useMap;
