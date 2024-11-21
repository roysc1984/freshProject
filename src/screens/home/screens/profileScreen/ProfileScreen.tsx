import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PressableOpacity from 'components/PressableOpacity';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route } from 'screens/route';
import {
  BLACK_COLOR,
  GRAY_SEPARATOR_COLOR,
  WHITE_COLOR,
} from 'theme/themeStyles';
import { RootStackParamList } from 'screens/types';
import { selectExpensesTotalItems } from 'store/slices/expenses/selectors';
import { clearAll } from 'store/actions/actions';

const SIGN_OUT_TEXT = 'Sign out';
const TOTAL_TEXT = 'Total Expenses Items';

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const expensesTotalItems = useSelector(
    selectExpensesTotalItems,
    shallowEqual,
  );
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(clearAll());
    navigation.replace(Route.Welcome);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{TOTAL_TEXT}</Text>
        <Text style={styles.totalText}>{expensesTotalItems}</Text>
      </View>
      <PressableOpacity onPress={signOut} style={styles.row}>
        <Text style={styles.title}>{SIGN_OUT_TEXT}</Text>
      </PressableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: WHITE_COLOR,
  },
  row: {
    paddingTop: 36,
    paddingBottom: 12,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: GRAY_SEPARATOR_COLOR,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '400',
  },
  totalText: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    color: BLACK_COLOR,
    fontWeight: '700',
  },
});

export default ProfileScreen;
