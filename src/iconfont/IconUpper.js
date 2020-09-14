/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconUpper = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1592 1024" width={size} height={size} {...rest}>
      <Path
        d="M646.131484 51.655111L48.456818 665.258667A170.666667 170.666667 0 0 0 170.767929 955.050667h1245.411555a170.666667 170.666667 0 0 0 117.304889-294.684445L885.747484 46.876444a170.666667 170.666667 0 0 0-239.616 4.892445z"
        fill={getIconColor(color, 0, '#323232')}
      />
    </Svg>
  );
};

IconUpper.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconUpper) : IconUpper;
