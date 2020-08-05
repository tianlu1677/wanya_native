/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'weixin' | 'sousuo1' | 'changdiweizhi' | 'yishaixuan' | 'weishaixuan' | 'shijian' | 'huodongrenshu' | 'baomingcanjia' | 'yixuan1-01' | 'weixuan' | 'fanhui2' | 'didian' | 'jiahao' | 'fanhui1' | 'fenxiang-2' | 'at' | 'huati' | 'wenhao' | 'xianxingtubiao-px-pinglun-n' | 'icon1' | 'qiuliao-' | 'yaogunshoushi' | 'quanzi' | 'quanzi1' | 'quanzi2' | 'pinglun' | 'weixihuan' | 'zhuanfa' | 'xihuan' | 'canyuzhaoxiang' | 'duigou1' | 'sousuo' | 'shezhi' | 'kecheng3' | 'kecheng2' | 'tianjia' | 'biaoqian' | 'biaoqian1' | 'duigou' | 'tianjia1' | 'kecheng' | 'kecheng1' | 'fenxiang2' | 'jiemian-2' | 'jiemian-3' | 'pinglunanniu' | 'fenxiang' | 'jiemian-' | 'jiemian-1' | 'fanhui' | 'icon' | 'star' | 'arrow-right' | 'arrow-down' | 'black-dot' | 'cancel' | 'comments' | 'datetime' | 'praise-solid' | 'star-solid' | 'unread-messages';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
