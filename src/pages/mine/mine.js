import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

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
    return <View>
      <Text>Mine</Text>
      <Button title={'去登录'} onPress={() => { this.props.navigation.navigate('PhoneLogin') }} />
      <Button title={'视频页面'} onPress={() => { this.props.navigation.navigate('VideoDetail') }} />

    </View>
  }
}

export default Mine;