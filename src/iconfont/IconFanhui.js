/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconFanhui = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M748.8 160L390.4 512l358.4 352c19.2 19.2 19.2 57.6 0 76.8-19.2 19.2-57.6 19.2-76.8 0l-390.4-384s-6.4 0-6.4-6.4C262.4 544 256 524.8 256 512c0-12.8 6.4-32 19.2-38.4 0 0 6.4 0 6.4-6.4L672 76.8c19.2-19.2 57.6-19.2 76.8 0 25.6 25.6 25.6 57.6 0 83.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFanhui.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconFanhui) : IconFanhui;
