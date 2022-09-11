import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsDenylist, actionsCreators and other options
});

//@ts-ignore
const configureStore = (preloadedState) =>
  createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

const store = configureStore({});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
