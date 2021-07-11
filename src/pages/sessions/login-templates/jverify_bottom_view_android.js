import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';
import * as RootNavigation from '@/navigator/root-navigation';
import ThirdLogin from '@/pages/sessions/login-templates/third_login';

const JveryfyBottomViewAndroid = ({}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          console.log('click');
          JVerification.dismissLoginPage();
          RootNavigation.navigate('LoginPhoneCode');
        }}
        hitSlop={{top: 10, bottom: 20, left: 10, right: 10}}
      >
        {/*<Text style={styles.otherLogin}>其他号码登录</Text>*/}
      </Pressable>

      <Text style={styles.otherLogin}>其他号码登录</Text>

      {/*<View style={{height: 30}} />*/}
      <View style={styles.thirdLogin}>
        <ThirdLogin />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // width: 400,
    // height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'black',
  },
  otherLogin: {
    color: '#bdbdbd',
    fontSize: 12,
    // backgroundColor: 'red',
    paddingTop: 5,
    paddingBottom: 5,
    // marginBottom: 50,
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingTop: 60,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: 'black',
  },
});

export default JveryfyBottomViewAndroid;
