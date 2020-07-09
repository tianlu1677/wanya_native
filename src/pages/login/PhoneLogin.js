import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input } from 'react-native-elements';
import {storeData} from "../../utils/storage"
import {phoneSignIn} from "../../api/sign_api"

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  handleSubmit = (values) => {
    console.log('values', values)
    phoneSignIn({phone: values.phone, password: values.password}).then((res) => {
      console.log('res', res)
      if(res.status === 200) {
        storeData('auth_token', res.token)
        storeData('account_id', res.id)
        storeData('account_nickname', res.nickname)
      } else {

      }
    })
  }

  render() {
    return <View>
      <Formik
        initialValues={{ password: '123456789', phone: '18612341234' }}
        onSubmit={this.handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Input
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder='手机号'
            />

            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder='密码'
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>

    </View>
  }
}

export default PhoneLogin;