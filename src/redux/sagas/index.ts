// import { takeLatest, select, put, call } from 'redux-saga/effects';
// import { getLatestNewsAPI, getPopularNewsAPI } from '../../api';
// import {
//   setLatestNews,
//   setLatestNewsError,
//   setLoader,
//   setPopularNews,
//   setPopularNewsError,
// } from '../actions/actionCreators';
// import { LOCATION_CHANGE } from 'connected-react-router';
// import { getPathname } from '../selectors';
//
// export function* handleLatestNews() {
//   try {
//     const { hits } = yield call(getLatestNewsAPI, 'react');
//     yield put(setLatestNews(hits));
//   } catch {
//     yield put(setLatestNewsError('Error fetching latest news'));
//   }
// }
//
// export function* handlePopularNews() {
//   try {
//     const { hits } = yield call(getPopularNewsAPI);
//     yield put(setPopularNews(hits));
//   } catch {
//     yield put(setPopularNewsError('Error fetching popular news'));
//   }
// }
//
// export function* watchNewsSags() {
//   yield put(setLoader(true));
//   const pathname: string = yield select(getPathname);
//   if (pathname === '/popular-news') {
//     yield call(handlePopularNews);
//   } else if (pathname === '/latest-news') {
//     yield call(handleLatestNews);
//   }
//   yield put(setLoader(false));
// }

export default function* rootSaga() {
  // yield takeLatest(LOCATION_CHANGE, watchNewsSags);
}
