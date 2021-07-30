import React from 'react';
import {Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FastImg from '@/components/FastImg';
import MainTabScreen from './main-tab-screen';
import {MainRouters, AuthRouters} from './config';
const BackBlack = require('@/assets/images/back.png');
const BackWhite = require('@/assets/images/back-white.png');

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HeaderLeft = props => {
  const {image, navigation} = props;

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <Pressable hitSlop={{left: 10, right: 10, top: 10, bottom: 10}} onPress={onPress}>
      {/*{ navigation.canGoBack() ? <FastImg source={image} style={{width: 9, height: 15}} />  : null}*/}
      <FastImg source={image} style={{width: 9, height: 15}} />
    </Pressable>
  );
};

// MainStackScreen
export const MainStackScreen = props => {
  return (
    <MainStack.Navigator
      initialRouteName="Recommend"
      headerMode="screen"
      screenOptions={() => ({
        headerStyle: {backgroundColor: 'white', shadowOpacity: 0},
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingLeft: 14},
        headerRightContainerStyle: {paddingRight: 14},
        headerTitleStyle: {fontWeight: '500', fontSize: 16},
        headerLeft: () => <HeaderLeft {...props} image={BackBlack} />,
      })}>
      <MainStack.Screen name="Recommend" component={MainTabScreen} options={{headerShown: false}} />
      {MainRouters.map(route => {
        const {name, options, component: Component} = route;
        return <MainStack.Screen key={name} name={name} options={options} component={Component} />;
      })}
    </MainStack.Navigator>
  );
};

// AuthStackScreen
export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SocialLogin"
      screenOptions={props => {
        return {
          title: false,
          headerStyle: {
            backgroundColor: 'black',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeftContainerStyle: {paddingLeft: 14},
          headerRightContainerStyle: {paddingRight: 14},
          headerLeft: () => <HeaderLeft {...props} image={BackWhite} />,
        };
      }}>
      {AuthRouters.map(route => {
        const {name, options, component: Component} = route;
        return <AuthStack.Screen key={name} name={name} options={options} component={Component} />;
      })}
    </AuthStack.Navigator>
  );
};
