/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSanjiaoxing = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M936.172308 581.001846L156.16 1010.491077A78.769231 78.769231 0 0 1 39.384615 941.489231V82.510769A78.769231 78.769231 0 0 1 156.16 13.430154L936.172308 442.998154a78.769231 78.769231 0 0 1 0 138.003692z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconSanjiaoxing.defaultProps = {
  size: 16,
};

IconSanjiaoxing = React.memo ? React.memo(IconSanjiaoxing) : IconSanjiaoxing;

export default IconSanjiaoxing;
