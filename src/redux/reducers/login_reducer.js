const defaultState = {
  auth_token: '',
};
import {ADMIN_SIGN_SUCCESS} from '../constants';

export const loginReducer = (state = defaultState, action) => {
  console.log('action', action)
  switch (action.type) {
    case ADMIN_SIGN_SUCCESS:
      return {
        ...state,
        auth_token: action.auth_token,
      };
    default:
      return state;
  }
};
