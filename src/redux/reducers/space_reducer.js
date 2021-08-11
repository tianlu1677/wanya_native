import * as constants from '../constants';

const defaultState = {
  spaceDetail: null,
};

function spaceReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.UPDATE_SPACE_DETAIL:
      return (state = {
        ...state,
        spaceDetail: action.value,
      });

    default:
      return state;
  }
}

export default spaceReducer;
