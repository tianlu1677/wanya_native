// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import accountReducer from './account_reducer';
// import counterReducer from './counterReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
});
// Exports
export default rootReducer;