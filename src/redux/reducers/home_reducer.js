import * as constants from '../constants';

const defaultState = {
  savetopic: {
    plan_content: '',
    mention: [],
    node: '',
  },
  previewImageData: {
    images: [],
    index: 0,
    visible: false,
  },
  commentTopic: {},
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
    default:
      return state;
  }
};
