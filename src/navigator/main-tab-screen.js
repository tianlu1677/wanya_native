import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Platform, Dimensions} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import * as action from '@/redux/constants';
import IconFont from '@/iconfont';
import FastImg from '@/components/FastImg';
import {RFValue} from '@/utils/response-fontsize';
import {BOTTOM_HEIGHT} from '@/utils/navbar';
import {BottomModal, BlurView, BadgeMessage} from '@/components/NodeComponents';
import {draftTheory} from '@/api/theory_api';
import NotifyIndex from '@/pages/notify/notify-index';
import Recommend from '@/pages/home/recommend';
import Discovery from '@/pages/discoveries/discovery';

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
      <Pressable style={imgStyle} onPress={onTheory}>
        <FastImg source={require('@/assets/images/add-theory.png')} style={imgStyle} />
      </Pressable>
      <Pressable style={{...imgStyle, marginTop: RFValue(15)}} onPress={onTopic}>
        <FastImg source={require('@/assets/images/add-topic.png')} style={imgStyle} />
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
      case 'NotifyIndex':
        return focused ? messageActive : message;
      case 'Recommend':
        return focused ? indexActive : index;
      case 'Discovery':
        return focused ? discoveryActive : discovery;
    }
  };

  const UnreadMessageCount = () => {
    if (!currentBaseInfo || currentBaseInfo.new_message_count === 0) {
      return 0;
    }
    return currentBaseInfo.new_message_count;
  };

  return (
    <>
      <PublishModal {...props} visible={visible} onCancel={() => setVisible(false)} />
      <Tab.Navigator
        initialRouteName="Recommend"
        tabBar={barprops => (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={80}
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

            return route.name === 'NotifyIndex' ? (
              <View style={{position: 'relative'}}>
                <BadgeMessage
                  size={'middle'}
                  value={UnreadMessageCount()}
                  containerStyle={[styles.badge, {right: UnreadMessageCount() > 9 ? -28 : -17}]}
                />
                <FastImg source={RenderImage(route.name, focused)} style={style} />
              </View>
            ) : (
              <FastImg source={RenderImage(route.name, focused)} style={style} />
            );
          },
        })}
        tabBarOptions={{
          showLabel: false,
          tabStyle: {height: RFValue(50)},
          style: {
            backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#eee',
            borderTopWidth: 0,
            height: RFValue(50),
          },
        }}>
        <Tab.Screen name="NotifyIndex" component={NotifyIndex} />
        <Tab.Screen
          name="Recommend"
          component={Recommend}
          options={{gestureEnabled: false}}
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
        <Tab.Screen name="Discovery" component={Discovery} options={{}} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    height: RFValue(50),
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
  badge: {
    position: 'absolute',
    top: -5,
  },
});

export default MainTabScreen;
