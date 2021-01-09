import * as constants from '../constants';

const defaultState = {
  nodes: [],
  homeNodes: [],
  followNodes: [],
  checkNodes: [],
  createNode: {},
};

function nodeReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.UPDATE_NODES:
      return {
        ...state,
        nodes: action.value,
      };
    case constants.UPDATE_HOME_NODES:
      return {
        ...state,
        homeNodes: action.value,
      };
    case constants.UPDATE_FOLLOW_NODES:
      return {
        ...state,
        followNodes: action.value,
      };
    case constants.UPDATE_CHECK_NODES:
      return {
        ...state,
        checkNodes: action.value,
      };
    case constants.CREATE_NODE:
      return {
        ...state,
        createNode: action.value,
      };
    default:
      return state;
  }
}

export default nodeReducer;
