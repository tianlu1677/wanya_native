/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconLike = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M529.829308 473.134713a119.466515 119.466515 0 0 1 87.438935-55.775304v-37.514123a63.236274 63.236274 0 0 0-65.492763-60.706823 63.236274 63.236274 0 0 0-65.492763 60.706823v182.293345h32.746382a108.156776 108.156776 0 0 1 10.800209-88.994819z m21.946172 186.433274a67.812943 67.812943 0 0 0 46.285313-17.806243l-24.684894-13.666314a120.603858 120.603858 0 0 1-23.829611-17.160232h-62.062537a64.64658 64.64658 0 0 0 64.291729 48.632789z m297.501648-131.931795V57.549559C849.268029 25.749447 817.122165 0 777.451639 0s-71.81639 25.758546-71.81639 57.549559V461.943257a150.866282 150.866282 0 0 1 24.821375 9.044152L849.268029 527.636192z m24.6394 67.085043L658.067013 473.143812a63.236274 63.236274 0 0 0-85.200643 22.24643 59.897035 59.897035 0 0 0 22.801453 82.962352L811.50824 699.930018l3.603103 1.910736a25.167127 25.167127 0 0 1 3.939756 13.666314 28.47907 28.47907 0 0 1-29.479932 27.341728 31.845606 31.845606 0 0 1-14.739966-3.657696l-16.286753-8.898572a13.238673 13.238673 0 0 1-3.266449-1.910736l-111.6052-61.507513a123.833912 123.833912 0 0 1-183.958416 0.482234 121.377251 121.377251 0 0 1-91.724443 40.680486c-65.14701 0-117.956123-48.951245-117.956123-109.339612V239.642732c0-33.537972-27.25074-56.939943-63.427348-56.939943S118.365885 206.10476 118.365885 239.642732l0.691505 444.082422c0 187.852679 164.232338 340.274846 367.052451 340.274846h52.463361c174.35924 0 332.013186-127.045769 357.799028-263.990972a527.317736 527.317736 0 0 0 8.580116-107.91111 59.687764 59.687764 0 0 0-31.035818-57.376683zM433.64648 380.009063a63.236274 63.236274 0 0 0-65.483664-60.715922 63.236274 63.236274 0 0 0-65.492762 60.715922V562.302409H433.819357V380.009063zM368.162816 659.567987a64.619283 64.619283 0 0 0 64.291729-48.632789H304.043964a64.446407 64.446407 0 0 0 64.118852 48.632789z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLike.defaultProps = {
  size: 16,
};

IconLike = React.memo ? React.memo(IconLike) : IconLike;

export default IconLike;
