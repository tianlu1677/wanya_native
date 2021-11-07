import {
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_FOLLOW_REQUEST,
  ACCOUNT_UN_FOLLOW_REQUEST,
  ACCOUNT_EMPTY_SUCCESS,
  ADMIN_SIGN_SUCCESS,
  CURRENT_ACCOUNT_SUCCESS,
  PREVIEW_IMAGES,
  BASE_CURRENT_ACCOUNT_SUCCESS,
  ARTICLE_DETAIL_SUCCESS,
  ShareView,
  TOPIC_DETAIL_SUCCESS,
  UPDATE_CATEGORY_LIST,
  CHANGE_UPLOAD_STATUS,
  THEORY_VIDEO_STATE,
  THEORY_DETAIL,
  LOGOUT_SUCCESS,
  LOAD_ALL_CITY_SUCCESS,
  ACCOUNT_SAVE_TOKEN,
  UPDATE_SOCIAL_TOKEN,
  UPDATE_SOCIAL_ACCOUNT,
  UPDATE_TOTAL_LABEL_LIST,
} from '../constants/index';
import {getCategoryList} from '@/api/category_api';
import {getLabelList} from '@/api/settings_api';
import {getLoginBaseInfo, getCurrentAccount, getCurrentAccountBaseInfo} from '@/api/mine_api';
import {createTopic} from '@/api/topic_api';
import {getCities} from '@/api/space_api';
import Helper from '@/utils/helper';
import * as RootNavigation from '@/navigator/root-navigation';
import * as node from './node_action';

export const nodeAction = node;

// 未完成认证用户
export const dispatchUpdateSocialAccount = socialToken => async dispatch => {
  const res = await getLoginBaseInfo({token: socialToken});
  // console.log('主动获取AccountInfo res: ', res);
  dispatch({type: UPDATE_SOCIAL_TOKEN, socialToken: socialToken});
  dispatch({type: UPDATE_SOCIAL_ACCOUNT, socialAccount: res.account});

  const {had_phone, had_photo, had_gender, had_taglist, had_invited} = res.account;
  if (!had_phone) {
    RootNavigation.navigate('BindPhone');
  } else if (!had_photo) {
    RootNavigation.navigate('RegisterInfo');
  } else if (!had_gender) {
    RootNavigation.navigate('RegisterInfoGender');
  } else if (!had_taglist) {
    RootNavigation.navigate('RegisterInfoLabel');
  } else if (!had_invited) {
    RootNavigation.navigate('RegisterInfoInvite');
  } else {
    // 必须先设置token
    await dispatch(dispatchSetAuthToken(socialToken));
    RootNavigation.reset({index: 0, routes: [{name: 'Recommend'}]});
  }
};

// 当前用户
export const dispatchCurrentAccount = () => async dispatch => {
  const res = await getCurrentAccount();
  dispatch({type: CURRENT_ACCOUNT_SUCCESS, account: res.account});
};

// 退出登录
export const logoutCurrentAccount = () => async dispatch => {
  // console.log('xxxx', 'logoutCurrentAccount')
  dispatch({type: LOGOUT_SUCCESS, token: ''});
};

export const dispatchBaseCurrentAccount = () => async dispatch => {
  const res = await getCurrentAccountBaseInfo();
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

// 管理员登录
export const dispatchSetAuthToken = (token = '') => async dispatch => {
  await Helper.setData('auth_token', token);
  dispatchCurrentAccount();
  dispatch({type: ADMIN_SIGN_SUCCESS, auth_token: token});
  dispatch({type: ACCOUNT_SAVE_TOKEN, userToken: token});
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

export const dispatchTheoryDetail = (theory = {}) => async dispatch => {
  dispatch({
    type: THEORY_DETAIL,
    value: theory,
  });
};

// 帖子详情
export const dispatchTopicDetail = (topic = {}) => async dispatch => {
  dispatch({
    type: TOPIC_DETAIL_SUCCESS,
    topic: topic,
  });
};

// 获取categories的数据
export const dispatchFetchCategoryList = () => async dispatch => {
  const categories = await getCategoryList();
  dispatch({type: UPDATE_CATEGORY_LIST, categories: categories});
};

// 获取label的数据
export const dispatchFetchLabelList = () => async dispatch => {
  const res = await getLabelList();
  dispatch({type: UPDATE_TOTAL_LABEL_LIST, labelList: res.data.label_list});
};

export const changeUploadStatus = value => {
  return {
    type: CHANGE_UPLOAD_STATUS,
    value,
  };
};

// 上传视频topic
export const dispatchFetchUploadTopic = data => async dispatch => {
  const {video, content} = data.content;
  const videoRes = await data.upload(video, progress => {
    if (progress === 100) {
      dispatch(changeUploadStatus({...data, status: 'publish', progress}));
    } else {
      dispatch(changeUploadStatus({...data, status: 'upload', progress}));
    }
  });
  const params = {...content, video_content: videoRes.asset.video_url};
  await createTopic(params);
  // 设置progress 为发布成功 done
  dispatch(changeUploadStatus({...data, status: 'done', progress: '发布成功'}));
  setTimeout(() => {
    dispatch(changeUploadStatus(null));
  }, 1000);
};

export const updateTheoryVideo = (videoId, pause) => async dispatch => {
  await dispatch({
    type: THEORY_VIDEO_STATE,
    videoId: videoId,
    pause: pause,
  });
};

// 提前加载city
export const loadAllCityList = () => async dispatch => {
  const res = await getCities();
  await dispatch({
    type: LOAD_ALL_CITY_SUCCESS,
    value: res.data,
  });
};
