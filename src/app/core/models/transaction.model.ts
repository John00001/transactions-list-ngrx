export interface TransactionModel {
  rowId: number;
  time: Date;
  type: string;
  sender: string;
  volume: number;
}

export class Transaction implements TransactionModel {
  rowId = -1;
  time = null;
  type = '';
  sender = '';
  volume = -1;

  constructor(dto?: TransactionModel) {
    if (!dto) {
      return;
    }
    this.rowId = dto.rowId || this.rowId;
    this.time = dto.time || this.time;
    this.type = dto.type || this.type;
    this.sender = dto.sender || this.sender;
    this.volume = dto.volume || this.volume;
  }

}
