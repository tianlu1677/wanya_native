import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Image } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';

class VideoDetail extends Component {
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
      <Text>VideoDetail</Text>
    </View>
  }
}

export default VideoDetail;