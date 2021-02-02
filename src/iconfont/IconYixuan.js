/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYixuan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M766.532267 316.142933L472.746667 596.992c-14.267733 13.653333-35.84 15.633067-52.292267 4.7104l-129.024-85.7088a34.133333 34.133333 0 0 0-44.202667 5.461333 30.72 30.72 0 0 0 1.024 42.3936l181.794134 180.565334a21.026133 21.026133 0 0 0 30.378666-0.750934l350.037334-382.702933a32.187733 32.187733 0 0 0-0.750934-44.100267 30.6176 30.6176 0 0 0-43.178666-0.682666z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconYixuan.defaultProps = {
  size: 16,
};

IconYixuan = React.memo ? React.memo(IconYixuan) : IconYixuan;

export default IconYixuan;
