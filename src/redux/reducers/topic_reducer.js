import {
  TOPIC_DETAIL_SUCCESS,
  TOPIC_PRAISE_SUCCESS,
  TOPIC_STAR_SUCCESS,
  TOPIC_UN_PRAISE_SUCCESS,
  TOPIC_UN_STAR_SUCCESS,
  TOPIC_EMPTY,
} from '../constants';

const defaultState = {
  topicDetail: {tag_list: [], medias: [], account: {}},
};

function topicReducer(state = defaultState, action) {
  switch (action.type) {
    case TOPIC_DETAIL_SUCCESS:
      return (state = {
        ...state,
        topicDetail: action.topic,
      });
    case TOPIC_EMPTY:
      return (state = {
        ...state,
        topicDetail: {tag_list: [], medias: [], account: {}},
      });
    default:
      return state;
  }
}

export default topicReducer;
