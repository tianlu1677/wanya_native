import * as React from 'react';
import 'react-native-gesture-handler';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect, useSelector} from 'react-redux';

import Index from '../pages/home/Index';
import PostDetail from '../pages/home/postDetail';
import Recommend from '../pages/home/Recommend';
import VideoDetail from '../pages/home/VideoDetail';

import Mine from '../pages/mine/mine';
// import AccountDetail from '@/pages/mine/account-detail';

// 用户
import AccountsIndex from '@/pages/accounts/accounts-index';

// 场地
import SpaceIndex from '@/pages/space/space-index';
import SpaceDetail from '@/pages/space/space-detail';

// 圈子
import NodeIndex from '../pages/nodes/node-index';
import NodeDetail from '../pages/nodes/node-detail';

// 发布
import NewTopic from '@/pages/home/newtopic';
import TopicIndex from '@/pages/home/topicIndex';
import MentionAccounts from '@/pages/home/MentionAccounts';

import NewTopics from '../pages/topics/NewTopic';

import TopicDetail from '../pages/topics/TopicDetail';
import AdminPhoneLogin from '../pages/login/AdminPhoneLogin';
import InviteDetail from '../pages/mine/invite-detail';

import LabIndex from '@/pages/labs/index';
import LabTabIndex from '@/pages/labs/tabindex';
import LabWebview from '@/pages/labs/webview';
import LabStorageIndex from '@/pages/labs/storageindex';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';

// 消息通知页面
import NotifyIndex from '../pages/notify/notify-index';
import CommentNotify from '../pages/notify/comment-notify';
import PraiseNotify from '../pages/notify/praise-notify';
import SystemNotify from '../pages/notify/system-notify';
import FollowNotify from '../pages/notify/follow-notify';
import MentionNotify from '../pages/notify/mention-notify';

// 网页显示
import WebView from '../pages/webview/webview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const StackNavigator = Stack.Navigator;
const AuthStack = createStackNavigator();

function HomeTabList() {
  return (
    <Tab.Navigator
      initialRouteName="Node"
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
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#219bd9',
        inactiveBackgroundColor: '#d6f9ff',
        safeAreaInsets: {bottom: 0},
        // style: {height: 70},
        tabStyle: {paddingBottom: 15},
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          left: 50,
          right: 50,
          bottom: 20,
          height: 50,
        },
      }}>
      <Tab.Screen name="Node" component={Index} options={{title: '圈子'}} />
      <Tab.Screen name="newtopic" component={NewTopic} options={{title: '上传'}} />
      <Tab.Screen name="LabTabIndex" component={LabTabIndex} options={{title: '消息'}} />
      <Tab.Screen
        name="Recommend"
        component={Index}
        options={{
          title: '推荐',
        }}
      />
      <Tab.Screen name="Mine" component={Mine} options={{title: '我的'}} />
      <Tab.Screen name="NotifyIndex" component={NotifyIndex} options={{title: '消息'}} />
    </Tab.Navigator>
  );
}

function AuthStackList() {
  return (
    <AuthStack.Navigator
      screenOptions={({route}) => ({
        title: '管理员手机登录',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <AuthStack.Screen
        name="AdminPhoneLogin"
        component={AdminPhoneLogin}
        options={({route}) => ({})}
      />
    </AuthStack.Navigator>
  );
}

function MainStackList() {
  return (
    <MainStack.Navigator
      initialRouteName="Recommend"
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: 'white',
        },
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <MainStack.Screen
        name="Recommend"
        component={HomeTabList}
        options={{
          headerShown: false,
          title: '推荐',
        }}
      />
      <MainStack.Screen name="TopicIndex" component={PostDetail} options={{title: '话题'}} />
      <MainStack.Screen name="AccountsIndex" component={AccountsIndex} options={{title: '用户'}} />
      <MainStack.Screen name="SpaceIndex" component={SpaceIndex} options={{title: '场地列表'}} />
      <MainStack.Screen
        name="MentionAccounts"
        component={MentionAccounts}
        options={{title: '顽友'}}
      />
      <MainStack.Screen name="PostDetail" component={PostDetail} options={{title: '话题详情'}} />

      <MainStack.Screen name="NodeDetail" component={NodeDetail} options={{title: '圈子详情'}} />
      <MainStack.Screen name="NodeIndex" component={NodeIndex} options={{title: '圈子列表'}} />
      <MainStack.Screen name="VideoDetail" component={VideoDetail} options={{title: '视频'}} />
      <MainStack.Screen name="NewTopic" component={NewTopic} options={{title: '创建帖子11'}} />
      <MainStack.Screen name="TopicDetail" component={TopicDetail} options={{title: '帖子详情'}} />

      <MainStack.Screen
        name="PhoneLogin"
        component={PhoneLogin}
        options={{
          headerStyle: {
            backgroundColor: 'black',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            color: 'white',
          },
        }}
      />
      <MainStack.Screen
        name="SocialLogin"
        component={SocialLogin}
        options={{
          title: '微信登录',
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="InviteLogin"
        component={InviteLogin}
        options={{title: '输入邀请码'}}
      />

      <MainStack.Screen
        name="InviteDetail"
        component={InviteDetail}
        options={{title: '我的邀请'}}
      />

      <MainStack.Screen name="LabIndex" component={LabIndex} options={{title: '实验室主页'}} />
      <MainStack.Screen
        name="LabTabIndex"
        component={LabTabIndex}
        options={{title: '实验室标签页'}}
      />
      <MainStack.Screen name="LabWebview" component={LabWebview} options={{title: ''}} />
      <MainStack.Screen name="LabStorageIndex" component={LabStorageIndex} options={{title: ''}} />
      <MainStack.Screen name="AdminPhoneLogin" component={AdminPhoneLogin} options={{title: ''}} />

      {/*  消息通知*/}
      <MainStack.Screen
        name="NotifyIndex"
        component={NotifyIndex}
        options={{title: '消息', headerShown: true}}
      />
      <MainStack.Screen
        name="CommentNotify"
        component={CommentNotify}
        options={{title: '评论通知'}}
      />
      <MainStack.Screen
        name="PraiseNotify"
        component={PraiseNotify}
        options={{title: '点赞通知'}}
      />
      <MainStack.Screen
        name="SystemNotify"
        component={SystemNotify}
        options={{title: '系统通知'}}
      />
      <MainStack.Screen
        name="FollowNotify"
        component={FollowNotify}
        options={{title: '关注通知'}}
      />
      <MainStack.Screen name="MentionNotify" component={MentionNotify} options={{title: '@我的'}} />
      <MainStack.Screen name="WebView" component={WebView} options={{title: ''}} />
    </MainStack.Navigator>
  );
}

export default function Navigation() {
  const login = useSelector(state => state.login);
  console.log('login', login);
  return (
    <NavigationContainer>
      {/* {!login.auth_token ? AuthStackList() : MainStackList()} */}
      {MainStackList()}
    </NavigationContainer>
  );
}
