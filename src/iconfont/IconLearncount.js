/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconLearncount = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1056 1024" width={size} height={size} {...rest}>
      <Path
        d="M544.231166 1024c-282.683179 0-511.867905-229.184727-511.867905-511.867905 0-282.683179 229.184727-511.867905 511.867905-511.867905 282.683179 0 511.867905 229.184727 511.867905 511.867905-0.330237 282.551084-229.316821 511.537668-511.867905 511.867905z m0-990.712074c-264.4871 0-478.844169 214.390093-478.844169 478.844169s214.357069 478.844169 478.844169 478.844169c264.454076 0 478.844169-214.390093 478.844169-478.844169-0.330237-264.355005-214.522188-478.546956-478.844169-478.844169z"
        fill={getIconColor(color, 0, '#9E9E9E')}
      />
      <Path
        d="M705.9484 455.397317v38.406605a1335.578947 1335.578947 0 0 1-132.623323 73.841073v30.579979h228.656347v40.817338H573.292054v101.448916c0 32.396285-17.403509 48.610939-51.021672 48.610939h-76.251806l-10.171311-39.628483c21.597523 0.627451 45.572755 1.221878 71.430341 1.221878 14.398349 0 22.19195-8.421053 22.19195-25.230134v-86.423116h-243.054695v-40.817338h243.054695v-49.799793c50.394221-22.19195 88.239422-40.189886 114.592364-54.621259h-261.614036V455.397317h323.467493z m91.211559 42.039216h-42.600619v-93.027864H332.648091v93.027864H290.608875v-134.439629h343.909185a717.936017 717.936017 0 0 0 68.359133-125.424149l43.855521 16.181631a649.576883 649.576883 0 0 1-65.420021 109.242518h115.814242v134.406605zM437.696594 340.804954l-37.21775 18.592363A771.731682 771.731682 0 0 0 336.842105 265.775026l39.034056-19.219814a854.423117 854.423117 0 0 1 61.820433 94.249742z m140.416925-6.604748l-38.439628 19.153767a693.696594 693.696594 0 0 0-57.593396-99.00516l39.034056-19.18679c20.970072 31.834881 39.95872 64.891641 56.998968 99.00516z"
        fill={getIconColor(color, 1, '#9E9E9E')}
      />
    </Svg>
  );
};

IconLearncount.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconLearncount) : IconLearncount;
