import {
  ACCOUNT_DETAIL_SUCCESS,
  LOGIN_FAILED,
  BASE_CURRENT_ACCOUNT_SUCCESS,
  CURRENT_ACCOUNT_SUCCESS,
  ACCOUNT_FOLLOW_SUCCESS,
  ACCOUNT_UN_FOLLOW_SUCCESS,
  CHANGE_PROGRESS,
  ACCOUNT_EMPTY_SUCCESS,
} from '../constants/';

const defaultState = {
  currentAccount: {},
  account: {},
  currentBaseInfo: {},
  userToken: '',
  progress: 0,
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
    case CHANGE_PROGRESS:
      return (state = {
        ...state,
        progress: action.value,
      });
    default:
      return state;
  }
}

export default accountReducer;
