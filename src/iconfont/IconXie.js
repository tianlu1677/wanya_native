/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconXie = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M973.263256 138.957773c55.237672-55.318507 67.821083-70.812001 25.193767-113.412371-42.60037-42.681206-58.201644-30.232521-113.493206 25.032096l-14.092343-14.011507a30.555863 30.555863 0 0 0-42.977603 0L59.847727 804.234902a30.717535 30.717535 0 0 0-6.736301 10.346959L2.373603 981.803808a29.909178 29.909178 0 0 0 6.46685 32.953986c5.631548 5.820164 13.391767 9.134425 21.502274 9.16137 3.745384 0 7.463822-0.754466 10.939753-2.155616L199.396948 975.633356c3.772329-1.535877 7.167425-3.772329 10.050561-6.628521l777.099733-773.758527a30.313356 30.313356 0 0 0 0.026945-42.950658l-13.310931-13.337877z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconXie.defaultProps = {
  size: 16,
};

IconXie = React.memo ? React.memo(IconXie) : IconXie;

export default IconXie;
