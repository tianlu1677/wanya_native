import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/stores/store';
import CodePush from "react-native-code-push";
import checkHotUpdate from '@/utils/codepush';
import {Text} from 'react-native';
// const emitter = emitt()

import Navigation from './src/navigator/index';
import Helper from './src/utils/helper';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';
import RNBootSplash from 'react-native-bootsplash';
import * as WeChat from 'react-native-wechat-lib';

WeChat.registerApp('wx17b69998e914b8f0', 'https://app.meirixinxue.com/');

const codePushOptions = {
  // 设置检查更新的频率
  // ON_APP_RESUME APP恢复到前台的时候
  // ON_APP_START APP开启的时候
  // MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

// Config.API_URL; // 'https://myapi.com'
// Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
//
// https://github.com/react-native-community/react-native-device-info#installation
import DeviceInfo from 'react-native-device-info';
import ImagePreview from "@/components/ImagePreview";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadSplashImg()
    this.loadNetworkInfo();
    this.loadDeviceInfo();
    this.loginAdmin();

    CodePush.disallowRestart(); // 禁止重启
    checkHotUpdate(CodePush); // 开始检查更新
  }

  loadSplashImg = () => {
    setTimeout(() => {
      RNBootSplash.hide({duration: 10});
    }, 1500)
  }

  loginAdmin = () => {
  };

  loadNetworkInfo = () => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Connection ", state);
    //   console.log("Is connected?", state.isConnected);
    // });
    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
  };

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

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <ImagePreview />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush(codePushOptions)(App);
