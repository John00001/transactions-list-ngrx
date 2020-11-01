import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction.model';
import { catchError, map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsParams = {
    columns: 'row_id,time,type,sender,volume',
    receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
    type: 'transaction',
    limit: 10
  };

  constructor(
    private http: HttpClient,
    private ngxLogger: NGXLogger
  ) {
  }

  getTransactions(lastTransactionRowId: number = null): Observable<any> {
    const params = this.buildParams(lastTransactionRowId);

    return this.http.get(`${environment.baseUrl}?${params}`);
      // .pipe(map(this.mapTransactions),
      //   catchError((err: HttpErrorResponse): Observable<HttpErrorResponse> => {
      //     this.ngxLogger.error('Something went wrong on fetching Transactions: ', err.message);
      //     return throwError(err);
      //   }));
  }

  // private mapTransactions = (response: Array<Array<any>>): Array<Transaction> => {
  //   return response.map((item: Array<any>): Transaction => new Transaction({
  //     rowId: item[0],
  //     time: new Date(item[1]),
  //     type: item[2],
  //     sender: item[3],
  //     volume: item[4]
  //   }));
  // }

  private buildParams(cursor) {
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
}
