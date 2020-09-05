/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconFenxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M901.12 471.04c-16.87552 0-45.056 11.79648-45.056 28.672v372.736c0 50.62656-23.10144 61.44-73.728 61.44H155.648c-10.52672 0-30.55616-6.51264-40.96-16.384-13.623296-12.918784-20.48-31.277056-20.48-45.056V245.76c0-12.86144 6.291456-34.021376 20.48-49.152 14.188544-15.130624 29.507584-16.384 40.96-16.384H528.384c16.87552 0 32.768-28.18048 32.768-45.056s-17.301504-42.663936-34.16064-42.663936H157.61408C73.3184 92.618752 5.005312 160.923648 4.898816 245.22752v625.795072C4.95616 913.784832 16.71168 963.510272 45.056 991.232c27.52512 26.927104 71.02464 32.456704 112.55808 32.514048h625.795072c47.898624-0.049152 97.902592-10.289152 125.902848-44.802048 21.291008-26.238976 36.831232-70.08256 36.864-106.496V499.712c0-16.859136-28.196864-28.655616-45.056-28.672z"
        fill={getIconColor(color, 0, '#ABABAC')}
      />
      <Path
        d="M826.671104 16.769024C814.088192 5.578752 768.98304 3.825664 757.76 16.384c-11.22304 12.558336-12.53376 46.096384 0 57.344l102.4 86.016c-99.172352 2.842624-150.77376 17.473536-237.568 65.536-66.3552 37.863424-145.89952 103.30112-192.512 163.84-59.457536 79.028224-92.73344 170.835968-118.784 266.24-3.432448 11.8784 2.637824 33.243136 12.288 40.96 9.650176 7.716864 34.709504 7.266304 45.539328 1.31072a30.375936 30.375936 0 0 0 14.5408-18.292736C490.651648 310.206464 720.65024 247.955456 880.64 241.664L778.24 335.872c-8.118272 7.29088-3.989504 24.961024-1.736704 35.643392a30.55616 30.55616 0 0 0 20.414464 22.7328c10.379264 3.383296 34.643968 6.258688 42.76224-1.032192l167.936-167.936c6.479872-5.783552 11.14112-14.893056 11.124736-23.576576a30.408704 30.408704 0 0 0-10.256384-22.708224L826.671104 16.769024z"
        fill={getIconColor(color, 1, '#ABABAC')}
      />
    </Svg>
  );
};

IconFenxiang.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconFenxiang) : IconFenxiang;
