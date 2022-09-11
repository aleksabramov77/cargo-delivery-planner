import React, { useState, useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
// import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { LineString } from 'ol/geom';
import 'ol/ol.css';
import { fromLonLat, transform } from 'ol/proj';

export const MapComponent = () => {
  const [map, setMap] = useState<Map>();
  const mapElement = useRef();
  const mapRef = useRef<HTMLDivElement>();
  // @ts-ignore
  mapRef.current = map;

  // console.log(geocode());

  map?.on('click', (evt) => {
    console.log('evt.coordinate: ' + evt.coordinate);
  });

  const route = new Feature();
  const coordinates = [
    [55.809628, 37.52425],
    [55.670497, 37.768897],
  ];
  const start = transform(coordinates[0], 'EPSG:3857', 'EPSG:4326').reverse().toString();
  const end = transform(coordinates[1], 'EPSG:3857', 'EPSG:4326').reverse().toString();

  // console.log({ start });
  // console.log({ end });

  // const geometry = new LineString(coordinates);
  // geometry.transform('EPSG:4326', 'EPSG:3857'); //Transform to your map projection
  // route.setGeometry(geometry);

  // const url =
  //   'https://dev.virtualearth.net/REST/v1/Routes?wp.0=' +
  //   start +
  //   '&wp.1=' +
  //   end +
  //   '&routeAttributes=routePath&key=' +
  //   bingKey;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([37.728404, 55.743122]),
        zoom: 10,
      }),
    });
    setMap(initialMap);
  }, []);

  // @ts-ignore
  return <div style={{ height: '100vh', width: '100%' }} ref={mapElement} className="map-container" />;
};
