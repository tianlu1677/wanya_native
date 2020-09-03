import {SAVE_NEW_TOPIC, PREVIEW_IMAGES} from '../constants';

const defaultState = {
  savetopic: {
    plan_content: '',
    mention: [],
  },
  previewImageData: {
    images: [],
    index: 0,
    visible: false
  }
};

export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SAVE_NEW_TOPIC:
      return {
        ...state,
        savetopic: action.value,
      };
    case PREVIEW_IMAGES:
      return {
        ...state,
        previewImageData: action.previewImageData
      }
    default:
      return state;
  }
};
