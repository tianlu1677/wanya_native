/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconClose = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1099 1024" width={size} height={size} {...rest}>
      <Path
        d="M152.272593 26.168889l910.98074 857.391407a18.962963 18.962963 0 0 1 0 27.610074L973.558519 995.555556a18.962963 18.962963 0 0 1-25.97926 0L36.598519 138.202074a18.962963 18.962963 0 0 1 0-27.610074L126.293333 26.168889a18.962963 18.962963 0 0 1 25.97926 0z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M1063.215407 138.202074L152.272593 995.555556a18.962963 18.962963 0 0 1-25.97926 0L36.636444 911.17037a18.962963 18.962963 0 0 1 0-27.610074L947.579259 26.206815a18.962963 18.962963 0 0 1 25.97926 0l89.656888 84.385185a18.962963 18.962963 0 0 1 0 27.610074z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconClose.defaultProps = {
  size: 16,
};

IconClose = React.memo ? React.memo(IconClose) : IconClose;

export default IconClose;
