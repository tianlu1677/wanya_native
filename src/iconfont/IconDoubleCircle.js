/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconDoubleCircle = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0a512 512 0 1 0 512 512A512.597333 512.597333 0 0 0 512 0z m0 853.333333a341.333333 341.333333 0 1 1 341.333333-341.333333 341.76 341.76 0 0 1-341.333333 341.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 512m-170.666667 0a170.666667 170.666667 0 1 0 341.333334 0 170.666667 170.666667 0 1 0-341.333334 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconDoubleCircle.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconDoubleCircle) : IconDoubleCircle;
