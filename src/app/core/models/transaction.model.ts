export interface TransactionModel {
  rowId: number;
  time: Date;
  status: string;
  sender: string;
  volume: number;
}

export class Transaction implements TransactionModel {
  rowId = -1;
  time = null;
  status = '';
  sender = '';
  volume = -1;

  constructor(dto?: TransactionModel) {
    if (!dto) {
      return;
    }
    this.rowId = dto.rowId || this.rowId;
    this.time = dto.time || this.time;
    this.status = dto.status || this.status;
    this.sender = dto.sender || this.sender;
    this.volume = dto.volume || this.volume;
  }

}
