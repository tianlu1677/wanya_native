/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconDianhua = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1003.2 923.68c42.08-72.96 18.752-128.96-55.744-185.056-87.552-65.92-173.152-110.24-234.688-39.232 0 0-65.312 77.472-257.504-103.808-223.488-212.288-129.696-287.584-129.696-287.584 77.76-77.888 28.32-136-36.864-223.936-65.184-88-131.008-115.84-225.536-40.16-182.176 145.792 74.688 488.192 204.544 621.312 0 0 197.472 203.584 321.76 271.36l66.464 37.024c95.36 48.768 202.464 71.072 277.856 25.792 0 0 36.352-18.624 69.408-75.712z"
        fill={getIconColor(color, 0, '#656565')}
      />
    </Svg>
  );
};

IconDianhua.defaultProps = {
  size: 16,
};

IconDianhua = React.memo ? React.memo(IconDianhua) : IconDianhua;

export default IconDianhua;
