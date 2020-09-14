import * as constants from '../constants';

const defaultState = {
  savetopic: {},
  previewImageData: {
    images: [],
    index: 0,
    visible: false,
  },
  commentTopic: {},
  uploadProgress: '',
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
