import * as constants from '../constants';

const defaultState = {
  theory: {},
  theoryDetail: null,
};

function theoryReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.UPDATE_THEORY:
      return (state = {
        ...state,
        theory: action.value,
      });
    case constants.THEORY_DETAIL:
      return (state = {
        ...state,
        theoryDetail: action.value,
      });
    default:
      return state;
  }
}

export default theoryReducer;
