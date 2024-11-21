import { RootState } from 'store/store';
import { ExpensesAdapter } from './reducer';

export const selectExpenses = (state: RootState) =>
  ExpensesAdapter.getSelectors().selectAll(state.expenses);

export const selectExpensesFilterData = (state: RootState) =>
  state.expenses.filterExpenseData;

export const selectFilterExpenses = (state: RootState) => {
  const expenses = selectExpenses(state);
  const filterExpenseData = selectExpensesFilterData(state);

  if (filterExpenseData) {
    const matchedFilter = expenses.filter(
      (expense) =>
        (filterExpenseData?.amount
          ? expense.amount === filterExpenseData.amount
          : true) &&
        (filterExpenseData?.title
          ? expense.title === filterExpenseData.title
          : true) &&
        (filterExpenseData?.date
          ? expense.date === filterExpenseData.date
          : true),
    );

    return matchedFilter;
  }
  return expenses;
};

export const selectExpensesTotalItems = (state: RootState) =>
  ExpensesAdapter.getSelectors().selectTotal(state.expenses);

export const selectExpensesTotalAmount = (state: RootState) => {
  const expenses = selectFilterExpenses(state);

  return expenses.reduce((total, expense) => total + (expense?.amount ?? 0), 0);
};
