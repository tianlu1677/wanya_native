import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  render() {
    return <View><Text>Recommend</Text></View>
  }
}

export default Recommend;