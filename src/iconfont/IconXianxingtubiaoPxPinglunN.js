/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconXianxingtubiaoPxPinglunN = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M50.909867 1000.96a89.309867 89.309867 0 0 1-24.746667-85.333333l4.5568-19.063467a540.450133 540.450133 0 0 0-9.6768-294.673067A432.0768 432.0768 0 0 1 0 468.48C0 210.210133 229.546667 0 512 0s512 210.210133 512 468.48-229.546667 468.770133-512 468.770133a648.2432 648.2432 0 0 0-173.789867 22.186667L131.413333 1020.586667a82.210133 82.210133 0 0 1-80.503466-19.626667z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconXianxingtubiaoPxPinglunN.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconXianxingtubiaoPxPinglunN) : IconXianxingtubiaoPxPinglunN;
