import {
  CURRENT_ACCOUNT_REQUEST,
  BASE_CURRENT_ACCOUNT_REQUEST,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_FOLLOW_REQUEST,
  ACCOUNT_UN_FOLLOW_REQUEST,
  ACCOUNT_EMPTY_SUCCESS,
  CHANGE_PROGRESS,
  GET_LIST,
  ADMIN_SIGN_SUCCESS,
} from '../constants/index';
import {getCategoryList} from '@/api/category_api';

// 当前用户
export const dispathCurrentAccount = () => {
  return {
    type: CURRENT_ACCOUNT_REQUEST,
  };
};

export const dispathBaseCurrentAccount = () => {
  return {
    type: BASE_CURRENT_ACCOUNT_REQUEST,
  };
};

export const dispathAccountDetail = account_id => {
  return {
    type: ACCOUNT_DETAIL_REQUEST,
    account_id: account_id,
  };
};

export const dispathEmptyAccountDetail = (account_id = '') => {
  return {
    type: ACCOUNT_EMPTY_SUCCESS,
    account_id: account_id,
  };
};

export const dispathFollowAccount = account_id => {
  return {
    type: ACCOUNT_FOLLOW_REQUEST,
    account_id: account_id,
  };
};
export const dispathUnFollowAccount = account_id => {
  return {
    type: ACCOUNT_UN_FOLLOW_REQUEST,
    account_id: account_id,
  };
};

export const dispathEmptyCurrentAccount = account_id => {
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

export const dispathGetList = res => async dispatch => {
  console.log(res); // 传参数
  const list = await getCategoryList();
  dispatch({type: GET_LIST, value: list});
};

// 管理员登录
export const dispathAdminLogin = (auth_token) => async (dispath) => {
  dispath({
    type: ADMIN_SIGN_SUCCESS,
    auth_token: auth_token
  })
}