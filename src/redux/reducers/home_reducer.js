import {SAVE_NEW_TOPIC} from '../constants';

const defaultState = {
  savetopic: {
    plan_content: '',
    mention: [],
  },
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_NEW_TOPIC:
      return {
        ...state,
        savetopic: action.value,
      };
    default:
      return state;
  }
};
