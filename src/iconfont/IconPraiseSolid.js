/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPraiseSolid = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1136 1024" width={size} height={size} {...rest}>
      <Path
        d="M1122.738013 265.290596C1093.089483 142.05796 997.091179 7.893616 816.650172 0.922278a308.474914 308.474914 0 0 0-247.740185 108.232053 309.831205 309.831205 0 0 0-247.767312-108.232053C140.701669 7.893616 44.703364 142.05796 15.000583 265.290596c-26.800318 111.053139-35.534834 282.325616 196.526622 487.09849 220.668609 194.736318 332.074384 261.004715 336.712901 263.744424a40.715868 40.715868 0 0 0 41.258384 0c4.638517-2.712583 116.071417-69.008106 336.740027-263.744424 232.007205-204.745748 223.272689-376.045351 196.526622-487.09849z"
        fill={getIconColor(color, 0, '#FF5E89')}
      />
    </Svg>
  );
};

IconPraiseSolid.defaultProps = {
  size: 16,
};

IconPraiseSolid = React.memo ? React.memo(IconPraiseSolid) : IconPraiseSolid;

export default IconPraiseSolid;
