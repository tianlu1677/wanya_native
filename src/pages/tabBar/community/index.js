import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import TabView from '@/components/TabView';
import IconFont from '@/iconfont';
import {RFValue} from '@/utils/response-fontsize';
import MineNodeListPage from '@/pages/tabBar/community/mine-node-list';
import NodeIndex from '@/pages/nodes/node-index';
import NearbyNodesListPage from '@/pages/tabBar/community/nearby-nodes';
import CurrentAvator from '@/pages/tabBar/current-avator';
import {Styles, BoothHeight} from '@/pages/tabBar/style';

const Community = props => {
  const {navigation} = props;
  const {home} = useSelector(state => state);
  const [currentKey, setCurrentKey] = useState('square');

  const openAddress = home.location.latitude && home.location.longitude ? true : false;
  console.log('openAddress', openAddress, home.location);

  const nodeTabTitle = openAddress ? home.location.positionCity : '本地';

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleCreateNode = () => {
    navigation.navigate('CreateNodeIntro');
  };

  const SquareListPage = () => <NodeIndex showAll={true} />;

  return (
    <View style={Styles.wrapper}>
      <View style={{height: BoothHeight}} />
      <View style={Styles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={Styles.createWrap} onPress={handleCreateNode}>
        <IconFont name="plus" color="#000" size={14} />
        <Text style={Styles.createText}>创建</Text>
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
            title: nodeTabTitle,
            component: NearbyNodesListPage,
          },
        ]}
      />
    </View>
  );
};

export default Community;
