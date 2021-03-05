import * as constants from '../constants';

const defaultState = {
  theory: {},
};

function theoryReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.UPDATE_THEORY:
      return (state = {
        ...state,
        theory: action.value,
      });

    default:
      return state;
  }
}

export default theoryReducer;
