/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGuanbi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M328.9291 275.316888m42.559339 41.099076l340.474717 328.792613q42.55934 41.099077 1.460263 83.658416l0 0q-41.099077 42.55934-83.658416 1.460263l-340.474717-328.792612q-42.55934-41.099077-1.460263-83.658417l0 0q41.099077-42.55934 83.658416-1.460263Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M707.582367 394.233328l-328.792612 340.474718a59.164444 59.164444 0 0 1-85.11868-82.198154L622.463688 312.035175a59.164444 59.164444 0 0 1 85.118679 82.198153z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconGuanbi.defaultProps = {
  size: 16,
};

IconGuanbi = React.memo ? React.memo(IconGuanbi) : IconGuanbi;

export default IconGuanbi;
