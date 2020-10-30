import { Component } from '@angular/core';
import { TransactionsService } from '../core/services/transactions.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Transaction } from '../core/models/transaction.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent {
  dataSource: TransactionsDataSource;

  constructor(private transactionsService: TransactionsService) {
    this.dataSource = new TransactionsDataSource(transactionsService);
  }

}

export class TransactionsDataSource extends DataSource<Transaction | undefined> {
  private cachedFacts = Array.from<Transaction>({ length: 0 });
  private dataStream = new BehaviorSubject<(Transaction | undefined)[]>(this.cachedFacts);
  private subscription = new Subscription();

  private pageSize = 10;
  private lastPage = 0;
  private transactionsParams = {
    columns: 'row_id,time,type,sender,volume',
    receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
    type: 'transaction',
    limit: this.pageSize
  };

  constructor(private transactionsService: TransactionsService) {
    super();

    // Start with some data.
    this.fetchTransactions();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Transaction | undefined)[] | ReadonlyArray<Transaction | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {

      const currentPage = this._getPageForIndex(range.end);

      if (currentPage && range) {
        console.log(currentPage, this.lastPage);
      }

      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this.fetchTransactions();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private fetchTransactions(): void {
    const params = this.buildParams();

    this.transactionsService.getTransactions(params).subscribe((res: Array<Transaction>) => {
      this.cachedFacts = this.cachedFacts.concat(res);
      this.dataStream.next(this.cachedFacts);
    });
  }

  private buildParams() {
    const cursor = this.getCursor();
    let params = new HttpParams()
      .set('columns', this.transactionsParams.columns)
      .set('receiver', this.transactionsParams.receiver)
      .set('type', this.transactionsParams.type)
      .set('limit', this.transactionsParams.limit.toString());

    if (cursor) {
      params = params.set('cursor', cursor);
    }

    return params;
  }

  private getCursor(): string {
    return this.cachedFacts.length ?
      this.cachedFacts[this.cachedFacts.length - 1].rowId.toString() :
      null;
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}
