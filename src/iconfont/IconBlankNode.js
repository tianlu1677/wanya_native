/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBlankNode = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M873.320296 208.782222l85.636741-85.63042a41.08642 41.08642 0 1 0-58.096197-58.108839L815.217778 150.679704A471.653136 471.653136 0 0 0 150.679704 815.217778L65.042963 900.854519a41.08642 41.08642 0 0 0 58.102518 58.102518l85.636741-85.63042A471.653136 471.653136 0 0 0 873.320296 208.782222zM512 901.802667A389.802667 389.802667 0 1 1 901.802667 512 390.257778 390.257778 0 0 1 512 901.802667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBlankNode.defaultProps = {
  size: 16,
};

IconBlankNode = React.memo ? React.memo(IconBlankNode) : IconBlankNode;

export default IconBlankNode;
