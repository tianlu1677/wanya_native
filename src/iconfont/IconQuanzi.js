/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconQuanzi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 40.018173a471.653136 471.653136 0 0 0-361.263407 775.269136L815.287309 150.730272A469.794765 469.794765 0 0 0 512 40.011852zM873.377185 208.845432L208.851753 873.370864A471.653136 471.653136 0 0 0 873.370864 208.845432z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M873.377185 208.845432l86.761877-86.761876a41.08642 41.08642 0 0 0-58.102519-58.096198L815.280988 150.736593a476.374914 476.374914 0 0 1 58.089876 58.108839zM150.736593 815.280988l-84.511605 84.511605a41.08642 41.08642 0 0 0 58.096197 58.108839l84.530568-84.524247a476.374914 476.374914 0 0 1-58.11516-58.089876z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconQuanzi.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconQuanzi) : IconQuanzi;
