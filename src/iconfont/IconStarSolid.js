/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconStarSolid = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1067 1024" width={size} height={size} {...rest}>
      <Path
        d="M262.396711 1023.974145a95.123184 95.123184 0 0 1-93.507275-111.093752l42.013637-245.079552a14.166137 14.166137 0 0 0-4.066704-12.550227l-178.100118-173.548641a94.961593 94.961593 0 0 1 52.624774-161.967958l246.10296-35.765456a14.193069 14.193069 0 0 0 10.691932-7.729432l110.043412-223.022392a94.934661 94.934661 0 0 1 170.289891 0l110.043411 222.99546a14.193069 14.193069 0 0 0 10.665001 7.756364l246.129892 35.765456a94.934661 94.934661 0 0 1 52.597842 161.967958l-178.073186 173.575573a14.193069 14.193069 0 0 0-4.093636 12.577159l42.067501 245.025688a94.961593 94.961593 0 0 1-137.783186 100.10557l-220.113755-115.726025a14.246932 14.246932 0 0 0-13.196591 0l-220.059892 115.726025a95.069321 95.069321 0 0 1-44.27591 11.015114z"
        fill={getIconColor(color, 0, '#F7EC00')}
      />
    </Svg>
  );
};

IconStarSolid.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconStarSolid) : IconStarSolid;
