// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
// Imports: Redux
import rootReducer from '../reducers/index';
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: [
  //   'account',
  // ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['counterReducer', 'home'],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    // createLogger(), // 使用时可以手动打开
    thunk
  )
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {store, persistor};
