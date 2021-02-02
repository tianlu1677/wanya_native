/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQingchu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M0 0m512 0l0 0q512 0 512 512l0 0q0 512-512 512l0 0q-512 0-512-512l0 0q0-512 512-512Z"
        fill={getIconColor(color, 0, '#3F3F3F')}
      />
      <Path
        d="M376.285867 334.574933l313.856 316.484267a17.066667 17.066667 0 0 1 0 24.029867l-18.193067 18.363733a17.066667 17.066667 0 0 1-24.234667 0l-313.856-316.5184a17.066667 17.066667 0 0 1 0-24.029867l18.193067-18.3296a17.066667 17.066667 0 0 1 24.234667 0z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M690.176 376.9344l-313.890133 316.5184a17.066667 17.066667 0 0 1-24.234667 0l-18.193067-18.363733a17.066667 17.066667 0 0 1 0-24.029867l313.856-316.484267a17.066667 17.066667 0 0 1 24.234667 0l18.193067 18.3296a17.066667 17.066667 0 0 1 0 24.029867z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconQingchu.defaultProps = {
  size: 16,
};

IconQingchu = React.memo ? React.memo(IconQingchu) : IconQingchu;

export default IconQingchu;
