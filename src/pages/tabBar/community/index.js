import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import TabView from '@/components/TabView';
import FastImg from '@/components/FastImg';
import IconFont from '@/iconfont';
import {BarHeight, IsIos} from '@/utils/navbar';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import MineNodeListPage from './node-list-page';
import NodeIndex from '@/pages/nodes/node-index';
import NearbyNodesListPage from './nearby-nodes';
import BrandImg from '@/assets/images/brand.png';

const Community = props => {
  const {navigation} = props;

  const [currentKey, setCurrentKey] = useState('mine');

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleCreateNode = () => {
    navigation.navigate('CreateNodeIntro');
  };

  const SquareListPage = () => <NodeIndex showAll={true} />;

  return (
    <View style={styles.wrapper}>
      <View style={{height: IsIos ? BarHeight : 0, backgroundColor: '#fff'}} />
      <View style={styles.avatorWrap}>
        <FastImg style={styles.avator} source={BrandImg} />
      </View>
      <Pressable style={styles.createWrap} onPress={handleCreateNode}>
        <IconFont name="plus" color="#000" size={14} />
        <Text style={styles.createText}>创建</Text>
      </Pressable>
      <TabView
        currentKey={currentKey}
        onChange={onChange}
        align="center"
        bottomLine={true}
        separator={false}
        tabStyle={{height: RFValue(33) + 10, paddingBottom: 10}}
        tabData={[
          {
            key: 'mine',
            title: '我的',
            component: MineNodeListPage,
          },
          {
            key: 'square',
            title: '广场',
            component: SquareListPage,
          },
          {
            key: 'city',
            title: '北京',
            component: NearbyNodesListPage,
          },
        ]}
      />
    </View>
  );
};

const positionStyle = {
  height: RFValue(33),
  position: 'absolute',
  top: IsIos ? BarHeight : 0,
  zIndex: 99,
  flexDirection: 'row',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  avatorWrap: {
    ...positionStyle,
    left: 14,
  },
  avator: {
    width: 30,
    height: 30,
  },
  createWrap: {
    ...positionStyle,
    right: 14,
  },
  createText: {
    fontSize: 14,
    color: '#2C2C2C',
    marginLeft: 5,
  },
});

export default Community;
