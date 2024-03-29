/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconHomeMine = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1048 1024" width={size} height={size} {...rest}>
      <Path
        d="M721.420488 605.40878H327.580098C150.053463 605.159024 5.819317 748.793756 5.144976 926.595122l0.024975 43.482537c0 24.226341 19.555902 43.857171 43.732293 43.957073l903.168 3.621463h47.878244a43.957073 43.957073 0 0 0 43.907122-43.957073V926.595122c-0.674341-177.77639-144.908488-321.436098-322.435122-321.186342z m-241.089561-81.52039c14.685659 2.397659 29.546146 3.596488 44.456585 3.596488a262.144 262.144 0 0 0 199.68-92.684488 262.36878 262.36878 0 0 0 14.835512-319.188292A261.51961 261.51961 0 0 0 435.050146 19.306146a262.094049 262.094049 0 0 0-171.082926 269.71161 261.944195 261.944195 0 0 0 216.388682 234.845659h-0.024975z"
        fill={getIconColor(color, 0, '#000000')}
      />
    </Svg>
  );
};

IconHomeMine.defaultProps = {
  size: 16,
};

IconHomeMine = React.memo ? React.memo(IconHomeMine) : IconHomeMine;

export default IconHomeMine;
