import { Component } from '@angular/core';
import { TransactionsService } from '../core/services/transactions.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Transaction } from '../core/models/transaction.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetTransactions } from '../store/actions/transaction.actions';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { selectTransactionList } from '../store/selectors/transaction.selectors';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent {
  dataSource: TransactionsDataSource;

  constructor(
    private transactionsService: TransactionsService,
    private store: Store<AppState>
  ) {
    this.dataSource = new TransactionsDataSource(transactionsService, store);
  }
}

export class TransactionsDataSource extends DataSource<Transaction | undefined> {
  transactions$: Subscription;
  private dataStream = new BehaviorSubject<(Transaction | undefined)[]>(Array.from<Transaction>({ length: 0 }));
  private subscription = new Subscription();

  private pageSize = 10;
  private transactionListLength = 0;

  constructor(
    private transactionsService: TransactionsService,
    private store: Store<AppState>
  ) {
    super();

    this.store.dispatch(new GetTransactions());
    this.transactions$ = this.store.pipe(select(selectTransactionList)).subscribe((res: Array<Transaction>) => {
        this.transactionListLength = res.length;
        this.dataStream.next(res);
      }
    );
  }

  connect(collectionViewer: CollectionViewer): Observable<(Transaction | undefined)[] | ReadonlyArray<Transaction | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const currentPage = this.getPageForIndex(range.end);
      const lastPage = this.getLastPage();

      if (currentPage > lastPage) {
        this.store.dispatch(new GetTransactions());
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(end: number): number {
    return Math.floor(end / this.pageSize);
  }

  private getLastPage(): number {
    return Math.floor(this.transactionListLength / this.pageSize) - 1;
  }

}
