/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1105 1024" width={size} height={size} {...rest}>
      <Path
        d="M909.362407 828.174739c-138.663177-32.639345-207.97315-110.152385-220.2075-126.472057-12.23435-16.319672-12.23435-36.713859-12.23435-61.193368a75.65411 75.65411 0 0 1 8.159836-28.554023l4.074514-8.159836c4.074514-8.159836 20.383379-48.959017 32.628537-73.438525a61.99314 61.99314 0 0 1 16.319673-24.479509 224.617054 224.617054 0 0 0 44.852079-44.873695c32.617729-48.959017 16.298057-93.832712-12.245158-114.237707v-8.149028a397.789313 397.789313 0 0 0 20.394187-163.196724C787.018903 106.067063 721.783444 0 554.58786 0S322.14601 101.992549 318.071496 175.420267a368.28421 368.28421 0 0 0 20.394186 159.111402v8.159836c-28.554023 24.479509-40.777566 69.353204-12.23435 118.312221a152.345763 152.345763 0 0 0 44.85208 44.873695 62.090409 62.090409 0 0 1 16.308864 24.479509c12.23435 24.479509 28.554023 61.193368 32.61773 73.438525l4.085322 8.159836a104.121671 104.121671 0 0 1 8.159836 28.554023c0 20.404994 0 44.884503-12.245158 61.193368-12.223543 16.319672-81.555131 93.832712-220.196693 126.472057C77.469809 856.73957 0 877.133756 0 1003.605813a21.831615 21.831615 0 0 0 20.394187 20.394187h1064.312833a21.831615 21.831615 0 0 0 20.394186-20.394187c4.074514-126.472057-69.320781-146.877052-195.738799-175.431074z m0 0"
        fill={getIconColor(color, 0, '#00CCFF')}
      />
    </Svg>
  );
};

IconMan.defaultProps = {
  size: 16,
};

IconMan = React.memo ? React.memo(IconMan) : IconMan;

export default IconMan;
