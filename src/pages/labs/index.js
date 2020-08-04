import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

class LabIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return <View>
      <Text>实验室主页</Text>
      <Button title={'tabindex'} onPress={() => { this.props.navigation.navigate('LabTabIndex') }} />      
    </View>
  }
}

export default LabIndex;