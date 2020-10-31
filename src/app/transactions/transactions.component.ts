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
  private cachedFacts = Array.from<Transaction>({ length: 0 });
  private dataStream = new BehaviorSubject<(Transaction | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;

  constructor(
    private transactionsService: TransactionsService,
    private store: Store<AppState>
  ) {
    super();

    // this.fetchTransactions();
    this.store.dispatch(new GetTransactions());
    this.transactions$ = this.store.pipe(select(selectTransactionList)).subscribe((res: Array<Transaction>) => {
        this.cachedFacts = this.cachedFacts.concat(res);
        this.dataStream.next(this.cachedFacts);
      }
    );
  }

  connect(collectionViewer: CollectionViewer): Observable<(Transaction | undefined)[] | ReadonlyArray<Transaction | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {

      const currentPage = this.getPageForIndex(range.end);

      if (currentPage && range) {
        console.log(currentPage, this.lastPage);
      }

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        // this.fetchTransactions()
        this.store.dispatch(new GetTransactions());
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  // private fetchTransactions(): void {
  //   this.transactionsService.getTransactions().subscribe((res: Array<Transaction>) => {
  //     this.cachedFacts = this.cachedFacts.concat(res);
  //     this.dataStream.next(this.cachedFacts);
  //   });
  // }

  private getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}
