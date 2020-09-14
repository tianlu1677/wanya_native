/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconBlackDot = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 512A512 512 0 1 0 512 0 512 512 0 0 0 0 512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBlackDot.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconBlackDot) : IconBlackDot;
