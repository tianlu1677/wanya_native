import {
  CURRENT_ACCOUNT_REQUEST,
  BASE_CURRENT_ACCOUNT_REQUEST,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_FOLLOW_REQUEST,
  ACCOUNT_UN_FOLLOW_REQUEST,
  ACCOUNT_EMPTY_SUCCESS,
  CHANGE_PROGRESS,
  SAVE_NEW_TOPIC,
  ADMIN_SIGN_SUCCESS,
  CURRENT_ACCOUNT_SUCCESS,
} from '../constants/index';
import {getCategoryList} from '@/api/category_api';
import {getCurrentAccount} from '../../api/mine_api';

// 当前用户
export const dispatchCurrentAccount = () => async dispatch => {
  const res = await getCurrentAccount();
  dispatch({type: CURRENT_ACCOUNT_SUCCESS, account: res.account});
};

export const dispatchBaseCurrentAccount = () => {
  return {
    type: BASE_CURRENT_ACCOUNT_REQUEST,
  };
};

export const dispatchAccountDetail = account_id => {
  return {
    type: ACCOUNT_DETAIL_REQUEST,
    account_id: account_id,
  };
};

export const dispatchEmptyAccountDetail = (account_id = '') => {
  return {
    type: ACCOUNT_EMPTY_SUCCESS,
    account_id: account_id,
  };
};

export const dispatchFollowAccount = account_id => {
  return {
    type: ACCOUNT_FOLLOW_REQUEST,
    account_id: account_id,
  };
};
export const dispatchUnFollowAccount = account_id => {
  return {
    type: ACCOUNT_UN_FOLLOW_REQUEST,
    account_id: account_id,
  };
};

export const dispatchEmptyCurrentAccount = account_id => {
  return {
    type: ACCOUNT_EMPTY_SUCCESS,
    account_id: account_id,
  };
};

export const changeProgress = value => {
  return {
    type: CHANGE_PROGRESS,
    value,
  };
};

// 管理员登录
export const dispatchSetAuthToken = (token = '') => async dispatch => {
  console.log('dispatchSetAuthToken', token);
  // return
  // return {
  //   type: ADMIN_SIGN_SUCCESS,
  //   auth_token: auth_token
  // }

  dispatch({type: ADMIN_SIGN_SUCCESS, auth_token: token});
};

// // new topic
// export const dispathSaveNewTopic = value => {
//   return {
//     type: SAVE_NEW_TOPIC,
//     value,
//   };
// };
