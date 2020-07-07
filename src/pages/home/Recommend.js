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

import { getHotTopics } from '../../api/home_api'

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {

  }


  fetchData = async () => {
    await getHotTopics()

  }

  componentDidUpdate() {

  }
  render() {
    return <View><Text>

      Recommend11
    </Text>
      <Button
        title={"点击"}
        onPress={() => this.fetchData()}
      >
        ssss
      </Button>
    </View>
  }
}

export default Recommend;