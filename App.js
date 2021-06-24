import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, connect} from 'react-redux';
import {store, persistor} from '@/redux/stores/store';
import {Text, TextInput, Platform, Dimensions, Alert} from 'react-native';
import CodePush from 'react-native-code-push';
import {
  requestMultiple,
  checkMultiple,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {ModalPortal} from 'react-native-modals';
import Navigation from './src/navigator/index';
import ShareMultiModal from '@/components/ShareMultiModal';
import Helper from './src/utils/helper';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import * as WeChat from 'react-native-wechat-lib';
import FastImage from 'react-native-fast-image';
import {ImageList} from '@/utils/default-image';
import {prosettings} from '@/api/settings_api';
import {syncDeviceToken, callbackNotification} from '@/api/app_device_api';
import NetworkErrorModal from '@/components/NetworkErrorModal';
import {init, Geolocation} from 'react-native-amap-geolocation';
import * as RootNavigation from '@/navigator/root-navigation';
import * as action from '@/redux/constants';
import {getChannels, getChannelPosts} from '@/api/home_api';
import JPush from 'jpush-react-native';
WeChat.registerApp('wx17b69998e914b8f0', 'https://app.meirixinxue.com/');

const queryString = require('query-string');
const codePushOptions = {
  // 设置检查更新的频率
  // ON_APP_RESUME APP恢复到前台的时候
  // ON_APP_START APP开启的时候
  // MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};
// https://github.com/react-native-community/react-native-device-info#installation
import ImagePreview from '@/components/ImagePreview';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netInfoErr: false,
    };
  }

  async componentDidMount() {
    await init({
      ios: '6da6626cf6588fb6e3052deff1e8d4e9',
      android: '648f6e4ce8f5b83b30e2eabcac060eee',
    });

    let scale = Dimensions.get('window').width / 375;
    if (scale > 1) {
      scale = 1.08;
    }

    this.saveToken(); //保存token
    this.getIndexTabData(); //获取首页频道信息
    // console.log('scale', scale);

    this.loadSplashImg();
    this.loadSettings();
    this.checkPermission();
    this.loadNetworkInfo();
    this.jpush_notice();
    // this.loginAdmin();
    // CodePush.disallowRestart(); // 禁止重启
    // checkHotUpdate(CodePush); // 开始检查更新

    Text.defaultProps = Object.assign({}, Text.defaultProps, {
      allowFontScaling: false,
      adjustsFontSizeToFit: true,
      minimumFontScale: scale,
    });
    Text.defaultProps.sytle = {color: 'black'};
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
      defaultProps: false,
      allowFontScaling: false,
      textBreakStrategy: 'simple',
    });
  }

  loadSplashImg = () => {
    setTimeout(() => {
      RNBootSplash.hide({duration: 10});
    }, 1000);
  };

  loadSettings = () => {
    prosettings().then(res => {
      // console.log('re', JSON.stringify(res))
      Helper.setData('settings', JSON.stringify(res));
    });
  };

  checkPermission = () => {
    checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(statuses => {
      // console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      // console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);

      requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
        statuses => {
          // console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          // console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
        }
      );
    });
  };

  notificationListener = async notification => {
    //notificationListener result {"badge": "1", "content": "顽鸦", "messageID": "58546911656695959", "notificationEventType": "notificationArrived", "ring": "default", "title": "顽鸦"}
    // notificationListener result {"badge": "1", "content": "顽鸦", "messageID": "54043311975022224", "notificationEventType": "notificationOpened", "ring": "default", "title": "顽鸦"}
    // {"badge": "1", "content": "顽鸦", "extras": {"params": "topicId=1", "screen": "TopicDetail"}, "messageID": "20266319981952208", "notificationEventType": "notificationOpened", "ring": "default", "title": "顽鸦"}
    try {
      console.log('onNotification:', notification);
      // Alert.alert(JSON.stringify(notification))
      if (notification.notificationEventType === 'notificationOpened') {
        const auth_token = await Helper.getData('auth_token');
        if (!auth_token || !notification.extras) {
          return;
        }
        let screen = '';
        let params = '';
        const extras = notification.extras;
        if (!extras) {
          return;
        }
        params = extras.params;
        screen = extras.screen;
        if (!params || !screen) {
          return;
        }
        const screen_params = queryString.parse(params, {parseNumbers: true});
        setTimeout(() => {
          RootNavigation.push(screen, screen_params);
        }, 1500);
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  localNotificationListener = result => {
    console.log('localNotificationListener result', result);
  };

  // 极光推送
  jpush_notice = async () => {
    console.log('jpush....');
    await JPush.init();
    JPush.setLoggerEnable(true);
    JPush.initCrashHandler();
    // JPush.addConnectEventListener((result) => {
    //   console.log('addCollection')
    //   console.log('addCollection', JSON.stringify(result))
    // })
    //
    JPush.getRegistrationID(this.onRegister);
    JPush.addNotificationListener(this.notificationListener);
    // JPush.addCustomMessagegListener(this.customMessageListener);
    // await JPush.init();
  };
  // 通知相关内容
  onRegister = async response => {
    console.log('onRegister', response);
    // const data = {register_token: response.registerID, platform: Platform.OS};
    await Helper.setData('registerId', response.registerID);
    // syncDeviceToken(data);
  };

  customMessageListener = result => {
    console.log('customMessageListener result', result);
  };

  loadNetworkInfo = async () => {
    this.networdunsubscribe = NetInfo.addEventListener(state => {
      // console.log('state', state)
      if (this.state.netInfoErr === !state.isConnected) {
        return;
      }
      if (state.isConnected) {
        this.setState({
          netInfoErr: false,
        });
      } else {
        this.setState({
          netInfoErr: true,
        });
      }
    });
  };

  componentWillUnmount() {
    this.networdunsubscribe && this.networdunsubscribe();
  }

  saveToken = async () => {
    const auth_token = await Helper.getData('auth_token');
    store.dispatch({type: action.ACCOUNT_SAVE_TOKEN, value: auth_token});
  };

  // 提前获取基本数据
  getIndexTabData = async () => {
    const res = await getChannels();
    store.dispatch({type: action.SAVE_CHANNELS, value: res.data.channels});

    // 打开app 首页关注 分享设置为true
    store.dispatch({type: action.CHANGE_SHARE_STATUS, value: true});
    store.dispatch({type: action.CHANGE_SHARE_NEARBY_STATUS, value: true});
  };

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <NetworkErrorModal
              visible={this.state.netInfoErr}
              handleCancel={() => {
                this.setState({netInfoErr: false});
              }}
            />
            <ImagePreview />
            <ShareMultiModal />
            <ModalPortal />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush(codePushOptions)(App);
