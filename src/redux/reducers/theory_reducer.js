import * as constants from '../constants';
import {THEORY_VIDEO_LIST, THEORY_VIDEO_STATE} from '../constants';

const defaultVideoList = {
  video_1: true,
  video_2: true,
  video_3: true,
  video_4: true,
  video_5: true,
  video_6: true,
  video_7: true,
}

const defaultState = {
  theory: {},
  theoryDetail: null,
  videoList: defaultVideoList
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
      // console.log('action', action)
      const newVideoState = {...defaultVideoList, [action.videoId]: action.pause}
      // console.log('action2', newVideoState)
      return (state = {
        ...state,
        videoList: newVideoState
      });
    default:
      return state;
  }
}

export default theoryReducer;
