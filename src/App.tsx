import React from 'react';
import Split from 'react-split';
import './index.css';

import './index.css';
import { DraggableTable } from './components/draggable-table';
import { Map } from './components/map';

export const App = () => {
  return (
    <Split sizes={[25, 75]} direction="horizontal" cursor="col-resize" className="split-flex" minSize={[300, 800]}>
      <DraggableTable />
      <Map />
    </Split>
  );
};
