import { Expense, FilterExpenseData } from 'model/types';

export interface AddEditExpensesAction {
  expense: Expense;
}

export interface RemoveExpensesAction {
  id: string;
}

export interface SetFilterExpenseDataAction {
  filterExpense: FilterExpenseData;
}
