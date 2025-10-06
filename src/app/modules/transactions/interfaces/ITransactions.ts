export interface ITransactions{
    id: number;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: Date;
    category_id: number;
}

export interface IGetTransactionsResponse {
  message: string;
  data: ITransactions[];
}

export interface IGetBalanceResponse {
  message: string;
  data: number;
}

export interface IOneTransactionResponse{
    message: string;
    data: ITransactions;
}