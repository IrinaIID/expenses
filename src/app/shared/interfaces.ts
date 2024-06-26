export interface User {
  idUser: number,
  name: string,
  email: string,
  password: string
}

export interface Transaction {
  idTransaction: number,
  idUser: number,
  type: TypeTransaction,
  title: string;
  description: string,
  count: number,
  regularity: boolean,
  category: string,
  subcategories: string[],
  date: Date
}

export type TypeTransaction = 'income' | 'expense'| null;