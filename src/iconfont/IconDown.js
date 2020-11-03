/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconDown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1593 1024" width={size} height={size} {...rest}>
      <Path
        d="M940.893298 903.395556l597.560889-613.603556A170.666667 170.666667 0 0 0 1416.256853 0H170.845298A170.666667 170.666667 0 0 0 53.426631 294.570667l647.850667 613.603555a170.666667 170.666667 0 0 0 239.616-4.778666z"
        fill={getIconColor(color, 0, '#7F7F81')}
      />
    </Svg>
  );
};

IconDown.defaultProps = {
  size: 16,
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;
