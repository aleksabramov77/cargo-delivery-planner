import Split from 'react-split';
import { Table } from './components/table';
import { Map } from './components/map';
import './index.css';
import { useJsApiLoader } from '@react-google-maps/api';

export const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: String(process.env.REACT_APP_GOOGLE_API_KEY),
    libraries: ['places'],
  });
  return (
    <>
      <Split sizes={[35, 65]} direction="horizontal" cursor="col-resize" className="split-flex" minSize={[300, 800]}>
        <Table />
        <Map isLoaded={isLoaded} />
      </Split>
    </>
  );
};
