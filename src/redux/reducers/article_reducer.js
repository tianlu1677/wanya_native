import {
  ARTICLE_DETAIL_SUCCESS,
  ARTICLE_PRAISE_SUCCESS,
  ARTICLE_STAR_SUCCESS,
  ARTICLE_UN_PRAISE_SUCCESS,
  ARTICLE_UN_STAR_SUCCESS,
} from '../constants';

const defaultState = {
  articleDetail: {account: {}, tag_list: []},
};

function articleReducer(state = defaultState, action) {
  switch (action.type) {
    case ARTICLE_DETAIL_SUCCESS:
      return (state = {
        ...state,
        articleDetail: action.article,
      });

    default:
      return state;
  }
}

export default articleReducer;
