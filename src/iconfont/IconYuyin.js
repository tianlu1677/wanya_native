/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconYuyin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M475.325774 244.869565h-104.759652C344.16473 244.869565 322.772035 269.801739 322.772035 300.521739s21.392696 55.652174 47.794087 55.652174h104.759652C501.727165 356.173913 523.119861 331.241739 523.119861 300.521739s-21.392696-55.652174-47.794087-55.652174z"
        fill={getIconColor(color, 0, '#FF2242')}
      />
      <Path
        d="M500.769948 690.086957c-122.835478-0.200348-222.341565-98.882783-222.430609-220.605218v-242.643478a220.16 220.16 0 0 1 109.412174-196.229565 224.345043 224.345043 0 0 1 226.214957 0 220.16 220.16 0 0 1 109.412173 196.207304v242.643478c-0.089043 121.811478-99.706435 220.538435-222.608695 220.627479z m0-596.48c-74.173217 0.111304-134.233043 59.725913-134.233044 133.209043v242.643478a132.941913 132.941913 0 0 0 65.714087 119.385044 135.457391 135.457391 0 0 0 137.216 0 132.941913 132.941913 0 0 0 65.714087-119.385044v-242.643478c-0.089043-73.527652-60.215652-133.12-134.41113-133.209043z"
        fill={getIconColor(color, 1, '#FF2242')}
      />
      <Path
        d="M509.963687 1024a44.321391 44.321391 0 0 1-44.143304-44.521739v-120.921044C257.236035 835.027478 99.6736 656.896 100.163339 445.217391v-89.043478c0-24.598261 19.767652-44.521739 44.143304-44.521739 24.375652 0 44.143304 19.923478 44.143305 44.521739v89.043478c-0.400696 179.622957 143.426783 325.654261 321.513739 326.433392 24.375652 0 44.143304 19.923478 44.143304 44.521739V979.478261c0 24.598261-19.767652 44.521739-44.143304 44.521739z m133.12-187.703652a44.254609 44.254609 0 0 1-43.119304-36.463305 44.588522 44.588522 0 0 1 27.40313-49.552695C752.406817 701.484522 834.994643 580.429913 835.528904 445.217391v-87.618782c0-24.598261 19.767652-44.521739 44.143305-44.521739 24.375652 0 44.143304 19.923478 44.143304 44.521739V445.217391c-0.645565 172.076522-105.73913 326.121739-264.837565 388.229566-5.075478 1.936696-10.462609 2.893913-15.894261 2.849391z"
        fill={getIconColor(color, 2, '#000000')}
      />
    </Svg>
  );
};

IconYuyin.defaultProps = {
  size: 16,
};

IconYuyin = React.memo ? React.memo(IconYuyin) : IconYuyin;

export default IconYuyin;
