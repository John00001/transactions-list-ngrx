import { Transaction } from '../../core/models/transaction.model';

export interface TransactionState {
  transactions: Array<Transaction>;
}

export const initialTransactionState: TransactionState = {
  transactions: []
};
