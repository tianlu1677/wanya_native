/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconStar = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1151 1024" width={size} height={size} {...rest}>
      <Path
        d="M1056.069394 342.982943L763.905526 300.38821 633.321676 35.620955c-23.397106-47.194163-91.188723-47.794089-114.785804 0L387.952021 300.38821 95.788154 342.982943c-52.39352 7.59906-73.390924 72.191072-35.395623 109.186496l211.373859 205.974527-49.993817 290.964016c-8.998887 52.593496 46.394262 91.988624 92.788525 67.391666L575.928774 879.116638l261.367676 137.38301c46.394262 24.396983 101.787412-14.79817 92.788525-67.391666l-49.993818-290.964016 211.373859-205.974527c37.995301-36.995425 16.997898-101.587436-35.395622-109.186496zM777.103894 624.548121l47.394139 276.765772L575.928774 770.730042l-248.569259 130.583851 47.394139-276.765772-201.175121-195.975763 277.965624-40.395005 124.384617-251.968838 124.384617 251.968838 277.965623 40.395005-201.17512 195.975763z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconStar.defaultProps = {
  size: 16,
};

IconStar = React.memo ? React.memo(IconStar) : IconStar;

export default IconStar;
