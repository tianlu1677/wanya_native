/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconUnreadMessages = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M592.479858 0H493.976747A413.240889 413.240889 0 0 0 81.958969 412.017778v141.624889s6.115556 243.569778 5.802667 329.073777c-0.284444 75.434667-16.668444 114.346667-68.238223 138.382223 0 0 110.620444 1.080889 231.793778 1.080889s227.84 1.820444 341.162667 1.820444a413.240889 413.240889 0 0 0 412.017778-412.017778v-199.964444A413.240889 413.240889 0 0 0 592.479858 0z"
        fill={getIconColor(color, 0, '#FF5E89')}
      />
    </Svg>
  );
};

IconUnreadMessages.defaultProps = {
  size: 16,
};

IconUnreadMessages = React.memo ? React.memo(IconUnreadMessages) : IconUnreadMessages;

export default IconUnreadMessages;
