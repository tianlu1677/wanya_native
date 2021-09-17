import * as constants from '../constants';

const defaultState = {
  totalLabelList: [],
  channels: [],
  savetopic: {},
  previewImageData: {
    images: [],
    index: 0,
    visible: false,
  },
  shareContent: {
    visible: false,
    item_id: '',
    item_type: '',
  },
  commentVisible: false,
  commentContent: {},
  location: {chooseCity: ''},
  categoryList: [],
  shareStatus: true,
  shareNearbyStatus: true,
  cityList: [], // 城市数据,
  discoveryData: [],
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TOTAL_LABEL_LIST:
      return {...state, totalLabelList: action.value};
    case constants.SAVE_CHANNELS:
      return {
        ...state,
        channels: action.value,
      };
    case constants.SAVE_NEW_TOPIC:
      return {
        ...state,
        savetopic: action.value,
      };
    case constants.PREVIEW_IMAGES:
      const imageData = formatImagePreviewUrl(action.previewImageData, action.origin);
      return {
        ...state,
        previewImageData: imageData,
      };
    case constants.ShareView:
      return {
        ...state,
        shareContent: action.shareContent,
      };
    case constants.CHANGE_COMMENT_VISIBLE:
      return {...state, commentVisible: action.value};
    case constants.SAVE_COMMENT_CONTENT:
      return {
        ...state,
        commentContent: action.value,
      };
    case constants.GET_LOCATION:
      return {
        ...state,
        location: action.value,
      };
    case constants.UPDATE_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categories,
      };
    case constants.UPDATE_TOTAL_LABEL_LIST:
      return {
        ...state,
        totalLabelList: action.labelList,
      };
    case constants.CHANGE_SHARE_STATUS:
      return {
        ...state,
        shareStatus: action.value,
      };
    case constants.CHANGE_SHARE_NEARBY_STATUS:
      return {
        ...state,
        shareNearbyStatus: action.value,
      };
    case constants.LOAD_ALL_CITY_SUCCESS:
      return {
        ...state,
        cityList: action.value,
      };
    case constants.UPDATE_DISCOVER_DATA:
      return {...state, discoveryData: action.value};
    default:
      return state;
  }
};

const formatImagePreviewUrl = (previewImageData, origin = false) => {
  if (origin) {
    return previewImageData;
  }

  const images = previewImageData.images.map(data => {
    return {
      ...data,
      url: data.url && data.url.includes('?') ? data.url.split('?')[0] : data.url,
    };
  });
  return {
    ...previewImageData,
    images: images,
  };
};
