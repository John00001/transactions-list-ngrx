import { RouterReducerState } from '@ngrx/router-store';
import { initialTransactionState, TransactionState } from './transaction.state';

export interface AppState {
  router?: RouterReducerState;
  transactions: TransactionState;
}

export const initialAppState: AppState = {
  transactions: initialTransactionState
};

export function getInitialState(): AppState {
  return initialAppState;
}
