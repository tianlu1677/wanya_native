import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, Pressable, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {createConsumer} from '@rails/actioncable';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
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
import {IsIos, BOTTOM_HEIGHT, BarHeight} from '@/utils/navbar';
import CommentInput from '@/components/comment-input';
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
    dispatch({type: action.CHANGE_COMMENT_VISIBLE, value: false});
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

    Keyboard.addListener('keyboardDidHide', () => {
      dispatch({type: action.CHANGE_COMMENT_VISIBLE, value: false});
    });

    return () => {
      Keyboard.removeListener('keyboardDidHide');
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={IsIos ? -BarHeight + RFValue(40) : RFValue(40)}>
      <Pressable style={{flex: 1}}>
        <View style={Cstyles.wrapper}>
          <View style={{height: BoothHeight}} />
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
          <DownLoadModal />
          <CommentInput />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Community;
