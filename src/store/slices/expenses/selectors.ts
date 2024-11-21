import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ExpensesAdapter } from './reducer';

export const selectExpenses = (state: RootState) =>
  ExpensesAdapter.getSelectors().selectAll(state.expenses);

export const selectExpensesFilterData = (state: RootState) =>
  state.expenses.filterExpenseData;

export const selectFilterExpenses = createSelector(
  selectExpenses,
  selectExpensesFilterData,
  (expenses, filterExpenseData) => {
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

export const selectExpensesTotalItems = createSelector(
  selectExpenses,
  (expenses) => expenses.length,
);

export const selectExpensesTotalAmount = createSelector(
  selectFilterExpenses,
  (expenses) =>
    expenses.reduce((total, expense) => total + (expense?.amount ?? 0), 0),
);
