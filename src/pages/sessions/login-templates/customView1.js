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
          JVerification.dismissLoginPage();
          RootNavigation.reset({index: 0, routes: [{name: 'LoginPhoneCode'}]});
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
    marginTop: 30,
    paddingBottom: 100,
    paddingLeft: 56,
    paddingRight: 80,
    backgroundColor: 'black',
  },
});

export default CustomView1;
