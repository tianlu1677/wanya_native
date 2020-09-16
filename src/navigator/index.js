import * as React from 'react';
import 'react-native-gesture-handler';
import {Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {navigationRef} from '@/navigator/root-navigation';
import {routers, tabRouters, createTopicRouter} from './config'; //router 配置
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import NewTopic from '@/pages/topics/new-topic';
import { HeaderBackButton } from '@react-navigation/stack';

import {BlurView, VibrancyView} from '@react-native-community/blur';
import IconFont from '@/iconfont';
import Icon from 'react-native-vector-icons/Ionicons';
import Recommend from '@/pages/home/recommend';
import GoNewTopic from '@/pages/topics/go-new-topic';
import MineDetail from '@/pages/mine/mine-detail';
//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';

import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const TopicStack = createStackNavigator();
const AuthStack = createStackNavigator();

const TabBar = props => (
  <VibrancyView
    style={styles.blurView}
    blurType="light"
    blurAmount={80}
    reducedTransparencyFallbackColor="#white">
    <BottomTabBar {...props} />
  </VibrancyView>
);

function HomeTabList() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBar={TabBar}
      initialRouteName={'Recommend'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon_list = {
            'focused_Recommend': 'home-recommend',
            'unfocused_Recommend': 'home-recommend-outline',
            'unfocused_MineDetail': 'home-mine-outline',
            'focused_MineDetail': 'home-mine',
            'unfocused_GoNewTopic': 'home-newtopic',

          }
          let iconName = 'search';
          if (route.name === 'Recommend') {
            iconName = 'search';
          } else if (route.name === 'MineDetail') {
            iconName = focused ? 'white-circle' : 'double-circle';
          }

          let icon_name = `${focused ? 'focused' : 'unfocused'}_${route.name}`
          return <IconFont name={icon_list[icon_name]} size={24} color="black" />
          // return <IconFont name={iconName} color={focused ? 'black' : 'red'} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'none',
        inactiveBackgroundColor: 'none',
        safeAreaInsets: {bottom: 0},
        tabStyle: {display: 'flex', justifyContent: 'center', lineHeight: 55},
        showLabel: false,
        style: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 55,
        },
      }}>
      <Tab.Screen key={'Recommend'} name={'Recommend'} component={Recommend} options={{}} />
      <Tab.Screen
        key={'GoNewTopic'}
        name={'GoNewTopic'}
        component={GoNewTopic}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('NewTopic');
          },
        })}
        options={{
          gestureEnabled: false
        }}
      />
      <Tab.Screen key={'MineDetail'} name={'MineDetail'} component={MineDetail} options={{}} />
    </Tab.Navigator>
  );
}

function AuthStackList() {
  return (
    <AuthStack.Navigator
      screenOptions={({route}) => ({
        // title: '管理员手机登录',
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: 'white',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
      })}>
      <AuthStack.Screen
        name="AdminPhoneLogin"
        component={AdminPhoneLogin}
        options={({route}) => ({})}
      />
      <AuthStack.Screen name="SocialLogin" component={SocialLogin} options={({route}) => ({})} />
      <AuthStack.Screen name="PhoneLogin" component={PhoneLogin} options={({route}) => ({})} />
      <AuthStack.Screen name="InviteLogin" component={InviteLogin} options={({route}) => ({})} />
    </AuthStack.Navigator>
  );
}

// function TopicStackList() {
//   return (
//     <TopicStack.Navigator
//       initialRouteName="NewTopic"
//       headerMode="false"
//       // screenOptions={{ animationEnabled: false }}
//       mode="modal"
//       screenOptions={({route}) => ({
//         headerStyle: {
//           backgroundColor: 'white',
//         },
//         headerBackTitleVisible: false,
//         headerTintColor: 'black',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       })}>
//       {createTopicRouter.map(route => {
//         const render = props => {
//           const Components = route.component;
//           return route.safeArea === false ? (
//             <Components {...props} />
//           ) : (
//             <SafeAreaView style={{flex: 1}}>
//               <Components {...props} />
//             </SafeAreaView>
//           );
//         };
//
//         return (
//           <TopicStack.Screen
//             key={route.name}
//             name={route.name}
//             component={render}
//             options={route.options}
//           />
//         );
//       })}
//     </TopicStack.Navigator>
//   );
// }
// function TopicStackList() {
//   return (
//     <TopicStack.Navigator
//       initialRouteName="NewTopic"
//       headerMode="false"
//       // screenOptions={{ animationEnabled: false }}
//       mode="modal"
//       screenOptions={({route}) => ({
//         headerStyle: {
//           backgroundColor: 'white',
//         },
//         headerBackTitleVisible: false,
//         headerTintColor: 'black',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       })}>
//       {createTopicRouter.map(route => {
//         const render = props => {
//           const Components = route.component;
//           return route.safeArea === false ? (
//             <Components {...props} />
//           ) : (
//             <SafeAreaView style={{flex: 1}}>
//               <Components {...props} />
//             </SafeAreaView>
//           );
//         };
//
//         return (
//           <TopicStack.Screen
//             key={route.name}
//             name={route.name}
//             component={render}
//             options={route.options}
//           />
//         );
//       })}
//     </TopicStack.Navigator>
//   );
// }

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
          // height: 54,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          // borderBottomColor: 'red',
          // justifyContent: 'center',
          // alignItems: 'center'
        },
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        leftButtonStyle: {

        },
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
          paddingLeft: 15,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16
        },
        headerBackImage: () => (<Image source={require('../assets/images/back.png')} style={{width: 16, height: 16}} />)
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

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 20,
    left: 80,
    right: 80,
    height: 55,
    borderRadius: 28,
  },
  bottomTabBar: {
    backgroundColor: 'transparent',
  },
});

export default Navigation;
