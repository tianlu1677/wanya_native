import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import Helper from '../../utils/helper';

import {connect} from 'react-redux';

// import {dispatchSetAuthToken} from '@/redux/actions';
//
// @connect(state => state.login, {
//   dispatchSetAuthToken,
// })
class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
    this.auth_token = '';
  }

  componentDidMount() {
    this.auth_token = Helper.getData('auth_token');
  }

  componentDidUpdate() {
    this.auth_token = Helper.getData('auth_token');
  }

  clearAllCatch = async () => {
    Helper.clearAllData();
    // this.props.dispatchSetAuthToken('');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'AdminPhoneLogin'}],
    });
  };

  render() {
    return (
      <View style={{paddingTop: 100}}>
        <Text>{this.auth_token}</Text>
        <Text>Mine</Text>
        <Button
          title={'去登录'}
          onPress={() => {
            this.props.navigation.navigate('AdminPhoneLogin');
          }}
        />
        <Button
          title={'清除所有缓存'}
          onPress={() => {
            this.clearAllCatch;
          }}
        />
        <Button
          title={'视频页面'}
          onPress={() => {
            this.props.navigation.navigate('VideoDetail');
          }}
        />
        <Button
          title={'去上传'}
          onPress={() => {
            this.props.navigation.navigate('NewTopic');
          }}
        />

        <Button
          title={'去话题页'}
          onPress={() => {
            this.props.navigation.navigate('HashtagDetail', {hashtag: '滑板'});
          }}
        />

        <Button
          title={'去实验室页面'}
          onPress={() => {
            this.props.navigation.navigate('LabIndex');
          }}
        />
        <Button
          title={'微信登录'}
          onPress={() => {
            this.props.navigation.navigate('SocialLogin');
          }}
        />
        <Button
          title={'去我的邀请'}
          onPress={() => {
            this.props.navigation.navigate('InviteDetail');
          }}
        />
        <Button
          title={'去我的设置'}
          onPress={() => {
            this.props.navigation.navigate('Settings');
          }}
        />
      </View>
    );
  }
}

export default Mine;
