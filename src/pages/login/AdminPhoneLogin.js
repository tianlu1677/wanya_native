import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, Button} from 'react-native';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Toast from 'react-native-root-toast';
import {clearAllData, storeData, getData} from '../../utils/storage';
import {Input} from 'react-native-elements';
import {phoneSignIn} from '../../api/sign_api';

import {connect, useSelector} from 'react-redux';

import {
  dispatchSetAuthToken,
  dispatchCurrentAccount
} from '@/redux/actions';

@connect(state => state.login, {
  dispatchSetAuthToken,
  dispatchCurrentAccount
})
class AdminPhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = async values => {
    // console.log('values', values)
    // console.log(await React.$Store.getData('auth_token'))

    phoneSignIn({phone: values.phone, password: values.password}).then(async res => {
      console.log('res', res);
      if (res.status === 200) {
        await storeData('auth_token', res.token);
        await storeData('account_id', res.id.toString());
        storeData('account_nickname', res.nickname);
        storeData('account_avatar_url', res.avatar_url);
        this.props.dispatchSetAuthToken(res.token);
        this.props.dispatchCurrentAccount()
        let toast = Toast.show('登录成功', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        // let data = await getData('auth_token');
        // console.log('auth_token', data);
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Recommend'}],
          });
      } else {
        let toast = Toast.show('用户名或者密码错误', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    });
  };

  render() {
    return (
      <View style={{display: 'flex', justifyContent: 'center', paddingTop: 100}}>
        <Formik
          initialValues={{password: '123456789', phone: '18612341234'}}
          onSubmit={this.handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <Input
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                placeholder="手机号"
              />

              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="密码"
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default AdminPhoneLogin;
