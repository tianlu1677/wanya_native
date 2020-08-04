import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';


import IconFont from '@/iconfont';

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,      
      loading: false,
      status: 'ok'
    };
  }

  componentDidMount() {
    console.log('xxxx')
    this.setState({
      status: 'good'
    })

    console.log(React.$lodash.chunk(['a', 'b', 'c', 'd'], 2))
    // console.log(React.Helper.getStore('xxxx'))
  }
  render() {
    return <View>
      <Text>消息</Text>
      <Text> {this.state.status}</Text>
      <IconFont name="huati" size={30} color="green" />
    </View>
  }
}

export default Notify;