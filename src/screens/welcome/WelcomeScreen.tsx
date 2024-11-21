import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'screens/types';
import ActionButton from 'components/ActionButton';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setUserName } from 'store/slices/user/reducer';
import { selectUserName } from 'store/slices/user/selectors';
import { Route } from '../route';
import {
  BLACK_COLOR,
  PURPLE_COLOR,
  WHITE_COLOR,
} from '../../theme/themeStyles';

const INPUT_PLACEHOLDER = 'Enter Name';
const BUTTON_TEXT = 'Login';

const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { name } = useSelector(selectUserName, shallowEqual);
  const [inputName, setInputName] = useState('');

  const navigateHome = useCallback(() => {
    navigation.replace(Route.HomeTabs);
  }, [navigation]);

  useEffect(() => {
    if (name) {
      navigateHome();
    }
  }, [navigateHome, name]);

  const onChangeName = (value: string) => {
    setInputName(value);
  };

  const onLogin = () => {
    dispatch(setUserName({ name: inputName }));
    navigateHome();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View />
        <TextInput
          style={styles.textInput}
          value={inputName}
          onChangeText={onChangeName}
          placeholder={INPUT_PLACEHOLDER}
        />
        <View style={styles.footer}>
          <ActionButton
            disabled={inputName.length === 0}
            onPress={onLogin}
            text={BUTTON_TEXT}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
  },
  textInput: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: '400',
    borderColor: PURPLE_COLOR,
    borderWidth: 1,
    width: 255,
    height: 55,
    paddingHorizontal: 10,
    borderRadius: 3,
    color: BLACK_COLOR,
  },
  button: {
    backgroundColor: PURPLE_COLOR,
    width: 148,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Helvetica',
    color: WHITE_COLOR,
    fontWeight: 'bold',
  },
  footer: {
    marginBottom: 30,
  },
});

export default WelcomeScreen;
