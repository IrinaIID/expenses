export interface User {
  idUser: number;
  name: string;
  email: string;
  password: string;
}

export interface Transaction {
  id: string;
  idUser: number;
  type: TypeTransaction;
  title: string;
  description: string;
  amount: number;
  regularity: 'yes' | 'no';
  category: string;
  subcategories: string[];
  date: number;
}

export type TransactionDraft = Omit<Transaction, 'id'>;

export interface BalanceTableData extends Omit<Transaction, 'idUser' | 'date'> {
  date: string;
}

export type TypeTransaction = 'income' | 'expense' | null;
