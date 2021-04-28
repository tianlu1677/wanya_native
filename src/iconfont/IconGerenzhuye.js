/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconGerenzhuye = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M941.752375 789.088041c9.413542-14.504249 17.917014-29.406654 25.794812-44.735655 1.87702-3.697162 3.583403-7.451203 5.375104-11.205244 6.029217-12.48503 11.54652-25.197578 16.495028-38.109204 1.990779-5.204466 3.981559-10.465811 5.858579-15.755596 4.152197-12.029995 7.764039-24.230628 11.091485-36.57346 1.535744-5.972338 3.185247-11.887796 4.550353-17.831695 2.84397-12.740988 5.062267-25.766372 6.939288-38.905516 0.796312-5.631061 1.96234-11.176804 2.588013-16.836305 2.076098-18.798645 3.355885-37.767928 3.355885-56.964728 0-282.264067-229.650614-511.914681-511.886241-511.914681S0 229.821252 0 512.085319c0 19.28212 1.308226 38.251403 3.384325 56.964728 0.654113 5.687941 1.734822 11.205244 2.559573 16.921624 1.990779 13.082264 4.123757 25.99389 6.939288 38.791757 1.365106 6.057657 3.071488 11.944676 4.635672 17.860135 4.692551 17.746376 10.295173 35.236794 16.807865 52.385935 4.976948 12.940066 10.55113 25.624174 16.495029 38.052325 1.848581 3.754041 3.526523 7.536522 5.403544 11.205244 8.048436 15.897795 16.978504 31.340554 26.733322 46.299839C174.449147 930.945287 332.460146 1023.97156 511.914681 1023.97156c179.511415 0 337.522413-93.083153 428.870744-233.319335l0.96695-1.592624v0.02844zM511.914681 245.43465a188.356163 188.356163 0 0 1 188.157085 188.185524A188.469922 188.469922 0 0 1 511.914681 621.976337a188.469922 188.469922 0 0 1-188.157085-188.356163A188.356163 188.356163 0 0 1 511.914681 245.43465zM200.727434 832.600789A340.138866 340.138866 0 0 1 511.914681 628.688108a340.480142 340.480142 0 0 1 311.215686 203.827362C650.131645 1001.532633 373.839916 1001.532633 200.784314 832.600789h-0.02844z"
        fill={getIconColor(color, 0, '#1F1F1F')}
      />
    </Svg>
  );
};

IconGerenzhuye.defaultProps = {
  size: 16,
};

IconGerenzhuye = React.memo ? React.memo(IconGerenzhuye) : IconGerenzhuye;

export default IconGerenzhuye;