import {createStore} from 'redux';
import {combineReducers} from 'redux';

import * as constants from './constants';

const defaultState = {
  title: 0,
};

const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_TITLE:
      return {
        ...state,
        title: action.value,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  home: homeReducer,
});

const reduxDevtools = window.devToolsExtension();
const store = createStore(reducer, reduxDevtools);

// const store = createStore(reducer, devToolsEnhancer());

export default store;
