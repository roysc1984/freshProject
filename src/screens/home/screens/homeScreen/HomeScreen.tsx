import React from 'react';
import { Platform, StyleSheet, Text, View, NativeModules } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import PressableOpacity from 'components/PressableOpacity';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK_COLOR, GRAY_COLOR, WHITE_COLOR } from 'theme/themeStyles';
import { Expense } from 'model/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'screens/types';
import { Route } from 'screens/route';
import {
  selectFilterExpenses,
  selectExpensesTotalAmount,
} from 'store/slices/expenses/selectors';
import { SlidersIcon } from 'components/icons/SlidersIcon';
import ExpensesList from './components/ExpensesList';

const { StatusBarManager } = NativeModules;
const TITLE = 'Total Expenses:';
const FILTER_BUTTON_TEXT = 'Filters';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const expenses = useSelector(selectFilterExpenses, shallowEqual);
  const expensesTotalAmount = useSelector(
    selectExpensesTotalAmount,
    shallowEqual,
  );

  const showModalEdit = (expense: Expense) => {
    navigation.navigate(Route.ModalExpense, {
      expense,
    });
  };

  const showModalFilters = () => {
    navigation.navigate(Route.ModalFilter);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.titleHeader}>{TITLE}</Text>
      <Text style={styles.sumHeader}>{`$${expensesTotalAmount.toFixed(
        2,
      )}`}</Text>
    </View>
  );

  const renderFiltersButton = () => (
    <PressableOpacity onPress={showModalFilters}>
      <View style={styles.filterButton}>
        <SlidersIcon />
        <Text style={styles.filterText}>{FILTER_BUTTON_TEXT}</Text>
      </View>
    </PressableOpacity>
  );

  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.container}>
      {renderHeader()}
      {renderFiltersButton()}
      <View style={styles.list}>
        <ExpensesList expenses={expenses} onEditPress={showModalEdit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingBottom: 21,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
  titleHeader: {
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '700',
    fontSize: 16,
  },
  sumHeader: {
    paddingHorizontal: 10,
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '400',
    fontSize: 18,
  },
  filterButton: {
    margin: 11,
    backgroundColor: GRAY_COLOR,
    width: 94,
    height: 28,
    borderRadius: 60,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  filterText: {
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '700',
    fontSize: 12,
  },
});

export default HomeScreen;
