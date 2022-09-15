import { takeLatest, select, put, call } from 'redux-saga/effects';
import { getDirectionsAPI, getGeocodeAPI, getSuggestionsAPI } from '../../api';
import {
  getGeocodeByAddress,
  setAddressSuggests,
  setPointData,
  setSelectedOrderDirections,
} from '../actions/actionCreators';
import { getAutocompleteInput, getOrder } from '../selectors';
import { IDeliveryOrder } from '../reducers/types';

export function* handleDirections(order: IDeliveryOrder) {
  try {
    const response: google.maps.DirectionsResult = yield call(getDirectionsAPI, order);
    yield put(setSelectedOrderDirections(response));
  } catch (e) {
    console.log('getDirectionsAPI error', e);
  }
}

export function* handleSuggestions(input: string) {
  try {
    const response: google.maps.places.AutocompleteResponse = yield call(getSuggestionsAPI, input);
    yield put(setAddressSuggests(response));
  } catch (e) {
    console.log('getSuggestionsAPI error', e);
  }
}

export function* handleGeocode({ address, point, index }: ReturnType<typeof getGeocodeByAddress>['payload']) {
  try {
    const coords: [number, number] = yield call(getGeocodeAPI, address);
    yield put(setPointData({ point, index, address, coords }));
  } catch (e) {
    console.log('getGeocodeAPI error', e);
  }
}

export function* watchRoute() {
  const order: IDeliveryOrder = yield select(getOrder);
  if (order) {
    yield call(handleDirections, order);
  } else {
    yield put(setSelectedOrderDirections(null));
  }
}

export function* watchSuggest() {
  const input: string = yield select(getAutocompleteInput);
  if (input) {
    yield call(handleSuggestions, input);
  }
}

export function* watchAddressPoint({ payload }: ReturnType<typeof getGeocodeByAddress>) {
  yield call(handleGeocode, payload);
}

export default function* rootSaga() {
  yield takeLatest('SET_SELECTED_ORDER', watchRoute);
  yield takeLatest('SET_ADDRESS_INPUT', watchSuggest);
  yield takeLatest('GET_GEOCODE_BY_ADDRESS', watchAddressPoint);
}
