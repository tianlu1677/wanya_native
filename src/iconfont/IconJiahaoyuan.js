/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconJiahaoyuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#2C2C2C')}
      />
      <Path
        d="M566.0672 256m0 51.2l0 409.6q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-409.6q0-51.2 51.2-51.2l0 0q51.2 0 51.2 51.2Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M719.6672 563.2l-409.6 0a51.2 51.2 0 1 1 0-102.4L719.6672 460.8a51.2 51.2 0 1 1 0 102.4z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconJiahaoyuan.defaultProps = {
  size: 16,
};

IconJiahaoyuan = React.memo ? React.memo(IconJiahaoyuan) : IconJiahaoyuan;

export default IconJiahaoyuan;
