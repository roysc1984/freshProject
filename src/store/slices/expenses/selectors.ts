import { RootState } from 'store/store';
import { createSelector } from '@reduxjs/toolkit';
import { ExpensesAdapter } from './reducer';

export const selectExpensesFilterData = (state: RootState) =>
  state.expenses.filterExpenseData;

export const selectFilterExpenses = createSelector(
  (state: RootState) => state.expenses,
  selectExpensesFilterData,
  (expensesData, filterExpenseData) => {
    const expenses = ExpensesAdapter.getSelectors().selectAll(expensesData);
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
  },
);

export const selectExpensesTotalItems = (state: RootState) =>
  ExpensesAdapter.getSelectors().selectTotal(state.expenses);

export const selectExpensesTotalAmount = createSelector(
  selectFilterExpenses,
  (expenses) =>
    expenses.reduce((total, expense) => total + (expense?.amount ?? 0), 0),
);
