/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconIcon = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M795.648 923.648H228.352c-58.368 0-105.472-47.104-107.52-104.448L81.92 360.448c0-38.912 21.504-74.752 55.296-93.184L450.56 93.184c38.912-21.504 84.992-21.504 123.904 0L887.808 266.24c33.792 18.432 55.296 54.272 55.296 93.184v3.072l-39.936 454.656c-2.048 59.392-49.152 106.496-107.52 106.496zM163.84 359.424l39.936 457.728c0 13.312 11.264 24.576 25.6 24.576h567.296c14.336 0 25.6-11.264 25.6-24.576v-3.072l37.888-454.656c0-8.192-5.12-16.384-13.312-20.48l-312.32-174.08c-14.336-8.192-30.72-8.192-44.032 0l-313.344 174.08c-8.192 4.096-13.312 11.264-13.312 20.48z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M699.392 905.216h-81.92V611.328c0-11.264-6.144-17.408-8.192-17.408H413.696c-2.048 0-8.192 6.144-8.192 17.408v293.888h-81.92V611.328c0-55.296 39.936-99.328 90.112-99.328H609.28c49.152 0 90.112 45.056 90.112 99.328v293.888z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconIcon.defaultProps = {
  size: 16,
};

IconIcon = React.memo ? React.memo(IconIcon) : IconIcon;

export default IconIcon;
