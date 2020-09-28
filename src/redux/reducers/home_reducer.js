import * as constants from '../constants';

const defaultState = {
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
  commentTopic: {},
  uploadProgress: 0,
  location: {},
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SAVE_NEW_TOPIC:
      return {
        ...state,
        savetopic: action.value,
      };
    case constants.PREVIEW_IMAGES:
      return {
        ...state,
        previewImageData: action.previewImageData,
      };
    case constants.ShareView:
      return {
        ...state,
        shareContent: action.shareContent
      }
    case constants.SAVE_COMMENT_TOPIC:
      return {
        ...state,
        commentTopic: action.value,
      };
    case constants.UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.value,
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
    default:
      return state;
  }
};
