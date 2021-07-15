import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Button, StatusBar, Platform, View, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {jverifyPhone} from '@/api/phone_sign_api';
import {dispatchUpdateSocialAccount} from '@/redux/actions';
import {BaseApiUrl} from '@/utils/config';
import {SCREEN_WIDTH} from '@/utils/navbar';
import Toast from '@/components/Toast';
import JVerification from 'jverification-react-native';
import Loading from '@/components/Loading';
import {debounce, throttle} from 'lodash';

let tgophonetimeout = '';

let toPhoneListen = []

const OneLogin = ({navigation, route}) => {
  const dispatch = useDispatch();

  // const initParams = {
  //   time: 5000,
  //   appKey: '7cd75000d5932000b3d4ca59', //仅iOS
  //   channel: 'release', //仅iOS
  //   // advertisingId: 'advertisingId', //仅iOS
  //   isProduction: true, //仅iOS
  // };

  this.listener = JVerification.addLoginEventListener(async result => {
    console.log('LoginListener:' + JSON.stringify(result));
    jump(result);
    // }, 800);
  });

  const jump = async result => {
    const badCode = [2005, 6001, 6003, -994, -996, -997];
    const code = result.code;
    if (code === 6000) {
      // Toast.showError('请勾选同意协议');
      const res = await jverifyPhone({jverify_phone_token: result.content});
      if (res.error) {
        // Toast.showError(res.error, {});
      } else {
        Toast.hide();
        JVerification.dismissLoginPage();
        dispatch(dispatchUpdateSocialAccount(res.account.token));
      }
    } else if (badCode.includes(code)) {
      goToPhone();
    } else if (code === 6004) {
      tgophonetimeout = setTimeout(() => {
        goToPhone();
      }, 45000);
      toPhoneListen.push(tgophonetimeout);
    } else if (code === 6002) {
      this.listener && this.listener.remove();
    } else if (code === 7) {
      console.log('toast');
      Toast.showError('请勾选同意协议');
    } else if (code === 6) {
      Toast.hide();
    } else if (code === 2) {
      // console.log('tgophonetimeout', toPhoneListen);
      toPhoneListen.forEach((t) => t && clearTimeout(t));
    } else if (code >= 2000 && code <= 2016) {
      goToPhone();
    }
  };

  const goToPhone = (type = 'nav') => {
    JVerification.dismissLoginPage();
    if (type === 'nav') {
      navigation.navigate('LoginPhoneCode');
    } else if (type === 'reset') {
      navigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
    }
  };

  const checkJverify = () => {
    console.log('loadding...')
    try {
      JVerification.checkLoginEnable(result => {
        console.log('checkLoginEnable:' + JSON.stringify(result));
        if (result.enable) {
          console.log('start page');
          setTimeout(() => {
            JVerification.login(true);
          }, 500);
        } else {
          goToPhone('reset');
        }
      });
    } catch (e) {
      console.log('ee', e);
      goToPhone();
    }
  };

  const a = () => {
    console.log('xxxx')
  }


  useFocusEffect(() => {
    console.log('fouce');
    // debounce(a, 300)
    checkJverify();
    return () => {
      // JVerification.dismissLoginPage();
      // console.log('remove ', this.listener)
      //
      // JVerification.removeListener(result => {
      //   console.log('remove LoginListener:' + JSON.stringify(result));
      // })
      //
      // this.listener && this.listener.remove();
      // setCurrentState('');
    };
  }, []);
  return (
    <View style={{backgroundColor: 'black', width: '100%', height: '100%'}}>
      <StatusBar barStyle={'light-content'} translucent />
      <Loading type={'Bounce'} style={{backgroundColor: 'black'}} text={'none'} size={34} />
      {/*<Loading type={'CircleFlip'} style={{backgroundColor: 'black'}} />*/}
      {/*<ImageBackground*/}
      {/*source={require('../../assets/images/social-login.jpg')}*/}
      {/*style={{width: '100%', height: '100%', backgroundColor: 'black'}}*/}
      {/*resizeMode={'cover'}>*/}

      {/*<ThirdLogin />*/}
      {/*<Button*/}
      {/*  title="isInitSuccess"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.isInitSuccess(result => {*/}
      {/*      console.log('isInitSuccess:' + JSON.stringify(result));*/}
      {/*      createAlert('isInitSuccess:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="checkLoginEnable"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.checkLoginEnable(result => {*/}
      {/*      console.log('checkLoginEnable:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="getToken"*/}
      {/*  onPress={() =>*/}
      {/*    JVerification.getToken(5000, result => {*/}
      {/*      console.log('getToken:' + JSON.stringify(result));*/}
      {/*    })*/}
      {/*  }*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="preLogin"*/}
      {/*  onPress={() => {*/}
      {/*    JVerification.clearPreLoginCache();*/}
      {/*    JVerification.preLogin(5000, result => {*/}
      {/*      console.log('preLogin:' + JSON.stringify(result));*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="addLoginCustomConfig"*/}
      {/*  style={{marginTop: 30}}*/}
      {/*  onPress={() => {*/}
      {/*    JVerification.clearPreLoginCache()*/}
      {/*    if (Platform.OS === 'android') {*/}
      {/*      JVerification.addLoginCustomConfig(customUIWithConfigAndroid, customViewParams);*/}
      {/*    } else {*/}
      {/*      JVerification.addLoginCustomConfig(customUIWithConfigiOS, customViewParams);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<Button title="login" onPress={() => JVerification.login(false)} />*/}

      {/*<Button*/}
      {/*  title="自定义弹窗授权页"*/}
      {/*  onPress={() => {*/}
      {/*    if (Platform.OS == 'android') {*/}
      {/*      JVerification.addLoginCustomConfig(androidDialogConfig, customViewParams);*/}
      {/*    } else {*/}
      {/*      JVerification.addLoginCustomConfig(iosDialogConfig, customViewParams);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<View style={styles.privateText} allowFontScaling={false} adjustsFontSizeToFit={false}>*/}
      {/*  /!*<Pressable*!/*/}
      {/*  /!*  style={styles.ruleWrapper}*!/*/}
      {/*  /!*  hitSlop={{left: 10, right: 10, top: 30}}*!/*/}
      {/*  /!*  onPress={() => {*!/*/}
      {/*  /!*    if (!IsIos) {*!/*/}
      {/*  /!*      setCanShowAgree(!canShowAgree);*!/*/}
      {/*  /!*    }*!/*/}
      {/*  /!*  }}>*!/*/}
      {/*  /!*  <View style={styles.checkbox}>*!/*/}
      {/*  /!*    {!canShowAgree && <IconFont name="yixuan" size={16} color="red" />}*!/*/}
      {/*  /!*  </View>*!/*/}
      {/*  /!*</Pressable>*!/*/}

      {/*  <Text style={styles.textContent}>我已阅读并同意</Text>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => {*/}
      {/*      goPages('user');*/}
      {/*    }}*/}
      {/*    hitSlop={{top: 10, bottom: 10}}>*/}
      {/*    <Text style={styles.textContent}>《用户协议》</Text>*/}
      {/*  </Pressable>*/}
      {/*  <Text style={styles.textContent}>和</Text>*/}
      {/*  <Pressable*/}
      {/*    onPress={() => {*/}
      {/*      goPages('private');*/}
      {/*    }}*/}
      {/*    hitSlop={{top: 10, bottom: 10}}>*/}
      {/*    <Text style={styles.textContent}>《隐私政策》</Text>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
      {/*</ImageBackground>*/}
    </View>
  );
};

export default OneLogin;
