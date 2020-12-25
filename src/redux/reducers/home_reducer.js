import * as constants from '../constants';

const defaultState = {
  channels: [],
  savetopic: {},
  previewImageData: {
    images: [],
    index: 0,
    visible: false,
  },
  shareContent: {
    visible: false,
    title: '',
    desc: '',
    thumbImageUrl: '',
    path: '',
  },
  commentTopic: {
    content: '',
  },
  location: {},
  nodes: [],
  categoryList: [],
  followNodes: [],
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
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
    case constants.SAVE_COMMENT_TOPIC:
      return {
        ...state,
        commentTopic: action.value,
      };
    case constants.CHOOSE_CITY:
      return {
        ...state,
        chooseCity: action.value,
      };
    case constants.GET_LOCATION:
      return {
        ...state,
        location: action.value,
      };
    case constants.UPDATE_NODES:
      return {
        ...state,
        nodes: action.value,
      };
    case constants.UPDATE_FOLLOW_NODES:
      return {
        ...state,
        followNodes: action.value,
      };
    case constants.UPDATE_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categories
      }
    default:
      return state;
  }
};

const formatImagePreviewUrl = (previewImageData, origin = false) => {
  if (origin) {
    return previewImageData;
  }

  console.log('imageData', previewImageData);
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
