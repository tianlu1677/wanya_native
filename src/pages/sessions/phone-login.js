import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, TextInput, Text, Button} from 'react-native';

import {Formik, Form, Field, ErrorMessage} from 'formik';

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false
    };
  }

  handleSubmit = () => {
    console.log('login');
  };

  changePhone = (event) => {
    console.log('event', event)
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.phoneContainer}>
            <Text style={styles.phoneTitle}>绑定手机号</Text>

            <View style={styles.inputWrapContainer}>
              <View style={styles.inputContainer}>
                <Text style={{}}>+ 86</Text>
                <TextInput
                  autoFocus
                  autoComplete={"tel"}
                  caretHidden
                  keyboardType={"numeric"}
                  maxLength={11}
                  onChangeText={this.changePhone}
                  placeholder={'输入手机号'}
                  placeholderTextColor={'red'}
                  style={{}} />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  autoComplete={"tel"}
                  caretHidden
                  keyboardType={"numeric"}
                  maxLength={6}
                  onChangeText={this.changePhone}
                  placeholder={'输入验证码'}
                  placeholderTextColor={'red'}
                  style={{}} />

                <Text>获取验证码</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: 'white',
    paddingLeft: 25,
    paddingTop: 30
  },

  inputWrapContainer: {
    paddingTop: 121,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 30
  },
  phoneTitle: {
    fontSize: 27,
    // color: 'white',
    fontWeight: '600'
  }
});

export default PhoneLogin;
