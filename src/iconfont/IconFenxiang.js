/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconFenxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M885.396645 456.737032a29.828129 29.828129 0 0 0-29.828129 29.828129v361.042581a89.517419 89.517419 0 0 1-89.517419 89.517419h-611.096774a89.517419 89.517419 0 0 1-89.51742-89.517419V236.510968a89.517419 89.517419 0 0 1 89.51742-89.51742H515.633548a29.828129 29.828129 0 0 0 0-59.656258H154.92129A149.338839 149.338839 0 0 0 5.780645 236.477935V847.607742a149.338839 149.338839 0 0 0 149.140645 149.140645h611.129807a149.272774 149.272774 0 0 0 149.140645-149.140645V486.565161a29.828129 29.828129 0 0 0-29.795097-29.828129z"
        fill={getIconColor(color, 0, '#ABABAC')}
      />
      <Path
        d="M985.847742 171.800774L808.299355 13.378065a29.828129 29.828129 0 0 0-39.737807 44.494451l119.774968 106.859355c-96.850581 2.77471-191.653161 28.738065-276.413935 75.676903a563.2 563.2 0 0 0-167.143226 145.573161 763.243355 763.243355 0 0 0-126.38142 257.849807 29.861161 29.861161 0 0 0 43.074065 34.452645 29.662968 29.662968 0 0 0 14.203871-17.870452c104.481032-360.481032 355.757419-429.881806 512-436.025806l-119.114323 107.057548a29.828129 29.828129 0 1 0 39.869936 44.395355l177.515355-159.644903a29.696 29.696 0 0 0-0.099097-44.395355z"
        fill={getIconColor(color, 1, '#ABABAC')}
      />
    </Svg>
  );
};

IconFenxiang.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconFenxiang) : IconFenxiang;