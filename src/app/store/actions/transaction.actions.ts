import { Action } from '@ngrx/store';
import { Transaction } from '../../core/models/transaction.model';

export enum TransactionActionsEnum {
  GetTransactions = '[Transaction] Get Transactions',
  GetTransactionsSuccess = '[Transaction] Get Transactions Success'
}

export class GetTransactions implements Action {
  public readonly type = TransactionActionsEnum.GetTransactions;
}

export class GetTransactionsSuccess implements Action {
  public readonly type = TransactionActionsEnum.GetTransactionsSuccess;

  constructor(public payload: Array<Transaction>) {
  }
}

export type TransactionActions = GetTransactions | GetTransactionsSuccess;
