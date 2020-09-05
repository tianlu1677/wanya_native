/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'weixin' | 'search' | 'space-point' | 'upper' | 'down' | 'calendar' | 'people' | 'baomingcanjia' | 'double-circle' | 'white-circle' | 'fanhui2' | 'didian' | 'plus' | 'fanhui1' | 'fenxiang-2' | 'at' | 'hashtag' | 'question' | 'xianxingtubiao-px-pinglun-n' | 'man' | 'woman' | 'yaogunshoushi' | 'node-solid' | 'blank-node' | 'quanzi2' | 'comment' | 'unlike' | 'zhuanfa' | 'like' | 'takephoto' | 'chose-success' | 'sousuo' | 'shezhi' | 'kecheng3' | 'kecheng2' | 'tianjia' | 'biaoqian' | 'biaoqian1' | 'duigou' | 'tianjia1' | 'kecheng' | 'kecheng1' | 'fenxiang' | 'jiemian-2' | 'jiemian' | 'pinglunanniu' | 'jiemian-' | 'jiemian-1' | 'fanhui' | 'icon' | 'star' | 'arrow-right' | 'arrow-down' | 'black-dot' | 'cancel' | 'comments' | 'datetime' | 'praise-solid' | 'star-solid' | 'unread-messages';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
