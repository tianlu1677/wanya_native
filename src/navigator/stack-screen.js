import React from 'react';
import {Platform, StatusBar, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FastImg from '@/components/FastImg';
import MainTabScreen from './main-tab-screen';

// MainStackScreen
import {routers} from './config';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const MainStackScreen = props => {
  const {navigation} = props;
  return (
    <MainStack.Navigator
      initialRouteName="Recommend"
      headerMode="screen"
      screenOptions={() => ({
        headerStyle: {backgroundColor: Platform.OS === 'ios' ? 'white' : 'white', shadowOpacity: 0},
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingLeft: 14},
        headerRightContainerStyle: {paddingRight: 14},
        headerTitleStyle: {fontWeight: '500', fontSize: 16},
        headerLeft: () => (
          <Pressable
            hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
            onPress={() => navigation.goBack()}>
            <FastImg source={require('@/assets/images/back.png')} style={{width: 9, height: 15}} />
          </Pressable>
        ),
      })}>
      <MainStack.Screen name="Recommend" component={MainTabScreen} options={{headerShown: false}} />
      {routers.map(route => {
        const render = props => {
          const {barColor, component: Components} = route;
          return (
            <>
              <StatusBar backgroundColor="transparent" barStyle={`${barColor || 'dark'}-content`} />
              <Components {...props} />
            </>
          );
        };

        return (
          <MainStack.Screen
            key={route.name}
            name={route.name}
            component={render}
            options={route.options}
          />
        );
      })}
    </MainStack.Navigator>
  );
};

// AuthStackScreen
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';
import PasswordLogin from '@/pages/sessions/password-login';
import WebView from '@/pages/webview/webview';

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SocialLogin">
      <AuthStack.Screen name="SocialLogin" component={SocialLogin} />
      <AuthStack.Screen name="PhoneLogin" component={PhoneLogin} />
      <AuthStack.Screen name="InviteLogin" component={InviteLogin} />
      <AuthStack.Screen name="PasswordLogin" component={PasswordLogin} />
      <AuthStack.Screen name="AdminPhoneLogin" component={AdminPhoneLogin} />
      <AuthStack.Screen name="WebView" component={WebView} />
    </AuthStack.Navigator>
  );
};
