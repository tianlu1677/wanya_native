/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconDatetime = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0A512 512 0 1 0 1024 512 512.561548 512.561548 0 0 0 512 0z m0 990.967742A478.967742 478.967742 0 1 1 990.967742 512 479.52929 479.52929 0 0 1 512 990.967742z"
        fill={getIconColor(color, 0, '#9E9E9E')}
      />
      <Path
        d="M740.847484 502.916129H564.190968a65.701161 65.701161 0 0 0-31.215484-31.215484V202.091355a27.846194 27.846194 0 0 0-55.692387 0v269.60929a65.370839 65.370839 0 1 0 86.907871 86.907871h176.623484a27.846194 27.846194 0 0 0 0-55.692387z m-233.967484-1.717677l0.495484 0.990967 1.75071-0.528516a29.596903 29.596903 0 0 1 25.963354 29.10142 28.96929 28.96929 0 0 1-0.990967 4.888774l-1.156129 1.090064 0.660645 1.45342a29.530839 29.530839 0 0 1-28.407742 22.461935 29.894194 29.894194 0 1 1 0-59.788387c0.594581 0 1.090065 0.330323 1.651613 0.330323z"
        fill={getIconColor(color, 1, '#9E9E9E')}
      />
    </Svg>
  );
};

IconDatetime.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconDatetime) : IconDatetime;
