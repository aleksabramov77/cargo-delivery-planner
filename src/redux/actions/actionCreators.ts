export const setSelectedOrder = (payload: number) => ({
  type: 'SET_SELECTED_ORDER' as const,
  payload,
});

export const setEditedPoint = (payload: { index: number; point: 'origin' | 'destination' }) => ({
  type: 'SET_EDITED_POINT' as const,
  payload,
});

export const resetEditedPoint = () => ({
  type: 'RESET_EDITED_POINT' as const,
});

export const setSelectedOrderDirections = (payload: google.maps.DirectionsResult | null) => ({
  type: 'SET_SELECTED_ORDER_DIRECTIONS' as const,
  payload,
});

export const getGeocodeByAddress = (payload: { index: number; point: 'origin' | 'destination'; address: string }) => ({
  type: 'GET_GEOCODE_BY_ADDRESS' as const,
  payload,
});

export const setPointData = (payload: {
  index: number;
  point: 'origin' | 'destination';
  address: string;
  coords: [number, number];
}) => ({
  type: 'SET_POINT_DATA' as const,
  payload,
});

export const setAddressInput = (payload: string) => ({
  type: 'SET_ADDRESS_INPUT' as const,
  payload,
});

export const setAddressSuggests = (payload: google.maps.places.AutocompleteResponse) => ({
  type: 'SET_ADDRESS_SUGGESTS' as const,
  payload,
});
