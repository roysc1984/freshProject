export interface Expense {
  id: string;
  title: string;
  amount: number | undefined;
  date: number;
}

export interface FilterExpenseData {
  title: string;
  amount: number | undefined;
  date: number | undefined;
}
