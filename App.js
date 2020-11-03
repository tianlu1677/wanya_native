import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/stores/store';
import {
  Text,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
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

WeChat.registerApp('wx17b69998e914b8f0', 'https://app.meirixinxue.com/');

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
import Toast from "@/components/Toast"



const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Connection ", state);
  console.log("Is connected?", state.isConnected);
  // Toast.showError( `${state.type}`)
  // Alert.alert(JSON.stringify(state))
});

class App extends Component {
  constructor(props) {
    super(props);

    this.notif = new NotifyService();
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
    this.checkPermission()
    this.loadNetworkInfo();
    // this.loadDeviceInfo();
    // this.loginAdmin();
    // CodePush.disallowRestart(); // 禁止重启
    // checkHotUpdate(CodePush); // 开始检查更新

    Text.defaultProps = Object.assign({}, Text.defaultProps, {
      allowFontScaling: false,
      adjustsFontSizeToFit: true,
      minimumFontScale: scale,
    });
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
      defaultProps: false,
      allowFontScaling: false,
    });
  }

  loadSplashImg = () => {
    setTimeout(() => {
      RNBootSplash.hide({duration: 10});
    }, 1500);
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

      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
        statuses => {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log('Location', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);
          console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
        }
      );
    });
  };

  loginAdmin = () => {};

  loadNetworkInfo = () => {

    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
  };

  componentWillUnmount() {
    unsubscribe();
  }


  loadDeviceInfo = () => {
    DeviceInfo.getApiLevel().then(apiLevel => {
      // console.log('apiLevel', apiLevel);
      // iOS: ?
      // Android: 25
      // Windows: ?
    });

    let bundleId = DeviceInfo.getBundleId();
    // console.log('bundleId', bundleId)
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
            <ImagePreview />
            <ShareItem />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush(codePushOptions)(App);
