/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconClosed = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#BDBDBD')}
      />
      <Path
        d="M394.3936 353.757867L683.639467 626.005333a8.533333 8.533333 0 0 1 0 12.424534l-25.258667 23.773866a8.533333 8.533333 0 0 1-11.707733 0L357.4272 389.973333a8.533333 8.533333 0 0 1 0-12.424533l25.258667-23.790933a8.533333 8.533333 0 0 1 11.707733 0z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M683.639467 389.973333L394.3936 662.186667a8.533333 8.533333 0 0 1-11.707733 0l-25.258667-23.7568a8.533333 8.533333 0 0 1 0-12.424534l289.245867-272.247466a8.533333 8.533333 0 0 1 11.707733 0l25.258667 23.790933a8.533333 8.533333 0 0 1 0 12.424533z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconClosed.defaultProps = {
  size: 16,
};

IconClosed = React.memo ? React.memo(IconClosed) : IconClosed;

export default IconClosed;
