const defaultState = {
  listData: [],
};

import {GET_LIST} from '../constants';

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return (state = {
        ...state,
        listData: action.value,
      });
    default:
      return state;
  }
};
