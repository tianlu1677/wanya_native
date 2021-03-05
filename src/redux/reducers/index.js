// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import accountReducer from './account_reducer';
import {homeReducer} from './home_reducer';
import {loginReducer} from './login_reducer';
import articleReducer from './article_reducer';
import topicReducer from './topic_reducer';
import nodeReducer from './node_reducer';
import theoryReducer from './theory_reducer';

// import counterReducer from './counterReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  account: accountReducer,
  home: homeReducer,
  login: loginReducer,
  article: articleReducer,
  topic: topicReducer,
  node: nodeReducer,
  theory: theoryReducer,
});
// Exports
export default rootReducer;
