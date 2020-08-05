/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconBaomingcanjia = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.176 0C228.416 0 0 228.416 0 510.176s228.416 510.144 510.176 510.176c281.76 0 510.176-228.416 510.176-510.176C1020.032 228.544 791.808 0.32 510.176 0z m0 931.296c-232.576 0-421.12-188.544-421.12-421.12 0-232.608 188.544-421.12 421.12-421.12s421.12 188.544 421.12 421.12c-0.256 232.48-188.64 420.864-421.12 421.12z"
        fill={getIconColor(color, 0, '#231815')}
      />
      <Path
        d="M727.936 327.648l-270.624 270.592-164.928-164.896a44.512 44.512 0 0 0-62.944 62.944l196.416 196.416a44.48 44.48 0 0 0 62.944 0l302.08-302.08a44.512 44.512 0 0 0-62.944-62.976z"
        fill={getIconColor(color, 1, '#231815')}
      />
    </Svg>
  );
};

IconBaomingcanjia.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconBaomingcanjia) : IconBaomingcanjia;
