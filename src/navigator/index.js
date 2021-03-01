import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Linking,
  Platform,
  View,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator, BottomTabBar} from '@react-navigation/bottom-tabs';
import {navigationRef} from '@/navigator/root-navigation';
import AdminPhoneLogin from '@/pages/login/AdminPhoneLogin';
import {BottomModal, BlurView} from '@/components/NodeComponents';
import FastImg from '@/components/FastImg';
import Helper from '@/utils/helper';
import {RFValue} from '@/utils/response-fontsize';
import AnalyticsUtil from '@/utils/umeng_analytics_util';
import IconFont from '@/iconfont';
import {routers} from './config'; //router 配置

import Recommend from '@/pages/home/recommend';
import NewTopic from '@/pages/topics/new-topic';
import MineDetail from '@/pages/mine/mine-detail';

//登录页面
import SocialLogin from '@/pages/sessions/social-login';
import PhoneLogin from '@/pages/sessions/phone-login';
import InviteLogin from '@/pages/sessions/invite-login';
import PasswordLogin from '@/pages/sessions/password-login';
import WebView from '@/pages/webview/webview';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE'; // 存储上次打开的位置
const {width} = Dimensions.get('window');

const TabBar = props => (
  <BlurView
    style={styles.blurView}
    blurType="light"
    blurAmount={80}
    reducedTransparencyFallbackColor="#white">
    <BottomTabBar {...props} />
  </BlurView>
);

const PublishModal = props => {
  const {navigation, visible, onCancel} = props;
  const imgStyle = {width: '100%', height: ((width - 60) * 260) / 1260};

  return (
    <BottomModal
      visible={visible}
      height={0.31}
      cancleClick={onCancel}
      contentWrapStyle={{
        backgroundColor: '#000000',
        paddingTop: RFValue(25),
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
      }}>
      <Pressable
        style={imgStyle}
        onPress={() => {
          onCancel();
          navigation.navigate('NewTheory');
        }}>
        <FastImg source={require('../assets/images/add-theory.png')} style={imgStyle} />
      </Pressable>
      <Pressable
        style={{...imgStyle, marginTop: RFValue(15)}}
        onPress={() => {
          onCancel();
          navigation.navigate('NewTopic');
        }}>
        <FastImg source={require('../assets/images/add-topic.png')} style={imgStyle} />
      </Pressable>
      <Pressable onPress={onCancel}>
        <IconFont name="close" size={22} color="#fff" style={{marginTop: RFValue(25)}} />
      </Pressable>
    </BottomModal>
  );
};

function HomeTabList(props) {
  const [visible, setVisible] = useState(false);
  const icon_list = {
    focused_Recommend: 'home-recommend',
    unfocused_Recommend: 'home-recommend-outline',
    unfocused_MineDetail: 'home-mine-outline',
    focused_MineDetail: 'home-mine',
    unfocused_GoNewTopic: 'home-newtopic',
  };

  return (
    <>
      <PublishModal {...props} visible={visible} onCancel={() => setVisible(false)} />
      <Tab.Navigator
        tabBar={TabBar}
        initialRouteName={'Recommend'}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            const icon_name = `${focused ? 'focused' : 'unfocused'}_${route.name}`;
            return <IconFont name={icon_list[icon_name]} size={22} color="black" />;
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
            backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white',
            borderTopWidth: 0,
            height: 55,
            borderRadius: 30,
          },
        }}>
        <Tab.Screen key={'Recommend'} name={'Recommend'} component={Recommend} options={{}} />
        <Tab.Screen
          key={'GoNewTopic'}
          name={'GoNewTopic'}
          component={NewTopic}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              setVisible(true);
            },
          })}
          options={{
            gestureEnabled: false,
          }}
        />
        <Tab.Screen key={'MineDetail'} name={'MineDetail'} component={MineDetail} options={{}} />
      </Tab.Navigator>
    </>
  );
}

const Render = props => {
  return <HomeTabList {...props} />;
};

function MainStackList() {
  return (
    <MainStack.Navigator
      initialRouteName="Recommend"
      headerMode="screen"
      screenOptions={({route}) => ({
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
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        headerBackImage: () => (
          <View style={{flex: 1, paddingRight: 20}}>
            <FastImg
              source={require('../assets/images/back.png')}
              style={{width: 9, height: 15, paddingLeft: 0}}
            />
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
          <FastImg
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

  const routeNameRef = React.useRef();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await Helper.getData(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } catch (e) {
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

  const onStateChangeRecord = state => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      AnalyticsUtil.onPageStart(currentRouteName);
    }
    AnalyticsUtil.onPageEnd(currentRouteName);
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
      onStateChange={state => {
        onStateChangeRecord(state);
      }}
      // initialState={initialState}
      onStateChange={state => Helper.setData(PERSISTENCE_KEY, JSON.stringify(state))}>
      <>{!login.auth_token ? AuthStackList() : MainStackList()}</>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 10,
    left: '23%', // 23%
    right: '23%',
    height: 55,
    borderRadius: 28,
    zIndex: 1000,
  },
});

export default Navigation;
