/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconDuigou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1335 1024" width={size} height={size} {...rest}>
      <Path
        d="M1214.419478 20.658087L538.178783 668.761043a96.211478 96.211478 0 0 1-120.342261 10.907827l-296.96-197.854609a78.358261 78.358261 0 0 0-101.776696 12.644174c-25.377391 27.826087-24.353391 71.234783 2.315131 97.769739l418.504347 416.678956a48.350609 48.350609 0 0 0 69.899131-1.691826L1315.528348 124.082087A74.351304 74.351304 0 0 0 1313.792 22.26087a70.344348 70.344348 0 0 0-99.372522-1.647305z"
        fill={getIconColor(color, 0, '#00DCFF')}
      />
    </Svg>
  );
};

IconDuigou.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconDuigou) : IconDuigou;
