/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconBiaoqian1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M478.237257 246.228114a140.931657 140.931657 0 0 1-20.772571 197.807543 140.053943 140.053943 0 0 1-134.436572 23.639772 140.375771 140.375771 0 0 1-63.429485-44.470858l-0.029258-0.029257a140.288 140.288 0 0 1-30.427428-72.879543 140.0832 140.0832 0 0 1 51.258514-124.898742 140.814629 140.814629 0 0 1 197.8368 20.831085z m-172.383086 95.553829c1.345829 11.995429 6.114743 23.3472 13.780115 32.885028 7.489829 9.245257 17.349486 16.149943 28.496457 19.982629 21.035886 7.285029 43.593143 3.159771 60.708571-10.6496a63.546514 63.546514 0 0 0 9.362286-89.205029 63.253943 63.253943 0 0 0-42.656914-23.113142 63.312457 63.312457 0 0 0-69.690515 70.100114z"
        fill={getIconColor(color, 0, '#C2C2C2')}
      />
      <Path
        d="M30.954057 365.919086L77.824 107.139657A128.789943 128.789943 0 0 1 208.0768 1.872457l261.9392 8.630857a165.010286 165.010286 0 0 1 122.4704 60.942629L964.169143 530.432a164.805486 164.805486 0 0 1-24.312686 231.541029l-271.740343 220.013714a163.459657 163.459657 0 0 1-120.802743 35.810743c-43.710171-4.593371-100.059429-47.689143-127.736685-81.92L65.038629 498.834286a164.571429 164.571429 0 0 1-34.084572-132.9152z m94.090972 84.319085l371.565714 458.839772a87.478857 87.478857 0 0 0 122.909257 12.931657l271.740343-220.042971a87.478857 87.478857 0 0 0 12.9024-122.938515L532.48 120.042057a87.127771 87.127771 0 0 0-65.009371-32.329143l-261.909943-8.630857A51.141486 51.141486 0 0 0 153.775543 120.832l-46.811429 258.808686c-4.564114 25.044114 2.048 50.761143 18.080915 70.568228z"
        fill={getIconColor(color, 1, '#C2C2C2')}
      />
    </Svg>
  );
};

IconBiaoqian1.defaultProps = {
  size: 20,
};

export default React.memo ? React.memo(IconBiaoqian1) : IconBiaoqian1;