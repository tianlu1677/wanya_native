/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconWeixuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d=""
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWeixuan.defaultProps = {
  size: 16,
};

IconWeixuan = React.memo ? React.memo(IconWeixuan) : IconWeixuan;

export default IconWeixuan;
