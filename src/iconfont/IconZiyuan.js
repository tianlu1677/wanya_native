/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZiyuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
        fill={getIconColor(color, 0, '#4D4D4D')}
      />
      <Path
        d="M512 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
        fill={getIconColor(color, 1, '#4D4D4D')}
      />
      <Path
        d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
        fill={getIconColor(color, 2, '#4D4D4D')}
      />
    </Svg>
  );
};

IconZiyuan.defaultProps = {
  size: 16,
};

IconZiyuan = React.memo ? React.memo(IconZiyuan) : IconZiyuan;

export default IconZiyuan;
