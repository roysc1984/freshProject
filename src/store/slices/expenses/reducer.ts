import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Expense, FilterExpenseData } from 'model/types';
import { clearAll } from 'store/actions/actions';
import {
  AddEditExpensesAction,
  RemoveExpensesAction,
  SetFilterExpenseDataAction,
} from './payloads';

export interface SliceStateExtra {
  filterExpenseData: FilterExpenseData | undefined;
}

export type SliceState = {
  ids: string[];
  entities: Record<string, Expense>;
} & SliceStateExtra;

const initialState: SliceStateExtra = {
  filterExpenseData: undefined,
};

export const ExpensesAdapter = createEntityAdapter<Expense, string>({
  selectId: (expense: Expense) => expense.id,
  sortComparer: (a, b) => b.date - a.date,
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: ExpensesAdapter.getInitialState(initialState),
  reducers: {
    addExpense(state, action: PayloadAction<AddEditExpensesAction>) {
      ExpensesAdapter.addOne(state, action.payload.expense);
    },
    updateExpense(state, action: PayloadAction<AddEditExpensesAction>) {
      ExpensesAdapter.updateOne(state, {
        id: action.payload.expense.id,
        changes: action.payload.expense,
      });
    },
    removeExpense(state, action: PayloadAction<RemoveExpensesAction>) {
      ExpensesAdapter.removeOne(state, action.payload.id);
    },
    setFilterExpenseData(
      state,
      action: PayloadAction<SetFilterExpenseDataAction>,
    ) {
      state.filterExpenseData = action.payload.filterExpense;
    },
    clearFilterExpenseData(state) {
      state.filterExpenseData = undefined;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(clearAll, () =>
      ExpensesAdapter.getInitialState(initialState),
    ),
});

export default expensesSlice.reducer;
export const {
  addExpense,
  updateExpense,
  removeExpense,
  setFilterExpenseData,
  clearFilterExpenseData,
} = expensesSlice.actions;
