import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();
const MessageStack = createStackNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

const Recommend = props => {
  return <Text style={{marginTop: 100, textAlign: 'center'}}>推荐2</Text>;
};

const NewTopic = props => {
  return <Text style={{marginTop: 100, textAlign: 'center'}}>发布帖子</Text>;
};

const Find = () => {
  return <Text style={{marginTop: 100, textAlign: 'center'}}>发现</Text>;
};

const Messagee = () => {
  return <Text style={{marginTop: 100, textAlign: 'center'}}>Messagee</Text>;
};

const SocialLogin = () => {
  return <Text style={{marginTop: 100, textAlign: 'center'}}>SocialLogin</Text>;
};

const MessageStackScreen = () => {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messagee" component={Messagee} />
      <MessageStack.Screen name="Recommend" component={Recommend} />
    </MessageStack.Navigator>
  );
};

const MainTabScreen = () => (
  <Tab.Navigator activeColor="#fff">
    <Tab.Screen name="Recommend" component={MessageStackScreen} options={{tabBarLabel: '消息'}} />
    <Tab.Screen name="NewTopic" component={NewTopic} options={{tabBarLabel: '发布帖子'}} />
    <Tab.Screen name="Find" component={Find} options={{tabBarLabel: '发现'}} />
  </Tab.Navigator>
);

export const MainStackScreen = () => (
  <MainStack.Navigator initialRouteName="Recommend">
    <MainStack.Screen name="Recommend" component={MainTabScreen} options={{headerShown: false}} />
    <MainStack.Screen name="MineDetail" component={Messagee} options={{tabBarLabel: '推荐'}} />
  </MainStack.Navigator>
);

export const AuthStackScreen = ({navigation}) => (
  <AuthStack.Navigator initialRouteName="SocialLogin">
    <AuthStack.Screen name="SocialLogin" component={SocialLogin} />
  </AuthStack.Navigator>
);
