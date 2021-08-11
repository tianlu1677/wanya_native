import React from 'react';
import 'react-native-gesture-handler';
import {Linking, Platform, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigationRef} from '@/navigator/root-navigation';
import Helper from '@/utils/helper';
import AnalyticsUtil from '@/utils/umeng_analytics_util';
import DrawerContent from './drawer-content';
import {MainStackScreen, AuthStackScreen} from './stack-screen';

const PERSISTENCE_KEY = 'NAVIGATION_STATE'; // 存储上次打开的位置
const Drawer = createDrawerNavigator();

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

  console.log('login.auth_token', login.auth_token);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
      onStateChange={onStateChangeRecord}>
      {login.auth_token ? (
        <Drawer.Navigator
          overlayColor="rgba(0,0,0,0.3)"
          drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Recommend" component={MainStackScreen} />
        </Drawer.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
