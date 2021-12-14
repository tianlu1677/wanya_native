/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHuahangtangshu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C794.770286 0 1024 229.229714 1024 512S794.770286 1024 512 1024 0 794.770286 0 512 229.229714 0 512 0z m0 76.8c-240.347429 0-435.2 194.852571-435.2 435.2S271.652571 947.2 512 947.2s435.2-194.852571 435.2-435.2S752.347429 76.8 512 76.8z m25.365943 158.749257c15.9744 6.787657 28.642743 19.602286 35.167086 35.693714l44.8512 109.7728 116.033828 9.450058a65.799314 65.799314 0 0 1 59.977143 70.948571 66.121143 66.121143 0 0 1-22.410971 44.6464l-88.8832 77.531429 27.209142 116.092342a65.974857 65.974857 0 0 1-48.391314 79.286858c-16.969143 4.096-34.903771 1.2288-49.737143-7.9872l-99.181714-61.674058-99.181714 61.674058a65.184914 65.184914 0 0 1-90.404572-22.030629 66.384457 66.384457 0 0 1-7.694628-49.269029l27.209143-116.092342-88.912458-77.531429a66.296686 66.296686 0 0 1-7.080228-92.511086c11.205486-13.341257 27.267657-21.650286 44.6464-23.113143l116.033828-9.450057 44.8512-109.714285a65.3312 65.3312 0 0 1 85.898972-35.693715z m-25.365943 90.580114l-36.864 90.229029a65.536 65.536 0 0 1-55.237486 40.608914l-97.250743 7.928686 74.605715 65.038629c18.432 16.149943 26.477714 41.1648 20.860343 65.038628l-22.528 96.256 82.007771-50.9952a65.067886 65.067886 0 0 1 68.783543 0l82.066286 51.024457-22.557258-96.285257a66.238171 66.238171 0 0 1 20.860343-65.038628l74.605715-65.038629-97.250743-7.899429a65.536 65.536 0 0 1-55.237486-40.667428l-36.864-90.199772z"
        fill={getIconColor(color, 0, '#FF6A18')}
      />
    </Svg>
  );
};

IconHuahangtangshu.defaultProps = {
  size: 16,
};

IconHuahangtangshu = React.memo ? React.memo(IconHuahangtangshu) : IconHuahangtangshu;

export default IconHuahangtangshu;
