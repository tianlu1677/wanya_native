import React from 'react';
import {View, SafeAreaView, Platform, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FastImg from '@/components/FastImg';
import MainTabScreen from './main-tab-screen';

// MainStackScreen
import {routers} from './config';

// AuthStackScreen
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';
import PasswordLogin from '@/pages/sessions/password-login';
import WebView from '@/pages/webview/webview';

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const MainStackScreen = () => (
  <MainStack.Navigator
    initialRouteName="Recommend"
    headerMode="screen"
    screenOptions={() => ({
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'white' : 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
      },
      headerBackTitleVisible: false,
      headerTintColor: 'black',
      leftButtonStyle: {},
      headerLeftContainerStyle: {paddingLeft: 15},
      headerRightContainerStyle: {paddingRight: 15},
      headerTitleStyle: {fontWeight: 'bold', fontSize: 16},
      headerBackImage: () => (
        <View style={{flex: 1, paddingRight: 20}}>
          <FastImg
            source={require('@/assets/images/back.png')}
            style={{width: 9, height: 15, paddingLeft: 0}}
          />
        </View>
      ),
    })}>
    <MainStack.Screen name="Recommend" component={MainTabScreen} options={{headerShown: false}} />
    {routers.map(route => {
      const render = props => {
        const Components = route.component;
        return route.safeArea === false ? (
          <>
            {route.bar !== false && (
              <StatusBar
                barStyle={`${route.barColor || 'light'}-content`}
                backgroundColor="transparent"
              />
            )}
            <Components {...props} />
          </>
        ) : (
          <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            {route.bar !== false && (
              <StatusBar
                barStyle={`${route.barColor || 'light'}-content`}
                translucent={!!route.translucent}
                backgroundColor={route.backgroundColor || 'transparent'}
              />
            )}
            <Components {...props} />
          </SafeAreaView>
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

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SocialLogin">
      <AuthStack.Screen name="SocialLogin" component={SocialLogin} />
      <AuthStack.Screen name="PhoneLogin" component={PhoneLogin} />
      <AuthStack.Screen name="InviteLogin" component={InviteLogin} />
      <AuthStack.Screen name="PasswordLogin" component={PasswordLogin} />
      <AuthStack.Screen name="WebView" component={WebView} />
      <AuthStack.Screen name="AdminPhoneLogin" component={AdminPhoneLogin} />
    </AuthStack.Navigator>
  );
};
