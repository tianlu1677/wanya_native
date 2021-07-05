import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';
import * as RootNavigation from '@/navigator/root-navigation';
import ThirdLogin from '@/pages/sessions/login-templates/third_login';

const CustomView1 = ({}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          RootNavigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
          JVerification.dismissLoginPage();
          console.log('click')
        }}>
        <Text style={styles.otherLogin}>其他号码登录</Text>
      </Pressable>
      <View style={styles.thirdLogin}>
        <ThirdLogin />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
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
    // backgroundColor: 'red',
    paddingTop: 5,
    paddingBottom: 5,
  },
  thirdLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    paddingTop: 60,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: 'black',
  },
});

export default CustomView1;
