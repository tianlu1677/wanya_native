import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/stores/store';
import {Text, TextInput, Dimensions, Modal, Alert, View} from 'react-native';
import CodePush from 'react-native-code-push';
import {
  requestMultiple,
  checkMultiple,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import Navigation from './src/navigator/index';
import Helper from './src/utils/helper';
import NetInfo from '@react-native-community/netinfo';
import RNBootSplash from 'react-native-bootsplash';
import * as WeChat from 'react-native-wechat-lib';
import NotifyService from '@/notifyservice/NotifyService';
import FastImage from 'react-native-fast-image';
import {ImageList} from '@/utils/default-image';
import {prosettings} from '@/api/settings_api';
import {syncDeviceToken, callbackNotification} from '@/api/app_device_api';
import NetworkErrorModal from '@/components/NetworkErrorModal';
import PushUtil from '@/utils/umeng_push_util'

import * as RootNavigation from '@/navigator/root-navigation';

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
import DeviceInfo from 'react-native-device-info';
import ImagePreview from '@/components/ImagePreview';
import ShareItem from '@/components/ShareItem';
import Toast from '@/components/Toast';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netInfoErr: false,
    };
  }

  componentDidMount() {
    let scale = Dimensions.get('window').width / 375;
    if (scale > 1) {
      scale = 1.08;
    }
    console.log('scale', scale);
    this.loadSplashImg();
    this.loadImgList();
    this.loadSettings();
    this.checkPermission();
    this.loadNetworkInfo();
    this.notif = new NotifyService(this.onRegister, this.onNotification);
    // this.loadDeviceInfo();
    // this.loginAdmin();
    // CodePush.disallowRestart(); // 禁止重启
    // checkHotUpdate(CodePush); // 开始检查更新

    Text.defaultProps = Object.assign({}, Text.defaultProps, {
      allowFontScaling: false,
      adjustsFontSizeToFit: true,
      minimumFontScale: scale,
    });
    Text.defaultProps.sytle = { 'color': 'black'}
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
      defaultProps: false,
      allowFontScaling: false,
    });

    // PushUtil.addTag('normal',(code,remain) =>{
    //   console.log('code1', code, remain)
    //   // Alert.alert(`${code} ${remain}`)
    // })
    // PushUtil.addAlias('dddd', 'login_user',(code) =>{
    //   console.log('alias', code)      
    // })
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
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(statuses => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);

      requestMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]).then(statuses => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
        console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
      });
    });

    checkMultiple([PERMISSIONS.ANDROID.CAMERA]).then(statuses => {
      // console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      // console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);

      requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
      ]).then(statuses => {
        console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        // console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
        // console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
      });
    });
  };

  // 通知相关内容
  onRegister = response => {
    console.log('onRegister', response.token);
    const data = {device_token: response.token, platform: response.os}
    syncDeviceToken(data);
  };

  // 接受到通知
  // NotificationHandler: {"badge": undefined, "data": {"TopicDetail": "1", "actionIdentifier": "com.apple.UNNotificationDefaultActionIdentifier", "aps": {"alert": "哈哈哈", "badge": 1, "mutable-content": 1, "sound": "default", "url": "https://baidu.com"}, "d": "uukbzq5160490651243410", "p": 0, "screen": "AccountDetail", "userInteraction": 1}, "finish": [Function finish], "foreground": true, "id": undefined, "message": "哈哈哈", "soundName": undefined, "title": null, "userInteraction": true}
  async onNotification(notification) {
    try {
      console.log('onNotification:', notification);
      const auth_token = await Helper.getData('auth_token');
      // if (!auth_token) {
      //   return;
      // }
      const data = notification.data;
      const params = data.params;
      const screen = data.screen;
      if (!params || !screen) {
        return;
      }
      const screen_params = queryString.parse(data.params, {parseNumbers: true});
      // debugger
      console.log('params', params, screen);
      RootNavigation.navigate(data.screen, screen_params);
    } catch (e) {
      console.log('error', e);      
    }
    // 已登录的情况下
    // 未登录的情况下
    // foreground 已在前台的情况下
    // 不在前台运行的情况下
  }

  loadNetworkInfo = () => {
    this.networdunsubscribe = NetInfo.addEventListener(state => {
      // console.log('state', state)
      if(this.state.netInfoErr === !state.isConnected ) {
        return
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

  loadDeviceInfo = () => {
    DeviceInfo.getApiLevel().then(apiLevel => {
      // console.log('apiLevel', apiLevel);
      // iOS: ?
      // Android: 25
      // Windows: ?
    });

    let bundleId = DeviceInfo.getBundleId();
  };

  loadImgList = () => {
    // FastImage.preload(ImageList.map((u) => ({uri: u})))
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
            <ShareItem />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush(codePushOptions)(App);
