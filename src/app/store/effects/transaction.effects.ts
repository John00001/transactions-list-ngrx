import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GetTransactions, GetTransactionsSuccess, TransactionActionsEnum } from '../actions/transaction.actions';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransactionsService } from '../../core/services/transactions.service';
import { AppState } from '../states/app.state';
import { Store } from '@ngrx/store';
import { Transaction } from '../../core/models/transaction.model';

@Injectable()
export class TransactionEffects {
  @Effect()
  getTransactions$ = this.actions$.pipe(
    ofType<GetTransactions>(TransactionActionsEnum.GetTransactions),
    withLatestFrom(this.store, (action, state) => ({ state })),
    switchMap(({ state }) => {
      const lastTransactionRowId = state.transactions.transactions.length ?
        state.transactions.transactions[state.transactions.transactions.length - 1].rowId :
        null;
      return this.transactionsService.getTransactions(lastTransactionRowId);
    }),
    switchMap((response: Array<Array<any>>) => of(new GetTransactionsSuccess(this.mapTransactions(response))))
  );

  private mapTransactions = (response: Array<Array<any>>): Array<Transaction> => {
    return response.map((item: Array<any>): Transaction => new Transaction({
      rowId: item[0],
      time: new Date(item[1]),
      status: item[2],
      sender: item[3],
      volume: item[4]
    }));
  };

  constructor(
    private transactionsService: TransactionsService,
    private actions$: Actions,
    private store: Store<AppState>
  ) {
  }
}
