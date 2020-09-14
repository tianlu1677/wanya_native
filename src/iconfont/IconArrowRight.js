/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconArrowRight = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M623.030857 485.558857L233.691429 109.604571a36.571429 36.571429 0 0 1-0.914286-51.712l30.500571-31.597714A36.571429 36.571429 0 0 1 314.989714 25.417143L788.48 482.706286a36.571429 36.571429 0 0 1 0.877714 51.712L332.105143 1007.908571a36.571429 36.571429 0 0 1-51.712 0.877715l-31.561143-30.464a36.571429 36.571429 0 0 1-0.877714-51.712L623.908571 537.234286a36.571429 36.571429 0 0 0-0.877714-51.712z"
        fill={getIconColor(color, 0, '#2c2c2c')}
      />
    </Svg>
  );
};

IconArrowRight.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconArrowRight) : IconArrowRight;
