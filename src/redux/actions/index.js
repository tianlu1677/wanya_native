import {
  CURRENT_ACCOUNT_REQUEST,
  BASE_CURRENT_ACCOUNT_REQUEST,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_FOLLOW_REQUEST,
  ACCOUNT_UN_FOLLOW_REQUEST,
  ACCOUNT_EMPTY_SUCCESS,
  CHANGE_PROGRESS,
  ADMIN_SIGN_SUCCESS,
  CURRENT_ACCOUNT_SUCCESS,
  PREVIEW_IMAGES,
  BASE_CURRENT_ACCOUNT_SUCCESS,
  ARTICLE_DETAIL_SUCCESS,
  TOPIC_DELETE_SUCCESS,
  ShareView,
  TOPIC_DETAIL_SUCCESS,
  UPDATE_NODES,
  UPDATE_FOLLOW_NODES,
  CHANGE_UPLOAD_STATUS,
} from '../constants/index';
import {getCategoryList} from '@/api/category_api';
import {getCurrentAccount, getCurrentAccountBaseInfo} from '@/api/mine_api';
import {getNodeIndex, getFollowNodeIndex} from '@/api/node_api';
// import {uploadVideoFile} from '@/utils/upload_files';
import {createTopic} from '@/api/topic_api';
import Helper from '@/utils/helper';

// 当前用户
export const dispatchCurrentAccount = () => async dispatch => {
  const res = await getCurrentAccount();
  dispatch({type: CURRENT_ACCOUNT_SUCCESS, account: res.account});
};

export const dispatchBaseCurrentAccount = () => async dispatch => {
  const res = await getCurrentAccountBaseInfo();
  // console.log('dispatchBaseCurrentAccount', res);
  dispatch({
    type: BASE_CURRENT_ACCOUNT_SUCCESS,
    account: res.account,
  });
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
  // console.log('dispatchSetAuthToken', token);
  dispatchCurrentAccount();
  Helper.setData('auth_token', token);
  dispatch({type: ADMIN_SIGN_SUCCESS, auth_token: token});
};

// 预览图片
export const dispatchPreviewImage = (previewImageData = {}) => async dispatch => {
  dispatch({
    type: PREVIEW_IMAGES,
    previewImageData: previewImageData,
  });
};

// 预览分享
export const dispatchShareItem = (shareContent = {}) => async dispatch => {
  dispatch({
    type: ShareView,
    shareContent: shareContent,
  });
};

// 文章详情
export const dispatchArticleDetail = (article = {}) => async dispatch => {
  dispatch({
    type: ARTICLE_DETAIL_SUCCESS,
    article: article,
  });
};
// 帖子详情
export const dispatchTopicDetail = (topic = {}) => async dispatch => {
  // console.log('TOPIC_DELETE_SUCCESS', topic)
  dispatch({
    type: TOPIC_DETAIL_SUCCESS,
    topic: topic,
  });
};

// 更新全部圈子数据
export const dispathUpdateNodes = account_id => async dispatch => {
  if (account_id) {
    const followNodes = await getFollowNodeIndex({account_id});
    dispatch({type: UPDATE_FOLLOW_NODES, value: followNodes.data.nodes});
  }
  const nodes = await getNodeIndex();
  dispatch({type: UPDATE_NODES, value: nodes});
};

export const changeUploadStatus = value => {
  return {
    type: CHANGE_UPLOAD_STATUS,
    value,
  };
};

// 上传视频topic
export const dispatchFetchUploadTopic = (data, cb) => async dispatch => {
  const {video, content} = data.content;
  dispatch(changeUploadStatus({status: 'upload', progress: 0, ...data}));
  // const videoRes = await data.upload(video, progress => {
  //   if (progress === 100) {
  //     dispatch(changeUploadStatus({status: 'publish', progress: '发布中', ...data}));
  //   } else {
  //     dispatch(changeUploadStatus({status: 'upload', progress: progress, ...data}));
  //   }
  // });
  // const params = {...content, video_content: videoRes.asset.video_url};
  // await createTopic(params);
  // dispatch(changeUploadStatus({status: 'done', progress: '发布完成', ...data}));
  // 设置progress 为发布完成 done
  // cb();
  setTimeout(() => {
    dispatch(changeUploadStatus({status: 'upload', progress: 60, ...data}));
  }, 3000);

  setTimeout(() => {
    dispatch(changeUploadStatus({status: 'done', progress: '发布完成', ...data}));
  }, 5000);
};
