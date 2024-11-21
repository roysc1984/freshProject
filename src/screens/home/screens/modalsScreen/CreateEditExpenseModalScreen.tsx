import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { BLACK_COLOR, BLUE_COLOR } from 'theme/themeStyles';
import { CloseXIcon } from 'components/icons/CloseXIcon';
import PressableOpacity from 'components/PressableOpacity';
import ActionButton from 'components/ActionButton';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  CreateEditExpenseModalScreenProps,
  RootStackParamList,
} from 'screens/types';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  addExpense,
  removeExpense,
  updateExpense,
} from 'store/slices/expenses/reducer';
import { getUuid } from 'common/utils';
import ExpenseInputs from './components/ExpenseInputs';
import { convertDate, convertMount, isValidAmount, setStrDate } from './utils';
import { ExpenseInput } from './types';

const EDIT_TEXT = 'Edit Expense';
const CREATE_TEXT = 'Create Expense';
const BUTTON_TEXT_SAVE = 'Save';
const BUTTON_TEXT_CREATE = 'Create';
const BUTTON_TEXT_REMOVE = 'Remove';

const CreateEditExpenseModalScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<CreateEditExpenseModalScreenProps['route']>();
  const dispatch = useDispatch();
  const paramExpense = route.params?.expense;

  const [expenseData, setExpenseData] = useState<ExpenseInput | undefined>(
    paramExpense ? setStrDate(paramExpense) : undefined,
  );

  const close = () => navigation.goBack();

  const onAddExpense = () => {
    if (expenseData && isValidAmount(expenseData?.amount)) {
      dispatch(
        addExpense({
          expense: {
            ...expenseData,
            id: getUuid().toString(),
            date: convertDate(expenseData.date),
            amount: convertMount(expenseData.amount),
          },
        }),
      );
      close();
    }
  };

  const onEditExpense = () => {
    if (expenseData && isValidAmount(expenseData?.amount)) {
      dispatch(
        updateExpense({
          expense: {
            ...expenseData,
            date: convertDate(expenseData.date),
            amount: convertMount(expenseData.amount),
          },
        }),
      );
      close();
    }
  };

  const onRemoveExpense = () => {
    // added remove label - remove expense from store ans close modal
    if (expenseData) {
      dispatch(removeExpense({ id: expenseData?.id }));
      close();
    }
  };

  const renderTopHeader = () => (
    <View style={styles.closeButton}>
      {paramExpense ? (
        <PressableOpacity onPress={onRemoveExpense}>
          <Text style={styles.remove}>{BUTTON_TEXT_REMOVE}</Text>
        </PressableOpacity>
      ) : (
        <View />
      )}
      <PressableOpacity onPress={close}>
        <CloseXIcon />
      </PressableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {renderTopHeader()}
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {paramExpense ? EDIT_TEXT : CREATE_TEXT}
          </Text>
          <ExpenseInputs expense={expenseData} changeExpense={setExpenseData} />
        </View>
        <ActionButton
          disabled={!isValidAmount(expenseData?.amount) || !expenseData?.title}
          style={styles.button}
          onPress={expenseData?.id ? onEditExpense : onAddExpense}
          text={paramExpense ? BUTTON_TEXT_SAVE : BUTTON_TEXT_CREATE}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 65,
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '400',
    fontSize: 18,
    paddingVertical: 8,
  },
  closeButton: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'center',
  },
  remove: {
    fontFamily: 'Helvetica',
    color: BLUE_COLOR,
    fontSize: 10,
    fontWeight: '400',
    padding: 5,
  },
});

export default CreateEditExpenseModalScreen;
