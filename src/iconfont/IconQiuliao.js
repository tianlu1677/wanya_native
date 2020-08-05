/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconQiuliao = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M808.577148 819.679674C572.336157 749.434776 617.042365 621.741321 617.042365 621.741321c172.378065 31.931463 280.914802-38.302637 280.914802-38.302637-70.223301-51.077382-51.077382-44.68461-102.154764-331.992184S514.887601 2.441564 514.887601 2.441564 278.65741-42.243047 227.580028 251.4465c-51.077382 293.689547-31.920664 280.9256-102.154764 331.992184 0 0 114.929509 70.2341 280.9256 38.313435 0 0 44.695409 127.693455-191.545581 197.927555 0 0-191.534783 31.920664-178.760038 204.309527h951.302739c19.145919-178.781635-178.770837-204.309528-178.770836-204.309527z m0 0"
        fill={getIconColor(color, 0, '#FD7C97')}
      />
    </Svg>
  );
};

IconQiuliao.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconQiuliao) : IconQiuliao;
