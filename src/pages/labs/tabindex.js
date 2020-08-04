import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

class TabIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return <View>
      <Text>标签页面</Text>
     {/* <Button title={'去登录'} onPress={() => { this.props.navigation.navigate('PhoneLogin') }} />
      <Button title={'视频页面'} onPress={() => { this.props.navigation.navigate('VideoDetail') }} />
      <Button title={'去上传'} onPress={() => { this.props.navigation.navigate('NewTopic') }} />*/}

    </View>
  }
}

export default TabIndex;