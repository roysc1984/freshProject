import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expensesReducer from './slices/expenses/reducer';
import userReducer from './slices/user/reducer';
import reactotron from '../../ReactotronConfig';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['expenses'],
};

const rootReducer = combineReducers({
  userName: userReducer,
  expenses: expensesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  // @ts-expect-error looks it works good.
  enhancers:
    __DEV__ && !process.env.JEST_WORKER_ID
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (getDefaultEnhancers) => [
          ...getDefaultEnhancers(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          reactotron.createEnhancer(),
        ]
      : [],
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
