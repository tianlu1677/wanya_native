/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGengduo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M151.7 512m-84.1 0a84.1 84.1 0 1 0 168.2 0 84.1 84.1 0 1 0-168.2 0Z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M512 512m-84.1 0a84.1 84.1 0 1 0 168.2 0 84.1 84.1 0 1 0-168.2 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M872.3 512m-84.1 0a84.1 84.1 0 1 0 168.2 0 84.1 84.1 0 1 0-168.2 0Z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconGengduo.defaultProps = {
  size: 16,
};

IconGengduo = React.memo ? React.memo(IconGengduo) : IconGengduo;

export default IconGengduo;
