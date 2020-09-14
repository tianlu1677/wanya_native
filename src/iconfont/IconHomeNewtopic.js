/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconHomeNewtopic = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M947.004952 0H76.995048A77.092571 77.092571 0 0 0 0 76.995048v870.009904A77.06819 77.06819 0 0 0 76.995048 1024h870.009904A77.06819 77.06819 0 0 0 1024 947.004952V76.995048A77.092571 77.092571 0 0 0 947.004952 0z m-2.194285 944.835048H79.189333V79.164952h865.670096v865.670096z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M278.089143 551.936h193.950476v193.974857a39.960381 39.960381 0 0 0 79.896381 0v-193.974857h193.974857a39.960381 39.960381 0 1 0 0-79.896381h-193.974857v-193.950476a39.960381 39.960381 0 0 0-79.896381 0v193.950476h-193.950476a39.960381 39.960381 0 1 0 0 79.896381z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconHomeNewtopic.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconHomeNewtopic) : IconHomeNewtopic;
