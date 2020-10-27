import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  Linking,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {navigationRef} from '@/navigator/root-navigation';
import {routers, tabRouters, createTopicRouter} from './config'; //router 配置
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import NewTopic from '@/pages/topics/new-topic';
import {HeaderBackButton} from '@react-navigation/stack';
import Helper from '@/utils/helper';
import AsyncStorage from '@react-native-community/async-storage';

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
import PasswordLogin from '@/pages/sessions/password-login';
import WebView from '@/pages/webview/webview';

import {useNavigation} from '@react-navigation/native';
import BackWhiteImg from '@/assets/images/back-white.png';
import BackImg from '@/assets/images/back.png';
import ViewShotPage from "@/components/SharePage"

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const TopicStack = createStackNavigator();
const AuthStack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE'; // 存储上次打开的位置

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
            focused_Recommend: 'home-recommend',
            unfocused_Recommend: 'home-recommend-outline',
            unfocused_MineDetail: 'home-mine-outline',
            focused_MineDetail: 'home-mine',
            unfocused_GoNewTopic: 'home-newtopic',
          };
          let iconName = 'search';
          if (route.name === 'Recommend') {
            iconName = 'search';
          } else if (route.name === 'MineDetail') {
            iconName = focused ? 'white-circle' : 'double-circle';
          }

          let icon_name = `${focused ? 'focused' : 'unfocused'}_${route.name}`;
          return <IconFont name={icon_list[icon_name]} size={22} color="black" />;
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
          gestureEnabled: false,
        }}
      />
      <Tab.Screen key={'MineDetail'} name={'MineDetail'} component={MineDetail} options={{}} />
    </Tab.Navigator>
  );
}

function MainStackList() {
  const Render = props => {
    return <HomeTabList {...props} />;
  };

  return (
    <MainStack.Navigator
      initialRouteName="Recommend"
      headerMode="screen"
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: 'white',
          // height: 54,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          // borderBottomColor: 'red',
          // justifyContent: 'center',
          // alignItems: 'center'
        },
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        leftButtonStyle: {},
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
          paddingLeft: 15,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        headerBackImage: () => (
          <View style={{paddingRight: 20, paddingTop: 10}}>
            <Image source={require('../assets/images/back.png')} style={{width: 9, height: 15, paddingLeft: 10}} />
          </View>
        ),
      })}>
      <MainStack.Screen name="Recommend" component={Render} options={{headerShown: false}} />
      {routers.map(route => {
        const render = props => {
          const Components = route.component;
          return route.safeArea === false ? (
            <>
              {route.bar !== false && (
                <StatusBar
                  barStyle={`${route.barColor || 'light'}-content`}
                  backgroundColor={'red'}
                />
              )}
              <Components {...props} />
            </>
          ) : (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
              {route.bar !== false && (
                <StatusBar
                  barStyle={`${route.barColor || 'light'}-content`}
                  backgroundColor={'red'}
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
}

function AuthStackList() {
  return (
    <AuthStack.Navigator
      initialRouteName="SocialLogin"
      screenOptions={({route}) => ({
        headerBackTitleVisible: false,
        title: false,
        headerStyle: {
          backgroundColor: 'black',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerBackImage: () => (
          <Image
            source={require('../assets/images/back-white.png')}
            style={{width: 9, height: 15}}
          />
        ),
      })}>
      <AuthStack.Screen name="SocialLogin" component={SocialLogin} />
      <AuthStack.Screen name="PhoneLogin" component={PhoneLogin} />
      <AuthStack.Screen name="InviteLogin" component={InviteLogin} />
      <AuthStack.Screen name="PasswordLogin" component={PasswordLogin} />
      <AuthStack.Screen name="WebView" component={WebView} />
      <AuthStack.Screen
        name="AdminPhoneLogin"
        component={AdminPhoneLogin}
        options={({route}) => ({})}
      />
    </AuthStack.Navigator>
  );
}

const Navigation = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const login = useSelector(state => state.login);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await Helper.getData(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            // console.log('state', state)
            setInitialState(state);
          }
        }
      } catch (e) {
        // console.log('e', e)
        setInitialState();
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={state => Helper.setData(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <>{!login.auth_token ? AuthStackList() : MainStackList()}</>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 20,
    left: '23%', // 23%
    right: '23%',
    height: 55,
    borderRadius: 28,
  },
  bottomTabBar: {
    backgroundColor: 'transparent',
  },
});

export default Navigation;
