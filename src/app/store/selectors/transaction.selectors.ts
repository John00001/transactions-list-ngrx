import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';
import { TransactionState } from '../states/transaction.state';

const selectTransactions = (state: AppState) => state.transactions;

export const selectTransactionList = createSelector(
  selectTransactions,
  (state: TransactionState) => state.transactions
);

export const selectLastRowId = createSelector(
  selectTransactions,
  (state: TransactionState) => state.transactions[state.transactions.length - 1].rowId
);

// get the last transaction row id
