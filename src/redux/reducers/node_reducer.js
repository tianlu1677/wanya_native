import * as constants from '../constants';

const defaultState = {
  createNode: null,
};

function nodeReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.CREATE_NODE:
      return (state = {
        ...state,
        createNode: action.value,
      });
    default:
      return state;
  }
}

export default nodeReducer;
