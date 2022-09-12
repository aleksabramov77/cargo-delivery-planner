import React from 'react';
import Split from 'react-split';
import { DraggableTable } from './components/draggable-table';
import { Map } from './components/map';
import './index.css';
import { PlacesAutocomplete } from './components/places-autocomplete';
import { useJsApiLoader } from '@react-google-maps/api';

export const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_API_KEY),
    libraries: ['places'],
  });
  return (
    <>
      <PlacesAutocomplete isLoaded={isLoaded} />
      <Split sizes={[25, 75]} direction="horizontal" cursor="col-resize" className="split-flex" minSize={[300, 800]}>
        <DraggableTable />
        <Map isLoaded={isLoaded} />
      </Split>
    </>
  );
};
