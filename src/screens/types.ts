import { StackScreenProps } from '@react-navigation/stack';
import { Expense } from 'model/types';

export type RootStackParamList = {
  Welcome: NoRouteParams;
  HomeTabs: NoRouteParams;
  ModalExpense: {
    expense?: Expense;
  };
  ModalFilter: NoRouteParams;
};

export type NoRouteParams = undefined;

export type CreateEditExpenseModalScreenProps = StackScreenProps<
  RootStackParamList,
  'ModalExpense'
>;
