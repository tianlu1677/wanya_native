import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';
import * as RootNavigation from '@/navigator/root-navigation';

const customView1 = ({}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log('xxxx');
          JVerification.dismissLoginPage();
          RootNavigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
          console.log('xxxx');
        }}>
        <Text style={styles.otherLogin}>其他号码登录</Text>
      </Pressable>

      <View style={styles.thirdLogin}>
        <Pressable
          style={styles.thirdLogoWraper}
          onPress={() => {
            console.log('xxx');
          }}>
          <FastImg source={require('../../../assets/login/wechat.png')} style={styles.thirdLogo} />
        </Pressable>
        <View style={styles.thirdLogoWraper}>
          <FastImg source={require('../../../assets/login/qq.png')} style={styles.thirdLogo} />
        </View>
        <View style={styles.thirdLogoWraper}>
          <FastImg source={require('../../../assets/login/weibo.png')} style={styles.thirdLogo} />
        </View>
        <View style={styles.thirdLogoWraper}>
          <FastImg source={require('../../../assets/login/apple.png')} style={styles.thirdLogo} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 550,
    // width: 400,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'black',
  },
  otherLogin: {
    color: '#bdbdbd',
    fontSize: 12,
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 60,
    paddingLeft: 56,
    paddingRight: 56,
    backgroundColor: 'black'
  },
  thirdLogoWraper: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: 'black'
  },
  thirdLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
});

export default customView1;
