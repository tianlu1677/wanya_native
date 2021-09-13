import * as constants from '../constants';

const defaultState = {
  createProduct: {},
};

function productReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.CREATE_PRODUCT:
      return {...state, createProduct: action.value};
    default:
      return state;
  }
}

export default productReducer;
