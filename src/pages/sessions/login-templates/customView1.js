import React from 'react';
import {StyleSheet, Text, View, Alert, Pressable, Image, TouchableHighlight} from 'react-native';
import FastImg from '@/components/FastImg';
import JVerification from 'jverification-react-native';

export default class CustomView1 extends React.Component {
  createAlert = title =>
    Alert.alert('提示', title, [{text: 'OK', onPress: () => console.log('OK Pressed')}]);

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Pressable>
            <Text style={styles.otherLogin}>其他号码登录</Text>
          </Pressable>

          <View style={styles.thirdLogin}>
            <View style={styles.thirdLogoWraper}>
              <FastImg source={require('../../../assets/login/wechat.png')} style={styles.thirdLogo} />
            </View>
            <View style={styles.thirdLogoWraper}>
              <FastImg source={require('../../../assets/login/qq.png')} style={styles.thirdLogo}/>
            </View>
            <View style={styles.thirdLogoWraper}>
              <FastImg source={require('../../../assets/login/weibo.png')} style={styles.thirdLogo} />
            </View>
            <View style={styles.thirdLogoWraper}>
              <FastImg source={require('../../../assets/login/apple.png')} style={styles.thirdLogo} />
          </View>
          </View>
          {/*<TouchableHighlight*/}
          {/*  onPress={() => {*/}
          {/*    this.createAlert("CustomView1 onClicked")*/}
          {/*    JVerification.dismissLoginPage();*/}
          {/*  }}>*/}
          {/*  <Text>关闭</Text>*/}
          {/*</TouchableHighlight>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 550,
    width: 400,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: '#FFF',
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
  },
  thirdLogoWraper: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  thirdLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  }
});
