import * as action from '@/redux/constants/index';
import {getNodeIndex, getFollowNodeIndex, getCheckNodes} from '@/api/node_api';

// 全部圈子
export const dispatchUpdateNodes = () => async dispatch => {
  const res = await getNodeIndex();
  dispatch({type: action.UPDATE_NODES, value: res.data.nodes});
};
// 首页关注圈子
export const dispatchUpdateHomeNodes = account_id => async dispatch => {
  const res = await getFollowNodeIndex({account_id});
  dispatch({type: action.UPDATE_HOME_NODES, value: res.data.nodes});
};

// 关注圈子列表（只包含关注的）
export const dispatchUpdateFollowNodes = account_id => async dispatch => {
  const res = await getFollowNodeIndex({account_id, type: 'not_mine'});
  dispatch({type: action.UPDATE_FOLLOW_NODES, value: res.data.nodes});
};

// check_nodes 圈子列表
export const dispatchUpdateCheckNodes = () => async dispatch => {
  const res = await getCheckNodes();
  dispatch({type: action.UPDATE_CHECK_NODES, value: res.data.check_nodes});
};
