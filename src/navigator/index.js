import * as React from 'react';
import 'react-native-gesture-handler';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Index from '../pages/home/Index';
import Recommend from '../pages/home/Recommend';
import VideoDetail from '../pages/home/VideoDetail';

import Mine from '../pages/mine/mine';

import NodeDetail from '../pages/nodes/node-detail';
import NodeIndex from '../pages/nodes/node-index';
import TopicDetail from '../pages/topics/TopicDetail';
import NewTopic from '../pages/topics/NewTopic';
import AdminPhoneLogin from '../pages/login/AdminPhoneLogin'
import InviteDetail from '../pages/mine/invite-detail'

import LabIndex from '@/pages/labs/index';
import LabTabIndex from '@/pages/labs/tabindex';
import LabWebview from '@/pages/labs/webview';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';

// 消息通知页面
import NotifyIndex from '../pages/notify/notify-index';
import CommentNotify from "../pages/notify/comment-notify"
import PraiseNotify from "../pages/notify/praise-notify"
import SystemNotify from "../pages/notify/system-notify"
import FollowNotify from "../pages/notify/follow-notify"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const StackNavigator = Stack.Navigator;

function HomeTabList() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'logo-react';

          if (route.name === 'Search') {
            iconName = 'ios-search';
          } else if (route.name === 'Fav') {
            iconName = focused ? 'ios-heart' : 'ios-heart-empty';
          }

          // You can return any component that you like here!
          return <Text />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#219bd9',
        inactiveBackgroundColor: '#d6f9ff',
        safeAreaInsets: {bottom: 0},
        style: {height: 70},
        tabStyle: {paddingBottom: 15}
      }}>

      <Tab.Screen name="Index" component={Index} options={{title: '消息'}} />
      <Tab.Screen name="Recommend" component={Index} options={{title: '推荐'}} />
      <Tab.Screen name="Mine" component={Mine} options={{title: '我的'}} />
    </Tab.Navigator>
  );
}

function MainStackList() {
  return (
    <MainStack.Navigator>
      <MainStack.Scrreen name="NodeDetail" component={NodeDetail} />
      <MainStack.Scrreen name="NodeIndex" component={NodeIndex} />
    </MainStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigator initialRouteName="Recommend">
        <Stack.Screen name="Recommend" component={HomeTabList} options={{title: '推荐'}} />

        <Stack.Screen name="NodeDetail" component={NodeDetail} options={{title: '圈子详情'}} />
        <Stack.Screen name="NodeIndex" component={NodeIndex} options={{title: '圈子列表'}} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} options={{title: '视频'}} />
        <Stack.Screen name="NewTopic" component={NewTopic} options={{title: '创建帖子'}} />
        <Stack.Screen name="TopicDetail" component={TopicDetail} options={{title: '帖子详情'}} />

        <Stack.Screen name="PhoneLogin" component={PhoneLogin} options={{title: '手机登录'}} />
        <Stack.Screen name="SocialLogin" component={SocialLogin} options={{title: '微信登录'}} />
        <Stack.Screen name="InviteLogin" component={InviteLogin} options={{title: '输入邀请码'}} />

        <Stack.Screen name="InviteDetail" component={InviteDetail} options={{title: '我的邀请'}} />

        <Stack.Screen name="LabIndex" component={LabIndex} options={{title: '实验室主页'}} />
        <Stack.Screen
          name="LabTabIndex"
          component={LabTabIndex}
          options={{title: '实验室标签页'}}
        />
        <Stack.Screen name="LabWebview" component={LabWebview} options={{title: ''}} />
        <Stack.Screen name="AdminPhoneLogin" component={AdminPhoneLogin} options={{title: ''}} />


        {/*  消息通知*/}
        <Stack.Screen name="CommentNotify" component={CommentNotify} options={{title: '消息通知'}} />
        <Stack.Screen name="PraiseNotify" component={PraiseNotify} options={{title: '消息通知'}} />
        <Stack.Screen name="SystemNotify" component={SystemNotify} options={{title: '消息通知'}} />
        <Stack.Screen name="FollowNotify" component={FollowNotify} options={{title: '消息通知'}} />
      </StackNavigator>
    </NavigationContainer>
  );
}
