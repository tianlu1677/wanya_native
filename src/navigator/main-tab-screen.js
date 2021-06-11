import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Platform, Dimensions} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue, VWValue} from '@/utils/response-fontsize';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {BottomModal, BlurView, BadgeMessage} from '@/components/NodeComponents';
import {draftTheory} from '@/api/theory_api';
import ChatGroups from '@/pages/chats/chat_groups';
import Recommend from '@/pages/home/recommend';
import Discovery from '@/pages/discoveries/discovery';
// import WebView from '@/pages/webview/webview'; //webview

const {width} = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const message = require('@/assets/tabimages/message.png');
const messageActive = require('@/assets/tabimages/message-active.png');
const discovery = require('@/assets/tabimages/discovery.png');
const discoveryActive = require('@/assets/tabimages/discovery-active.png');
const index = require('@/assets/tabimages/index.png');
const indexActive = require('@/assets/tabimages/index-active.png');

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
    onCancel();
    navigation.navigate('NewTopic');
  };

  return (
    <BottomModal
      visible={visible}
      cancleClick={onCancel}
      modalStyle={{height: 270 + BOTTOM_HEIGHT}}
      contentWrapStyle={styles.contentModal}>
      <Pressable style={imgStyle} onPress={onTopic}>
        <FastImg source={require('@/assets/images/add-topic.png')} style={imgStyle} />
      </Pressable>
      <Pressable style={{...imgStyle, marginTop: RFValue(15)}} onPress={onTheory}>
        <FastImg source={require('@/assets/images/add-theory.png')} style={imgStyle} />
      </Pressable>
      <Pressable onPress={onCancel} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <IconFont name="close" size={18} color="#fff" style={styles.closeModal} />
      </Pressable>
    </BottomModal>
  );
};

const MainTabScreen = props => {
  const dispatch = useDispatch();
  const {currentBaseInfo} = useSelector(state => state.account);
  const [visible, setVisible] = useState(false);

  const RenderImage = (name, focused) => {
    switch (name) {
      case 'ChatGroups':
        return focused ? messageActive : message;
      case 'Recommend':
        return focused ? indexActive : index;
      case 'Discovery':
        return focused ? discoveryActive : discovery;
    }
  };

  const UnreadMessageCount = () => {
    if (!currentBaseInfo || currentBaseInfo.unread_chat_messages_count === 0) {
      return 0;
    }
    return currentBaseInfo.unread_chat_messages_count;
  };

  return (
    <>
      <PublishModal {...props} visible={visible} onCancel={() => setVisible(false)} />
      <Tab.Navigator
        initialRouteName="Recommend"
        tabBar={barprops => (
          <BlurView
            style={styles.blurView}
            blurType="chromeMaterial"
            blurAmount={20}
            reducedTransparencyFallbackColor="#white">
            <BottomTabBar {...barprops} />
          </BlurView>
        )}
        screenOptions={({route, navigation}) => ({
          tabBarIcon: ({focused}) => {
            const style =
              route.name === 'Recommend' && focused
                ? {width: (500 * RFValue(27)) / 351, height: RFValue(27)}
                : {width: (134 * RFValue(16)) / 64, height: RFValue(16)};

            return route.name === 'ChatGroups' ? (
              <View style={{position: 'relative'}}>
                <BadgeMessage
                  size={'tab'}
                  value={UnreadMessageCount()}
                  containerStyle={[
                    styles.badge,
                    {
                      right:
                        UnreadMessageCount() >= 1 && UnreadMessageCount() < 10
                          ? -VWValue(15)
                          : UnreadMessageCount() > 99
                          ? -VWValue(15) * 1.75
                          : -VWValue(15) * 1.45,
                    },
                  ]}
                />
                <Text style={style.tabText}>消息</Text>
                {/* <FastImg source={RenderImage(route.name, focused)} style={style} /> */}
                {focused && (
                  <View style={[styles.activeLine, {left: style.width / 2 - VWValue(12)}]} />
                )}
              </View>
            ) : (
              <View style={{position: 'relative'}}>
                {route.name === 'Recommend' ? (
                  focused ? (
                    <FastImg source={indexActive} style={style} />
                  ) : (
                    <Text style={style.tabTextIndex}>首页</Text>
                  )
                ) : (
                  <Text style={style.tabText}>发现</Text>
                )}
                {/* <FastImg source={RenderImage(route.name, focused)} style={style} /> */}
                {/* <Text>{route.name === 'Recommend' ? '首页' : '发现'}</Text> */}
                {focused && route.name === 'Discovery' && (
                  <View style={[styles.activeLine, {left: style.width / 2 - VWValue(12)}]} />
                )}
              </View>
            );
          },
        })}
        tabBarOptions={{
          safeAreaInsets: {bottom: 0},
          showLabel: false,
          tabStyle: {height: RFValue(50)},
          style: {
            backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white',
            borderTopWidth: 0,
            height: RFValue(50),
            paddingLeft: VWValue(34),
            paddingRight: VWValue(34),
          },
        }}>
        <Tab.Screen name="ChatGroups" component={ChatGroups} />
        <Tab.Screen
          name="Recommend"
          component={Recommend}
          options={{gestureEnabled: false}}
          initialParams={props.route.params}
          listeners={({navigation}) => ({
            tabPress: async e => {
              if (navigation.isFocused()) {
                e.preventDefault();
                setVisible(true);
                const res = await draftTheory();
                dispatch({type: action.UPDATE_THEORY, value: res.theory ? res.theory : {}});
              }
            },
          })}
        />
        <Tab.Screen name="Discovery" component={Discovery} options={{title: '323232'}} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    height: RFValue(50),
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
    marginTop: RFValue(25),
    paddingBottom: RFValue(30),
  },
  tabTextIndex: {
    fontSize: 20,
    color: '#aaa',
  },
  tabText: {},
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
    bottom: -RFValue(8),
    borderRadius: 3,
  },
});

export default MainTabScreen;
