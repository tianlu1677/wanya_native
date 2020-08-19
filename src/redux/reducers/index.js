// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import accountReducer from './account_reducer';
import {homeReducer} from './home_reducer';

// import counterReducer from './counterReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  home: homeReducer,
});
// Exports
export default rootReducer;
