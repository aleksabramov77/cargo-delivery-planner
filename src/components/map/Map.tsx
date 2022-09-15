import { GoogleMap, GoogleMapProps, DirectionsRenderer } from '@react-google-maps/api';
import { FC, useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks';

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
  center: { lat: 55.753215, lng: 37.622504 },
  zoom: 10,
};

interface MapProps {
  isLoaded: boolean;
}

export const Map: FC<MapProps> = ({ isLoaded }) => {
  const { selectedOrderDirections } = useAppSelector((state) => state.delivery);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return (
    <div>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} onUnmount={onUnmount} options={defaultOptions}>
          {selectedOrderDirections && <DirectionsRenderer directions={selectedOrderDirections} />}
        </GoogleMap>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};
