/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconFenxiang2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1054 1024" width={size} height={size} {...rest}>
      <Path
        d="M527.179294 460.8c39.936-1.385412 73.456941 29.455059 74.842353 68.879059L612.954353 843.294118 919.130353 135.589647 214.919529 471.702588l312.259765-10.902588z m-20.781176 96.075294l-402.612706 14.034824a72.161882 72.161882 0 0 1-72.794353-54.211765 71.228235 71.228235 0 0 1 38.851765-81.498353L935.092706 22.166588a73.095529 73.095529 0 0 1 81.468235 12.589177c21.835294 20.570353 28.431059 52.344471 16.564706 79.721411L659.184941 979.034353a72.673882 72.673882 0 0 1-79.872 42.255059 71.68 71.68 0 0 1-59.030588-67.764706l-13.854118-396.649412z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconFenxiang2.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconFenxiang2) : IconFenxiang2;
