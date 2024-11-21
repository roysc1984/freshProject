import FloatingLabelInput from 'components/FloatingLabelInput';
import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { BLACK_COLOR, LIGHT_GRAY_COLOR } from 'theme/themeStyles';
import { removeDollarChar, showAmount } from '../utils';
import { ExpenseInput } from '../types';

interface ExpenseInputsProps {
  expense?: ExpenseInput;
  changeExpense: (expense: ExpenseInput) => void;
  style?: StyleProp<ViewStyle>;
}

const ExpenseInputs: FC<ExpenseInputsProps> = ({
  expense = {} as ExpenseInput,
  changeExpense,
  style,
}) => {
  const onChangeAmount = (value: string) => {
    changeExpense({
      ...expense,
      amount: removeDollarChar(value),
    });
  };

  const onChangeDate = (value: string) => {
    changeExpense({ ...expense, date: value });
  };

  const onChangeTitle = (value: string) => {
    changeExpense({ ...expense, title: value });
  };

  return (
    <View style={[styles.container, style]}>
      <FloatingLabelInput
        style={styles.textInput}
        value={expense.title}
        onChangeText={onChangeTitle}
        placeholder="Title"
        returnKeyType="done"
        label="Title"
      />
      <FloatingLabelInput
        style={styles.textInput}
        value={showAmount(expense.amount)}
        onChangeText={onChangeAmount}
        placeholder="Amount"
        keyboardType="numeric"
        returnKeyType="done"
        label="Amount"
      />
      <FloatingLabelInput
        style={styles.textInput}
        value={expense.date ? `${expense.date}` : ''}
        onChangeText={onChangeDate}
        placeholder="Date"
        keyboardType="numeric"
        returnKeyType="done"
        label="Date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 32 },
  textInput: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR,
    color: BLACK_COLOR,
    paddingVertical: 8,
    marginVertical: 20,
  },
});

export default ExpenseInputs;
