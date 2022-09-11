import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { addressRows } from './addressRows';

export const history = createBrowserHistory();

export const reducer = combineReducers({ addressRows });
