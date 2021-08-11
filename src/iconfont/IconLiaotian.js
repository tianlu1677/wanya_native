/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLiaotian = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.904725 1024a511.99399 511.99399 0 1 1 362.180096-874.018262A511.99399 511.99399 0 0 1 511.904725 1024z m0-936.103098a424.287193 424.287193 0 1 0 300.072999 123.991588 423.396769 423.396769 0 0 0-300.072999-123.991588z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M311.692815 471.936916m40.069094 0l320.552759 0q40.069095 0 40.069095 40.069094l0 0q0 40.069095-40.069095 40.069095l-320.552759 0q-40.069095 0-40.069094-40.069095l0 0q0-40.069095 40.069094-40.069094Z"
        fill={getIconColor(color, 1, '#FF2242')}
      />
      <Path
        d="M552.107384 351.729631v320.552759a40.069095 40.069095 0 0 1-80.13819 0V351.729631a40.069095 40.069095 0 1 1 80.13819 0z"
        fill={getIconColor(color, 2, '#FF2242')}
      />
    </Svg>
  );
};

IconLiaotian.defaultProps = {
  size: 16,
};

IconLiaotian = React.memo ? React.memo(IconLiaotian) : IconLiaotian;

export default IconLiaotian;
