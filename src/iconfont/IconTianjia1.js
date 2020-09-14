/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconTianjia1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 443.733333m51.2 0l921.6 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l-921.6 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z"
        fill={getIconColor(color, 0, '#3D3D3D')}
      />
      <Path
        d="M580.266667 0m0 51.2l0 921.6q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-921.6q0-51.2 51.2-51.2l0 0q51.2 0 51.2 51.2Z"
        fill={getIconColor(color, 1, '#3D3D3D')}
      />
    </Svg>
  );
};

IconTianjia1.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconTianjia1) : IconTianjia1;
