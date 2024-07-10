export interface UserFire {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface UserFire {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface UserFB {
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  idUser: string;
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

export interface DataCharts {
  income: number[];
  expense: number[];
  date: number[];
}
