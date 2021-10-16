/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconManIcon = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M637.376 450.048l112.448-211.584 37.056 113.152c8.96 27.456 38.848 43.328 66.56 35.392a49.792 49.792 0 0 0 33.984-64L811.52 91.136a54.08 54.08 0 0 0-27.136-31.168 54.592 54.592 0 0 0-41.088-5.12L508.544 121.6a49.792 49.792 0 0 0-34.048 64c9.024 27.456 38.848 43.328 66.56 35.328l114.496-32.512-112.512 211.584c-145.024-49.408-305.984 7.744-377.536 142.272-79.744 149.952-17.856 338.816 138.176 421.76 156.032 82.944 347.2 28.672 426.88-121.28 71.552-134.528 28.928-299.968-93.184-392.64z m-285.568 423.424c-104-55.296-145.28-181.248-92.16-281.216 53.184-99.904 180.672-136.128 284.672-80.832 104 55.296 145.28 181.184 92.16 281.152-53.184 99.968-180.672 136.192-284.672 80.896z"
        fill={getIconColor(color, 0, '#25C6D8')}
      />
    </Svg>
  );
};

IconManIcon.defaultProps = {
  size: 16,
};

IconManIcon = React.memo ? React.memo(IconManIcon) : IconManIcon;

export default IconManIcon;
