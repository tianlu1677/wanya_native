import * as constants from '../constants';

const defaultState = {
  auth_token: '',
  socialToken: '',
  socialAccount: {},
};

export const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.ADMIN_SIGN_SUCCESS:
      return {...state, auth_token: action.auth_token};
    case constants.LOGOUT_SUCCESS:
      return {...state, auth_token: ''};
    case constants.UPDATE_SOCIAL_TOKEN:
      return {...state, socialToken: action.socialToken};
    case constants.UPDATE_SOCIAL_ACCOUNT:
      return {...state, socialAccount: action.socialAccount};
    default:
      return state;
  }
};
