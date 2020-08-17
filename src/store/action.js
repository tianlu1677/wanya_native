import * as constants from './constants';

export const changeTitle = value => ({
  type: constants.CHANGE_TITLE,
  value,
});
