/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconSpacePoint = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.997328 0C269.72882 0.271672 73.414633 197.233691 73.142962 440.275419a437.140745 437.140745 0 0 0 88.690377 265.402402c96.338982 135.31343 315.348209 302.64233 324.605947 309.705796a42.21361 42.21361 0 0 0 51.116084 0c9.278635-7.063466 228.266964-174.392366 324.605947-309.705796l0.66873-0.982198A437.140745 437.140745 0 0 0 950.851694 440.275419C950.580023 197.233691 754.244938 0.271672 511.997328 0z m281.995277 655.314058a41.83745 41.83745 0 0 0-2.027089 2.925696C720.871109 757.023782 571.744215 880.174676 511.997328 927.738131c-59.746887-47.542556-208.790189-170.609859-279.94729-269.498377a40.416397 40.416397 0 0 0-2.047987-2.925696 352.838911 352.838911 0 0 1-72.264686-215.038639c0-196.272391 158.614507-355.388446 354.259963-355.388446 195.645456 0 354.259963 159.116055 354.259963 355.388446a352.838911 352.838911 0 0 1-72.264686 215.038639z"
        fill={getIconColor(color, 0, '#231815')}
      />
      <Path
        d="M501.548415 250.773924a177.631529 177.631529 0 1 0 177.631529 177.631529 177.840508 177.840508 0 0 0-177.631529-177.631529z m0 271.295589a93.66406 93.66406 0 1 1 0-187.328121 93.66406 93.66406 0 0 1 0 187.328121z"
        fill={getIconColor(color, 1, '#231815')}
      />
    </Svg>
  );
};

IconSpacePoint.defaultProps = {
  size: 16,
};

IconSpacePoint = React.memo ? React.memo(IconSpacePoint) : IconSpacePoint;

export default IconSpacePoint;
