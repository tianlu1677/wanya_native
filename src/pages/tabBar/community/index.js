import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {createConsumer} from '@rails/actioncable';
import {useSelector, useDispatch} from 'react-redux';
import TabView from '@/components/TabView';
import IconFont from '@/iconfont';
import {
  dispatchFetchCategoryList,
  dispatchFetchLabelList,
  dispatchBaseCurrentAccount,
  dispatchCurrentAccount,
} from '@/redux/actions';
import {RFValue} from '@/utils/response-fontsize';
import deviceInfo from '@/utils/device_info';
import {consumerWsUrl} from '@/utils/config';
import MineNodeListPage from '@/pages/tabBar/community/mine-node-list';
import NodeIndex from '@/pages/nodes/node-index';
import NearbyNodesListPage from '@/pages/tabBar/community/nearby-nodes';
import CurrentAvator from '@/pages/tabBar/current-avator';
import DownLoadModal from '@/pages/tabBar/download-modal';
import {syncDeviceToken} from '@/api/app_device_api';
import {recordDeviceInfo} from '@/api/settings_api';
import {Cstyles, BoothHeight} from '@/pages/tabBar/style';

const Community = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {
    home: {location},
    login: {auth_token},
  } = useSelector(state => state);

  const [currentKey, setCurrentKey] = useState('square');

  const openAddress = location.latitude && location.longitude ? true : false;
  const nodeTabTitle = openAddress ? location.positionCity : '本地';

  const onChange = key => {
    setCurrentKey(key);
  };

  const handleCreateNode = () => {
    navigation.navigate('CreateNodeIntro');
  };

  const SquareListPage = () => <NodeIndex showAll={true} />;

  const onlineChannel = useMemo(() => {
    return createConsumer(consumerWsUrl(auth_token)).subscriptions.create({
      channel: 'OnlineChannel',
    });
  }, []);

  const init = () => {
    syncDeviceToken();
    console.log('deviceInfo', deviceInfo);
    recordDeviceInfo(deviceInfo);
    dispatch(dispatchCurrentAccount());
    dispatch(dispatchFetchCategoryList());
    dispatch(dispatchFetchLabelList());
    dispatch(dispatchFetchCategoryList());

    // 同步用户是否在线
    setInterval(() => {
      onlineChannel.perform('appear');
    }, 5000);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(dispatchBaseCurrentAccount());
    }, [])
  );

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={Cstyles.wrapper}>
      <View style={{height: BoothHeight, backgroundColor: 'white'}} />
      <View style={Cstyles.avatorWrap}>
        <CurrentAvator />
      </View>
      <Pressable style={Cstyles.createWrap} onPress={handleCreateNode}>
        <IconFont name="plus" color="#000" size={14} />
        <Text style={Cstyles.createText}>创建</Text>
      </Pressable>
      <TabView
        currentKey={currentKey}
        onChange={onChange}
        align="center"
        bottomLine={true}
        separator={false}
        tabStyle={{height: RFValue(33) + 10, paddingBottom: 10}}
        tabScrollStyle={{paddingHorizontal: 15}}
        tabData={[
          {
            key: 'mine',
            title: (
              <View style={{position: 'relative'}}>
                <Text
                  style={[styles.tabItemText, currentKey === 'mine' && styles.tabItemTextActive]}>
                  我的
                </Text>
              </View>
            ),
            component: MineNodeListPage,
          },
          {
            key: 'square',
            title: (
              <View style={{position: 'relative'}}>
              <Text
                style={[
                  styles.tabItemText,
                  currentKey === 'square' && styles.tabItemTextActive,
                ]}>
                广场
              </Text>
              </View>
            ),
            component: SquareListPage,
          },
          {
            key: 'city',
            title: (
              <View style={{position: 'relative'}}>
              <Text
                style={[styles.tabItemText, currentKey === 'city' && styles.tabItemTextActive]}>
                {nodeTabTitle}
              </Text>
              </View>
            ),
            component: NearbyNodesListPage,
          },
        ]}
      />
      <DownLoadModal />
    </View>
  );
};

const styles = StyleSheet.create({
  tabItemText: {
    fontSize: 16,
    color: '#93a2a9',
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  tabItemTextActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default Community;
