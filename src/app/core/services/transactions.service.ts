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

  constructor(
    private http: HttpClient,
    private ngxLogger: NGXLogger
  ) {
  }

  getTransactions(params: HttpParams): Observable<Array<Transaction> | HttpErrorResponse> {
    return this.http.get(`${environment.baseUrl}?${params}`)
      .pipe(map(this.mapTransactions),
        catchError((err: HttpErrorResponse): Observable<HttpErrorResponse> => {
          this.ngxLogger.error('Something went wrong on fetching Transactions: ', err.message);
          return throwError(err);
        }));
  }

  private mapTransactions = (response: Array<Array<any>>): Array<Transaction> => {
    return response.map((item: Array<any>): Transaction => new Transaction({
      rowId: item[0],
      time: new Date(item[1]),
      type: item[2],
      sender: item[3],
      volume: item[4]
    }));
  }
}
