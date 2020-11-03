/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBackdown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1755 1024" width={size} height={size} {...rest}>
      <Path
        d="M989.184 606.646857L1524.882286 70.948571a95.085714 95.085714 0 0 1 134.582857 134.582858L989.037714 875.666286a146.285714 146.285714 0 0 1-206.848 0L112.201143 205.531429a95.085714 95.085714 0 1 1 134.582857-134.582858l535.405714 535.698286a146.285714 146.285714 0 0 0 206.994286 0z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconBackdown.defaultProps = {
  size: 16,
};

IconBackdown = React.memo ? React.memo(IconBackdown) : IconBackdown;

export default IconBackdown;
