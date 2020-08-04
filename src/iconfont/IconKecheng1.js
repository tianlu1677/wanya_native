/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconKecheng1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M66.121143 0m175.542857 0l526.628571 0q175.542857 0 175.542858 175.542857l0 672.914286q0 175.542857-175.542858 175.542857l-526.628571 0q-175.542857 0-175.542857-175.542857l0-672.914286q0-175.542857 175.542857-175.542857Z"
        fill={getIconColor(color, 0, '#C2C2C2')}
      />
      <Path
        d="M153.892571 87.771429m87.771429 0l526.628571 0q87.771429 0 87.771429 87.771428l0 672.914286q0 87.771429-87.771429 87.771428l-526.628571 0q-87.771429 0-87.771429-87.771428l0-672.914286q0-87.771429 87.771429-87.771428Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M241.664 234.057143m43.885714 0l438.857143 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885714l-438.857143 0q-43.885714 0-43.885714-43.885714l0 0q0-43.885714 43.885714-43.885714Z"
        fill={getIconColor(color, 2, '#C2C2C2')}
      />
      <Path
        d="M241.664 438.857143m43.885714 0l321.828572 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885714l-321.828572 0q-43.885714 0-43.885714-43.885714l0 0q0-43.885714 43.885714-43.885714Z"
        fill={getIconColor(color, 3, '#C2C2C2')}
      />
      <Path
        d="M241.664 643.657143m43.885714 0l234.057143 0q43.885714 0 43.885714 43.885714l0 0q0 43.885714-43.885714 43.885714l-234.057143 0q-43.885714 0-43.885714-43.885714l0 0q0-43.885714 43.885714-43.885714Z"
        fill={getIconColor(color, 4, '#C2C2C2')}
      />
    </Svg>
  );
};

IconKecheng1.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconKecheng1) : IconKecheng1;
