import * as constants from '../constants';

const defaultVideoList = {
  video_1: true,
  video_2: true,
  video_3: true,
  video_4: true,
  video_5: true,
  video_6: true,
  video_7: true,
};

const defaultState = {
  theory: {},
  theoryDetail: null,
  videoList: defaultVideoList,
};

function theoryReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.UPDATE_THEORY:
      return (state = {
        ...state,
        theory: action.value,
      });
    case constants.THEORY_DETAIL:
      return (state = {
        ...state,
        theoryDetail: action.value,
      });
    case constants.THEORY_VIDEO_STATE:
      const newVideoState = {...defaultVideoList, [action.videoId]: action.pause};
      return (state = {
        ...state,
        videoList: newVideoState,
      });
    default:
      return state;
  }
}

export default theoryReducer;
