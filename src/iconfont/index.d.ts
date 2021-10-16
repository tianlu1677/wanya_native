/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'man-icon' | 'woman-icon' | 'zaixian' | 'jiahaoyuan' | 'guanbi' | 'fasong' | 'biaoqing' | 'yuyin' | 'liaotian' | 'tongzhi' | 'fankui' | 'zhuye' | 'shezhi' | 'shangchuan' | 'qingkong' | 'check' | 'closed' | 'weixuan' | 'yixuan' | 'lujing' | 'sanjiaoxing' | 'qingchu' | 'kejian' | 'yincang' | 'ziyuan' | 'gengduo' | 'weixin1' | 'shouji' | 'wuwangluo' | 'close' | 'home-recommend' | 'home-recommend-outline' | 'home-newtopic' | 'home-mine-outline' | 'home-mine' | 'notice' | 'weixin' | 'search' | 'space-point' | 'upper' | 'down' | 'calendar' | 'people' | 'join' | 'double-circle' | 'white-circle' | 'backdown' | 'didian' | 'plus' | 'arrow-right' | 'fenxiang-2' | 'at' | 'hashtag' | 'question' | 'man' | 'woman' | 'yaogunshoushi' | 'node-solid' | 'blank-node' | 'quanzi2' | 'comment' | 'unlike' | 'zhuanfa' | 'like' | 'takephoto' | 'chose-success' | 'sousuo' | 'settings' | 'kecheng3' | 'kecheng2' | 'tianjia' | 'biaoqian' | 'biaoqian1' | 'duigou' | 'tianjia1' | 'kecheng' | 'kecheng1' | 'fenxiang-copy' | 'fenxiang' | 'blackpraise' | 'learncount' | 'pinglunanniu' | 'coursegonewtopic' | 'blank-star' | 'arrow-left' | 'icon' | 'star' | 'arrow-down' | 'black-dot' | 'cancel' | 'comments' | 'datetime' | 'praise-solid' | 'star-solid' | 'unread-messages';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
