/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconWenhao = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512c0-282.784-229.216-512-512-512z m0 938.656c-235.648 0-426.656-191.04-426.656-426.656C85.344 276.352 276.384 85.344 512 85.344c235.648 0 426.656 191.04 426.656 426.656A426.656 426.656 0 0 1 512 938.656z m0-717.632a170.656 170.656 0 0 0-170.656 170.656 42.656 42.656 0 1 0 85.312 0A85.344 85.344 0 1 1 512 477.024c-23.552 0-42.656 19.104-42.656 42.656v111.36a42.656 42.656 0 1 0 85.312 0V556.8A170.656 170.656 0 0 0 512 221.024z m-42.656 542.272a42.656 42.656 0 1 0 85.312 0 42.656 42.656 0 0 0-85.312 0z"
        fill={getIconColor(color, 0, '#C2C2C2')}
      />
    </Svg>
  );
};

IconWenhao.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconWenhao) : IconWenhao;
