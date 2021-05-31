import {
  ACCOUNT_DETAIL_SUCCESS,
  LOGIN_FAILED,
  BASE_CURRENT_ACCOUNT_SUCCESS,
  CURRENT_ACCOUNT_SUCCESS,
  ACCOUNT_FOLLOW_SUCCESS,
  ACCOUNT_UN_FOLLOW_SUCCESS,
  ACCOUNT_EMPTY_SUCCESS,
  ACCOUNT_SAVE_TOKEN,
} from '../constants/';

const defaultState = {
  currentAccount: {},
  account: {},
  currentBaseInfo: {},
  userToken: '',
};

function accountReducer(state = defaultState, action) {
  switch (action.type) {
    case CURRENT_ACCOUNT_SUCCESS:
      return (state = {
        ...state,
        currentAccount: action.account,
      });
    case LOGIN_FAILED:
      return state;
    case ACCOUNT_DETAIL_SUCCESS:
      return (state = {
        ...state,
        account: action.account,
      });
    case BASE_CURRENT_ACCOUNT_SUCCESS:
      return (state = {
        ...state,
        currentBaseInfo: action.account,
      });
    case ACCOUNT_FOLLOW_SUCCESS:
      return (state = {
        ...state,
        account: {...state.account, followed: true},
      });
    case ACCOUNT_UN_FOLLOW_SUCCESS:
      return (state = {
        ...state,
        account: {...state.account, followed: false},
      });
    case ACCOUNT_EMPTY_SUCCESS:
      if (action.account_id) {
        return (state = {
          ...state,
          account: {},
        });
      } else {
        return (state = {
          ...state,
          currentAccount: {},
          currentBaseInfo: {},
        });
      }
    case ACCOUNT_SAVE_TOKEN:
      return (state = {
        ...state,
        userToken: action.value,
      });
    default:
      return state;
  }
}

export default accountReducer;
