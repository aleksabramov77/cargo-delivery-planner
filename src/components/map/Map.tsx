import {
  GoogleMap,
  useJsApiLoader,
  GoogleMapProps,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { PlacesAutocomplete } from '../places-autocomplete';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions: GoogleMapProps['options'] = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  fullscreenControl: false,
  // center: new google.maps.LatLng(55.753215, 37.622504),
  center: { lat: 55.753215, lng: 37.622504 },
  zoom: 10,
};

interface MapProps {
  isLoaded: boolean;
}

export const Map: FC<MapProps> = ({ isLoaded }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>();
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const calculateRote = async () => {
        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
          origin: new google.maps.LatLng(55.81028523967671, 37.5243569851305),
          destination: new google.maps.LatLng(55.66752071763275, 37.77145465143174),
          waypoints: [{ location: new google.maps.LatLng(55.705022603274806, 37.55569586286878) }],
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(result);
        setDistance(result.routes[0].legs[0].distance?.text || '');
        setDuration(result.routes[0].legs[0].duration?.text || '');
      };
      calculateRote();
    }
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} onUnmount={onUnmount} options={defaultOptions}>
      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  ) : (
    <h2>Loading...</h2>
  );
};
