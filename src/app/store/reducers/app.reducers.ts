import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { routerReducer } from '@ngrx/router-store';
import { transactionReducers } from './transaction.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  transactions: transactionReducers
};
