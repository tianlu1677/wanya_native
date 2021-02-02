/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCheck = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#4DEE7C')}
      />
      <Path
        d="M751.0016 315.8016L465.8688 585.847467c-13.858133 13.141333-34.816 15.018667-50.7392 4.539733l-125.2352-82.432a33.3312 33.3312 0 0 0-42.9056 5.290667 29.320533 29.320533 0 0 0 0.9728 40.721066l176.469333 173.602134a20.514133 20.514133 0 0 0 29.474134-0.699734l339.746133-367.957333a30.72 30.72 0 0 0-0.733867-42.410667 29.9008 29.9008 0 0 0-41.915733-0.682666z"
        fill={getIconColor(color, 1, '#000000')}
      />
      <Path
        d="M751.0016 315.8016L465.8688 585.847467c-13.858133 13.141333-34.816 15.018667-50.7392 4.539733l-125.2352-82.432a33.3312 33.3312 0 0 0-42.9056 5.290667 29.320533 29.320533 0 0 0 0.9728 40.721066l176.469333 173.602134a20.514133 20.514133 0 0 0 29.474134-0.699734l339.746133-367.957333a30.72 30.72 0 0 0-0.733867-42.410667 29.9008 29.9008 0 0 0-41.915733-0.682666z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconCheck.defaultProps = {
  size: 16,
};

IconCheck = React.memo ? React.memo(IconCheck) : IconCheck;

export default IconCheck;
