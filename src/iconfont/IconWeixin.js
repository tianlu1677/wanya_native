/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconWeixin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1170 1024" width={size} height={size} {...rest}>
      <Path
        d="M331.428571 263.428571q0-23.428571-14.285714-37.714285t-37.714286-14.285715q-24.571429 0-43.428571 14.571429T217.142857 263.428571q0 22.285714 18.857143 36.857143t43.428571 14.571429q23.428571 0 37.714286-14t14.285714-37.428572z m424.571429 289.714286q0-16-14.571429-28.571428t-37.428571-12.571429q-15.428571 0-28.285714 12.857143T662.857143 553.142857q0 16 12.857143 28.857143t28.285714 12.857143q22.857143 0 37.428571-12.571429t14.571429-29.142857zM621.142857 263.428571q0-23.428571-14-37.714285T569.714286 211.428571q-24.571429 0-43.428572 14.571429T507.428571 263.428571q0 22.285714 18.857143 36.857143t43.428572 14.571429q23.428571 0 37.428571-14T621.142857 263.428571z m362.857143 289.714286q0-16-14.857143-28.571428t-37.142857-12.571429q-15.428571 0-28.285714 12.857143T890.857143 553.142857q0 16 12.857143 28.857143t28.285714 12.857143q22.285714 0 37.142857-12.571429t14.857143-29.142857z m-152-226.857143q-17.714286-2.285714-40-2.285714-96.571429 0-177.714286 44T486.571429 487.142857 440 651.428571q0 44.571429 13.142857 86.857143-20 1.714286-38.857143 1.714286-14.857143 0-28.571428-0.857143t-31.428572-3.714286-25.428571-4-31.142857-6-28.571429-6L124.571429 792l41.142857-124.571429q-165.714286-116-165.714286-280 0-96.571429 55.714286-177.714285t150.857143-127.714286T414.285714 35.428571q100.571429 0 190 37.714286t149.714286 104.285714T832 326.285714z m338.285714 320.571429q0 66.857143-39.142857 127.714286T1025.142857 885.142857l31.428572 103.428572-113.714286-62.285715q-85.714286 21.142857-124.571429 21.142857-96.571429 0-177.714285-40.285714T512.857143 797.714286 466.285714 646.857143t46.571429-150.857143T640.571429 386.571429t177.714285-40.285715q92 0 173.142857 40.285715t130 109.714285T1170.285714 646.857143z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWeixin.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconWeixin) : IconWeixin;
