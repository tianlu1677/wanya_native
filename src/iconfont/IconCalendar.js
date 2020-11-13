/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconCalendar = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M880.256 118.528h-129.376c0.32-1.824 0.512-3.68 0.544-5.536V38.656C751.424 17.28 733.696 0 711.84 0c-21.888 0-39.616 17.28-39.616 38.656V112.96c0.032 1.856 0.224 3.712 0.576 5.536H351.2c0.32-1.824 0.512-3.68 0.576-5.536V38.656C351.776 17.28 334.016 0 312.16 0 290.24 0 272.544 17.28 272.544 38.656V112.96c0.064 1.856 0.256 3.712 0.576 5.536H143.744C90.88 118.592 48.064 160.384 48 211.968V930.56c0.064 51.584 42.88 93.376 95.744 93.44h736.512c52.864-0.064 95.68-41.856 95.744-93.44V211.968c-0.064-51.584-42.88-93.376-95.744-93.44zM143.744 195.84h736.512c9.12 0 16.512 7.2 16.512 16.128v104.704H127.232V211.968c0-8.928 7.392-16.128 16.512-16.128z m736.512 750.848H143.744a16.384 16.384 0 0 1-16.512-16.128V393.984h769.536V930.56a16.384 16.384 0 0 1-16.512 16.128z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M617.056 690.08h-107.136v-107.136a38.944 38.944 0 1 0-77.92 0v146.112c0 21.504 17.44 38.944 38.944 38.944h146.112a38.944 38.944 0 0 0 0-77.92z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconCalendar.defaultProps = {
  size: 16,
};

IconCalendar = React.memo ? React.memo(IconCalendar) : IconCalendar;

export default IconCalendar;
