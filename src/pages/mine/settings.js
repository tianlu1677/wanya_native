import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import {clearAllData} from "../../utils/storage"

class MineSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      coin_data: [],
      loading: false,
    };
  }

  clearAllCache = () => {
    clearAllData()
  }

  render() {
    return <View>
      <Text>MineSettings</Text>
      <Button title={"清除缓存"}
              onPress={this.clearAllCache}

      >
      </Button>

    </View>
  }
}

export default MineSettings;