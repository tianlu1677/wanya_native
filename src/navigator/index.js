import * as React from 'react';
import 'react-native-gesture-handler';
import {Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {navigationRef} from '@/navigator/root-navigation';
import {routers, tabRouters} from './config'; //router 配置
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();

function HomeTabList() {
  return (
    <Tab.Navigator
      initialRouteName={'Recommend'}
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
      {tabRouters.map(route => {
        const render = props => {
          const Components = route.component;
          return route.safeArea === false ? (
            <Components {...props} />
          ) : (
            <SafeAreaView style={{flex: 1}}>
              <Components {...props} />
            </SafeAreaView>
          );
        };
        return (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={render}
            options={route.options}
          />
        );
      })}
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
  const Render = props => {
    return <HomeTabList {...props} />;
  };

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
      <MainStack.Screen name="Recommend" component={Render} options={{headerShown: false}} />
      {routers.map(route => {
        const render = props => {
          const Components = route.component;
          return route.safeArea === false ? (
            <Components {...props} />
          ) : (
            <SafeAreaView style={{flex: 1}}>
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
}

const Navigation = () => {
  const login = useSelector(state => state.login);
  return (
    <NavigationContainer ref={navigationRef}>
      <>{!login.auth_token ? AuthStackList() : MainStackList()}</>
    </NavigationContainer>
  );
};

export default Navigation;
