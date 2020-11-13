/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSearch = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M1007.583959 928.338581l-204.601807-204.139355a448.082581 448.082581 0 0 0 93.61342-274.894452 448.082581 448.082581 0 0 0-131.204129-317.704258 447.983484 447.983484 0 0 0-142.501162-96.388129A447.719226 447.719226 0 0 0 448.314797 0c-60.515097 0-119.246452 11.924645-174.575483 35.443613a446.133677 446.133677 0 0 0-142.501162 96.388129A448.082581 448.082581 0 0 0 0.000991 449.536a448.082581 448.082581 0 0 0 131.237161 317.704258 447.983484 447.983484 0 0 0 142.501162 96.388129 443.722323 443.722323 0 0 0 174.575483 35.344516c60.482065 0 119.246452-11.924645 174.575484-35.344516a448.710194 448.710194 0 0 0 101.309936-59.656258l204.271484 203.776a56.386065 56.386065 0 0 0 79.244387 0 56.386065 56.386065 0 0 0-0.132129-79.409548z m-559.269162-121.26142c-196.541935 0-356.550194-160.404645-356.550193-357.640258S251.640733 91.796645 448.314797 91.796645c196.541935 0 356.517161 160.404645 356.517162 357.640258 0 197.202581-159.975226 357.640258-356.517162 357.640258z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconSearch.defaultProps = {
  size: 16,
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;
