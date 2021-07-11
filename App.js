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
import JVerification from 'jverification-react-native';

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
import {SCREEN_WIDTH} from "@/utils/navbar"
import {BaseApiUrl} from "@/utils/config"

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

    // this.saveToken(); //保存token
    this.getIndexTabData(); //获取首页频道信息
    // console.log('scale', scale);
    this.initJverify();

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
    }, 500);
  };

  loadSettings = () => {
    prosettings().then(res => {
      // console.log('re', JSON.stringify(res))
      Helper.setData('settings', JSON.stringify(res));
    });
  };

  //初始化jverify
  initJverify = () => {
    const initParams = {
      time: 5000,
      appKey: '7cd75000d5932000b3d4ca59', //仅iOS
      channel: 'release', //仅iOS
      // advertisingId: 'advertisingId', //仅iOS
      isProduction: true, //仅iOS
    };
    JVerification.init(initParams, result => {
      console.log('JVerification init', result);
      if(result.code !== 8000) {
        return;
      }
      const customUIWithConfigiOS = {
        logoHidden: true,
        statusBarHidden: true,
        statusBarMode: 'dark',
        showWindow: false,
        navReturnHidden: false,
        navHidden: true,
        backgroundImage: 'bg.png',
        //logo
        // logoImage: 'umcsdk_mobile_logo',
        // logoConstraints: [0, -200, 60, 60],
        //number
        numberConstraints: [0, 30, 200, 14],
        numberSize: 18,
        numberColor: 16777215,
        //slogn
        sloganHidden: true,
        // sloganConstraints: [0, 40, 200, 14],
        //登录按钮
        loginBtnNormalImage: 'loginBtn.png',
        loginBtnSelectedImage: 'loginBtn.png',
        logBtnConstraints: [0, 80, 265, 45],
        loginBtnText: '',
        loginBtnTextColor: 16777215, // 白色
        privacyConstraints: [0, 350, 300, 60],
        checkViewConstraints: [-108, 350, 10, 10],
        unAgreePrivacyCallBack: true,
        privacyCheckboxHidden: true,
        privacyCheckEnable: true,
        privacyCheckboxSize: 20,
        privacyOne: ['用户协议', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
        privacyTwo: ['隐私政策', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
        privacyColor: [12434877, 12434877], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
        privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
        privacyTextSize: 10, //隐私条款文字字体大小
        privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
        privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示

        privacyWebNavColor: -16777216, //协议页导航栏背景颜色
        privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
        privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
        privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
        privacyWebNavReturnImage: 'close',
      };
      const customUIWithConfigAndroid = {
        backgroundImage: 'bg', //背景图

        statusBarHidden: true, //状态栏是否隐藏
        statusBarMode: 'light', //状态栏模式 light,dark

        navHidden: true, //导航栏是否隐藏
        navColor: -16777216, //导航栏颜色

        // navTitle: 'RN-JVerification', //导航栏标题
        // navTitleSize: 16, //导航栏标题文字字体大小(单位:sp）
        // navTitleColor: -1, //导航栏标题文字颜色

        // navReturnHidden: true, //导航栏返回按钮是否隐藏
        navReturnImage: 'close', //导航栏左侧返回按钮图标
        //为保障显示效果，请同时设置x,y,w,h
        navReturnX: 5, //导航栏左侧返回按钮图标距屏幕上端偏移（仅Android)
        navReturnY: 5, //导航栏左侧返回按钮图标距屏幕左侧偏移（仅Android)
        navReturnW: 25, //导航栏左侧返回按钮图标宽度（仅Android)
        navReturnH: 25, //导航栏左侧返回按钮图标高度（仅Android)

        logoHidden: true, //logo是否隐藏
        // logoImage: 'umcsdk_mobile_logo', //logo(android默认为应用图标;)
        //为保障显示效果，请同时设置x,y,w,h
        // logoX: 50,                              //logo相对于屏幕左边x轴偏移
        // logoY: 50,                              //logo相对于标题栏下边缘y偏移
        // logoW: 100,                             //logo宽
        // logoH: 100,                              //logo高

        numberSize: 18, //手机号码字体大小（单位:sp）
        numberColor: 16777215, //手机号码字体颜色
        //为保障显示效果，请同时设置x,y,w,h
        // numberX: 50,                            //号码栏相对于屏幕左边x轴偏移
        // numberY: 100,                           //号码栏相对于标题栏下边缘y偏移
        // numberW: 250,                           //号码栏宽度
        // numberH: 25,                            //号码栏高度

        sloganHidden: true, //slogan是否隐藏
        sloganTextSize: 16, //slogan字体大小
        sloganTextColor: -16777216, //slogan文字颜色

        //为保障显示效果，请同时设置x,y,w,h
        // sloganX: 50,                            //slogan相对于屏幕左边x轴偏移
        // sloganY: 150,                           //slogan相对于标题栏下边缘y偏移

        loginBtnText: '', //登录按钮文字
        loginBtnTextSize: 16, //登录按钮字体大小
        loginBtnTextColor: -16777216, //登录按钮文字颜色

        loginBtnImageSelector: 'login_btn_selector', //登录按钮selector选择样式 （仅android）
        // loginBtnNormalImage: 'login_btn_normal', //登录按钮正常图片 （仅ios,三个同时设置生效）
        // loginBtnDisabledImage: 'login_btn_press', //登录按钮失效图片  (仅ios,三个同时设置生效）
        // loginBtnSelectedImage: 'login_btn_unable', //登录按钮按下图片  (仅ios,三个同时设置生效）
        //为保障显示效果，请同时设置x,y,w,h
        // 0, 80, 265, 45
        // loginBtnOffsetX: 0,                          //登录按钮相对于屏幕左边x轴偏移
        loginBtnOffsetY: 110,                         //登录按钮相对于标题栏下边缘y偏移
        loginBtnWidth: 60,                         //登录按钮宽度
        loginBtnHeight: 10,//180/(1062/70),                          //登录按钮高度

        privacyOne: ['《用户协议》', `${BaseApiUrl}/home/user_agreement`], //隐私条款一（显示名称和url，请严格按照格式）
        privacyTwo: ['《隐私政策》', `${BaseApiUrl}/home/private_policy`], //隐私条款二（显示名称和url，请严格按照格式）
        privacyColor: [0xff00f000, 0xff000000], //隐私条款颜色 （显示名称和url的颜色，请严格按照格式）
        privacyText: ['登录即同意', '和', '、', '并使用本机号码登录'], //隐私条款名称外的文字
        privacyTextSize: 8, //隐私条款文字字体大小
        privacyTextGravityMode: 'center', //隐私条款文本对齐方式，目前仅支持 left、center
        privacyBookSymbolEnable: true, //隐私条款是否显示书名号，默认不显示
        //为保障显示效果，请同时设置x,y,w,h
        // privacyX: 20,                                             //隐私条款相对于屏幕左边x轴偏移
        privacyY: 30,                                             //隐私条款相对于授权页面底部下边缘y偏移
        privacyW: 200,                                            //隐私条款宽度
        privacyH: 100,                                            //隐私条款高度

        privacyCheckboxHidden: true, //checkBox是否隐藏，默认不隐藏
        privacyCheckEnable: true, //checkBox默认状态 默认:NO
        privacyCheckedImage: 'checkbox_selected', //checkBox选中时图片
        privacyUncheckedImage: 'checkbox_unSelected', //checkBox未选中时图片
        privacyCheckboxSize: 10, //设置隐私条款checkbox尺寸 默认是10
        unAgreePrivacyHintToast: true,

        privacyWebNavColor: -16777216, //协议页导航栏背景颜色
        privacyWebNavTitle: '服务条款', //协议页导航栏标题（仅iOS）
        privacyWebNavTitleSize: 16, //协议页导航栏标题字体大小
        privacyWebNavTitleColor: -1, //协议页导航栏标题字体颜色
        privacyWebNavReturnImage: 'close', //协议页导航栏返回按钮图片
      };

      const customViewParams = [
        {customViewName: 'jverify_bottom_view', customViewPoint: [0, 500, SCREEN_WIDTH, 120]},
      ];
      const customViewParamsAdnroid = [
        {customViewName: 'jverify_bottom_view_android', customViewPoint: [0, 440, SCREEN_WIDTH, 80]},
      ];

      // JVerification.preLogin(3000);
      console.log('init result', result)
      if (Platform.OS === 'android') {
        console.log('android')
        JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParamsAdnroid);
      } else {
        JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);
      }
    })
  }

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
