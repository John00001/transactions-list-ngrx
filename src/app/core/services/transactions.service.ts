import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsParams = {
    columns: 'row_id,time,status,sender,volume',
    receiver: 'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
    type: 'transaction',
    limit: 10
  };

  constructor(
    private http: HttpClient
  ) {
  }

  getTransactions(lastTransactionRowId: number = null): Observable<any> {
    const params = this.buildParams(lastTransactionRowId);

    return this.http.get(`${environment.baseUrl}?${params}`);
  }

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
