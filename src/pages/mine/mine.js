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
      <Button title={"跳转到节点页面"}
              onPress={() => {this.props.navigation.navigate('NodeDetail')}}

      >

      </Button>

    </View>
  }
}

export default Mine;