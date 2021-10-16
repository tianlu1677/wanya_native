/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconZaixian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <Path
        d="M512 512m-372.363636 0a372.363636 372.363636 0 1 0 744.727272 0 372.363636 372.363636 0 1 0-744.727272 0Z"
        fill={getIconColor(color, 1, '#35EA6A')}
      />
    </Svg>
  );
};

IconZaixian.defaultProps = {
  size: 16,
};

IconZaixian = React.memo ? React.memo(IconZaixian) : IconZaixian;

export default IconZaixian;
