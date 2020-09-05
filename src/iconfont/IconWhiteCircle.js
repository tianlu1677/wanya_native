/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconWhiteCircle = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.248 0 0 229.205333 0 512c0 282.752 229.248 512 512 512s512-229.248 512-512C1023.658667 229.333333 794.624 0.298667 512 0z m0 853.333333a341.333333 341.333333 0 1 1 341.333333-341.333333 341.76 341.76 0 0 1-341.333333 341.333333z"
        fill={getIconColor(color, 0, '#D8D8D8')}
      />
    </Svg>
  );
};

IconWhiteCircle.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconWhiteCircle) : IconWhiteCircle;
