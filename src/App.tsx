import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import CreateEditExpenseModalScreen from 'screens/home/screens/modalsScreen/CreateEditExpenseModalScreen';
import FilterExpensesModalScreen from 'screens/home/screens/modalsScreen/FilterExpensesModalScreen';
import { store, persistor } from 'store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import HomeStackScreens from 'screens/home/HomeStackScreens';
import { WHITE_COLOR } from 'theme/themeStyles';
import WelcomeScreen from 'screens/welcome/WelcomeScreen';
import { Route } from 'screens/route';
import { RootStackParamList } from 'screens/types';

export const navigationRef = createNavigationContainerRef();
const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider style={styles.appContainer}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar />
          <Stack.Navigator
            initialRouteName={Route.Welcome}
            detachInactiveScreens
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Stack.Group>
              <Stack.Screen name={Route.Welcome} component={WelcomeScreen} />
              <Stack.Screen
                name={Route.HomeTabs}
                component={HomeStackScreens}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'modal',
                cardStyle: {
                  backgroundColor: WHITE_COLOR,
                },
              }}
            >
              <Stack.Screen
                name={Route.ModalExpense}
                component={CreateEditExpenseModalScreen}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                animation: 'fade',
              }}
            >
              <Stack.Screen
                name={Route.ModalFilter}
                component={FilterExpensesModalScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: WHITE_COLOR,
  },
});

export default App;
