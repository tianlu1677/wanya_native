import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  render() {
    return (
      <View>
        <Text>Mine</Text>
        <Button
          title={'去登录'}
          onPress={() => {
            this.props.navigation.navigate('AdminPhoneLogin');
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
      </View>
    );
  }
}

export default Mine;
