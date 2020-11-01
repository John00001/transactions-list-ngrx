import { initialTransactionState, TransactionState } from '../states/transaction.state';
import { TransactionActions, TransactionActionsEnum } from '../actions/transaction.actions';

export const transactionReducers = (
  state = initialTransactionState,
  action: TransactionActions
): TransactionState => {
  switch (action.type) {
    case TransactionActionsEnum.GetTransactionsSuccess: {
      return {
        ...state,
        transactions: state.transactions.concat(action.payload)
      };
    }

    default:
      return state;
  }
};
