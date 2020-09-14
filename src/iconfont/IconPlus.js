/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconPlus = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 409.6m102.4 0l819.2 0q102.4 0 102.4 102.4l0 0q0 102.4-102.4 102.4l-819.2 0q-102.4 0-102.4-102.4l0 0q0-102.4 102.4-102.4Z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M614.4 0m0 102.4l0 819.2q0 102.4-102.4 102.4l0 0q-102.4 0-102.4-102.4l0-819.2q0-102.4 102.4-102.4l0 0q102.4 0 102.4 102.4Z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconPlus.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconPlus) : IconPlus;
