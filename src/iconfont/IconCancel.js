/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconCancel = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M980.69529 1023.986724a43.118268 43.118268 0 0 1-30.592614-12.698821L12.698821 73.884048A43.291434 43.291434 0 0 1 73.884048 12.698821l937.403855 937.403855a43.291434 43.291434 0 0 1-30.592613 73.884048z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M43.291434 1023.986724a43.291434 43.291434 0 0 1-30.592613-73.884048L950.102676 12.698821a43.291434 43.291434 0 0 1 61.185227 61.185227L73.884048 1011.287903a43.118268 43.118268 0 0 1-30.592614 12.698821z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconCancel.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconCancel) : IconCancel;
