/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconZhuanfa = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M957.375551 483.422585a55.231081 55.231081 0 0 0-55.231081 55.231081v341.28791a22.23302 22.23302 0 0 1-22.202894 22.202894h-735.878834a22.23302 22.23302 0 0 1-22.202894-22.192852V144.042658a22.23302 22.23302 0 0 1 22.192852-22.192852h341.28791a55.231081 55.231081 0 0 0 0-110.462161H144.062742a132.815686 132.815686 0 0 0-132.665055 132.655013v735.888876a132.815686 132.815686 0 0 0 132.655013 132.665055h735.878834a132.815686 132.815686 0 0 0 132.675097-132.655013V538.653666a55.231081 55.231081 0 0 0-55.23108-55.231081z"
        fill={getIconColor(color, 0, '#BCBCBC')}
      />
      <Path
        d="M1011.632556 56.466248l-0.080336-0.542268a54.648644 54.648644 0 0 0-2.851932-9.600166l-0.251051-0.702941a54.92982 54.92982 0 0 0-4.719747-8.96752c-0.130546-0.20084-0.230966-0.391639-0.361512-0.582436a55.542383 55.542383 0 0 0-15.434577-15.444619l-0.60252-0.361512a55.000114 55.000114 0 0 0-8.957478-4.719747c-0.230966-0.10042-0.471975-0.160672-0.712983-0.261093a54.77919 54.77919 0 0 0-9.580082-2.84189c-0.180756-0.030126-0.371555-0.040168-0.55231-0.080336a55.472089 55.472089 0 0 0-10.152477-0.974075H709.669175a55.231081 55.231081 0 0 0 0 110.462161h114.378547L356.170176 589.727352a55.231081 55.231081 0 1 0 78.096748 78.096748l467.877546-467.867504v114.378547a55.231081 55.231081 0 0 0 110.462161 0V66.618725a55.472089 55.472089 0 0 0-0.974075-10.152477z"
        fill={getIconColor(color, 1, '#BCBCBC')}
      />
    </Svg>
  );
};

IconZhuanfa.defaultProps = {
  size: 16,
};

export default React.memo ? React.memo(IconZhuanfa) : IconZhuanfa;
