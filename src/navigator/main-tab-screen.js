import React, {useState} from 'react';
import {View, Text, Image, Pressable, Vibration, StyleSheet, Dimensions} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {BOTTOM_HEIGHT, IsIos} from '@/utils/navbar';
import {BottomModal, BadgeMessage} from '@/components/NodeComponents';
import {draftTheory} from '@/api/theory_api';
import Accounts from '@/pages/tabBar/accounts';
import Community from '@/pages/tabBar/community';
import ChatGroups from '@/pages/tabBar/chat-groups';
import Recommend from '@/pages/tabBar/home/recommend';
import Discovery from '@/pages/discoveries/discovery';

const indexImage = require('@/assets/tabimages/index-active.png');

const {width} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const PublishModal = props => {
  const {navigation, visible, onCancel} = props;
  const imgStyle = {width: '100%', height: ((width - 60) * 260) / 1260};
  const {theory} = useSelector(state => state.theory);

  const onTheory = () => {
    onCancel();
    if (theory.id) {
      navigation.navigate('NewTheoryContent', {id: theory.id});
    } else {
      navigation.navigate('NewTheory');
    }
  };

  const onTopic = () => {
    navigation.navigate('NewTopic');
    onCancel();
  };

  const onRate = () => {
    navigation.navigate('NewRate');
    onCancel();
  };

  return (
    <BottomModal
      visible={visible}
      cancleClick={onCancel}
      overlayOpacity={0.2}
      modalStyle={{height: 370 + BOTTOM_HEIGHT}}
      contentWrapStyle={styles.contentModal}>
      <Pressable style={imgStyle} onPress={onTopic}>
        <FastImg source={require('@/assets/create/topic.png')} style={imgStyle} />
      </Pressable>
      <Pressable style={{...imgStyle, marginTop: RFValue(15)}} onPress={onTheory}>
        <FastImg source={require('@/assets/create/theory.png')} style={imgStyle} />
      </Pressable>
      <Pressable style={{...imgStyle, marginTop: RFValue(15)}} onPress={onRate}>
        <FastImg source={require('@/assets/create/rate.png')} style={imgStyle} />
      </Pressable>
      <Pressable onPress={onCancel} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <IconFont name="close" size={18} color="#fff" style={styles.closeModal} />
      </Pressable>
    </BottomModal>
  );
};

const MainTabScreen = props => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const {currentBaseInfo} = useSelector(state => state.account);
  const [visible, setVisible] = useState(false);

  const RenderImage = (name, focused) => {
    switch (name) {
      case 'Accounts':
        return <Text style={focused ? styles.tabActiveText : styles.tabText}>顽友</Text>;
      case 'ChatGroups':
        return <Text style={focused ? styles.tabActiveText : styles.tabText}>聊天</Text>;
      case 'Community':
        return <Text style={focused ? styles.tabActiveText : styles.tabText}>社区</Text>;
      case 'Discovery':
        return <Text style={focused ? styles.tabActiveText : styles.tabText}>发现</Text>;
      case 'Recommend':
        const style = {width: (500 * 24) / 351, height: 24};
        return focused ? (
          <View style={style}>
            <Image source={indexImage} style={style} mode="cover" />
          </View>
        ) : (
          <Text style={styles.tabText}>顽鸦</Text>
        );
    }
  };

  const UnreadMessageCount = () => {
    if (!currentBaseInfo) {
      return 0;
    }

    return currentBaseInfo.new_message_count + currentBaseInfo.unread_chat_messages_count;
  };

  const impactLight = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  return (
    <>
      <PublishModal {...props} visible={visible} onCancel={() => setVisible(false)} />
      <Tab.Navigator
        initialRouteName="Recommend"
        screenOptions={({route, navigation}) => ({
          tabBarIcon: ({focused}) => {
            const rightDis =
              UnreadMessageCount() >= 1 && UnreadMessageCount() < 10
                ? -VWValue(9)
                : UnreadMessageCount() > 99
                ? -VWValue(12) * 1.75
                : -VWValue(11) * 1.45;
            return route.name === 'ChatGroups' ? (
              <View style={{}}>
                <BadgeMessage
                  size={'tab'}
                  value={UnreadMessageCount()}
                  containerStyle={[
                    styles.badge,
                    {
                      right: IsIos ? rightDis : rightDis + 6,
                    },
                  ]}
                />
                {RenderImage(route.name, focused)}
                {focused && (
                  <View style={[styles.activeLine, {left: RFValue(50) / 2 - VWValue(12)}]} />
                )}
              </View>
            ) : (
              <View style={{position: 'relative'}}>
                {RenderImage(route.name, focused)}
                {focused && route.name !== 'Recommend' && (
                  <View style={[styles.activeLine, {left: RFValue(50) / 2 - VWValue(12)}]} />
                )}
              </View>
            );
          },
        })}
        tabBarOptions={{
          safeAreaInsets: {...insets, bottom: insets.bottom + BOTTOM_HEIGHT},
          showLabel: false,
          tabStyle: {height: RFValue(40)},
          style: {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#EBEBEB',
            height: RFValue(40),
          },
          onPress: () => {
            impactLight();
          },
        }}>
        <Tab.Screen
          name="Accounts"
          component={Accounts}
          listeners={({navigation}) => ({
            tabPress: async e => {
              impactLight();
            },
          })}
        />
        <Tab.Screen
          name="ChatGroups"
          component={ChatGroups}
          listeners={({navigation}) => ({
            tabPress: async e => {
              impactLight();
            },
          })}
        />
        <Tab.Screen
          name="Recommend"
          component={Recommend}
          options={{gestureEnabled: false}}
          initialParams={props.route.params}
          listeners={({navigation}) => ({
            tabPress: async e => {
              impactLight();
              // console.log('xxxx');
              if (navigation.isFocused()) {
                e.preventDefault();
                setVisible(true);
                const res = await draftTheory();
                dispatch({type: action.UPDATE_THEORY, value: res.theory ? res.theory : {}});
              }
            },
          })}
        />
        <Tab.Screen
          name="Community"
          component={Community}
          listeners={({navigation}) => ({
            tabPress: async e => {
              impactLight();
            },
          })}
        />
        <Tab.Screen
          name="Discovery"
          component={Discovery}
          listeners={({navigation}) => ({
            tabPress: async e => {
              impactLight();
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    height: RFValue(40),
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },
  contentModal: {
    backgroundColor: '#000000',
    paddingTop: RFValue(25),
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    bottom: 0,
  },
  closeModal: {
    marginTop: RFValue(15),
    paddingBottom: RFValue(30),
  },
  tabText: {
    width: RFValue(50),
    textAlign: 'center',
    fontSize: 15,
    color: '#93a2a9',
    fontWeight: '500',
  },
  tabActiveText: {
    width: RFValue(50),
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -7,
    zIndex: 1,
  },
  activeLine: {
    width: VWValue(24),
    height: 3,
    backgroundColor: '#FF2242',
    position: 'absolute',
    bottom: -RFValue(6),
    borderRadius: 3,
  },
});

export default MainTabScreen;
