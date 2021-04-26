const defaultState = {
  auth_token: '',
};
import {ADMIN_SIGN_SUCCESS, LOGOUT_SUCCESS} from '../constants';

export const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADMIN_SIGN_SUCCESS:
      return {
        ...state,
        auth_token: action.auth_token,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        auth_token: '',
      };
    default:
      return state;
  }
};
