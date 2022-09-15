import { IDeliveryOrder } from '../redux/reducers/types';

export const getDirectionsAPI = async (order: IDeliveryOrder): Promise<google.maps.DirectionsResult> => {
  const directionsService = new google.maps.DirectionsService();
  const request: google.maps.DirectionsRequest = {
    origin: new google.maps.LatLng(...order.points.origin.coords),
    destination: new google.maps.LatLng(...order.points.destination.coords),
    travelMode: google.maps.TravelMode.DRIVING,
  };

  const response = await directionsService.route(request);

  return response;
};

export const getSuggestionsAPI = async (input: string): Promise<google.maps.places.AutocompleteResponse> => {
  const autocompleteService = new google.maps.places.AutocompleteService();
  const request: google.maps.places.AutocompletionRequest = {
    input,
    language: 'ru',
    region: 'ru',
    componentRestrictions: { country: 'ru' },
    types: ['geocode'],
  };

  const response = await autocompleteService.getPlacePredictions(request);

  return response;
};

export const getGeocodeAPI = async (address: string): Promise<[number, number]> => {
  const geocoder = new google.maps.Geocoder();
  const request: google.maps.GeocoderRequest = {
    address,
  };

  const response = await geocoder.geocode(request);

  const {
    location: { lat, lng },
  } = response.results[0].geometry;

  return [lat(), lng()];
};
