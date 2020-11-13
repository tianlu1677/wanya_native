/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconComment = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M50.920838 1000.76959a89.286591 89.286591 0 0 1-24.759921-85.326081l4.553239-19.048165a540.353612 540.353612 0 0 0-9.672265-294.61342A431.991913 431.991913 0 0 1 0 468.390882C0 210.176432 229.49402 0 511.902604 0s511.902604 210.14949 511.902604 468.390882c0 258.21445-229.49402 468.687247-511.902604 468.687248a648.122581 648.122581 0 0 0-173.777463 22.173465l-206.727825 61.15889a82.173839 82.173839 0 0 1-80.476478-19.613952zM511.902604 113.750147c-219.552333 0-398.152457 159.255594-398.152457 354.640735-0.053884 33.300611 5.119026 66.412627 15.357078 98.123647a654.103759 654.103759 0 0 1 17.647169 330.446602l158.689807-46.906444a709.281471 709.281471 0 0 1 203.602525-26.753647c222.40821 1.427939 401.008334-158.689807 401.008335-354.910158S731.427994 113.750147 511.902604 113.750147z"
        fill={getIconColor(color, 0, '#BDBDBD')}
      />
    </Svg>
  );
};

IconComment.defaultProps = {
  size: 16,
};

IconComment = React.memo ? React.memo(IconComment) : IconComment;

export default IconComment;
