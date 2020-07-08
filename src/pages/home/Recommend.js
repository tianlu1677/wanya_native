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

const axios = require('axios').default;


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
    console.log('xxxx')
    const a = await getHotTopics()
    console.log('a', a)
    getHotTopics().then((res) => {
      console.log('fetchData', res)
    }).catch((error) => {
      console.log('error', error)
    })

    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });
    //   })
    // fetch(`https://meirixinxue.com/api/v1/home/hot_topics`).then((res) => {
    //   console.log('res', res)
    // })

    // axios({
    //   url: '/api/v1/home/hot_topics',
    //   baseURL: 'https://meirixinxue.com',
    //   method: 'get',
    // }).then((res) => {
    //   console.log('xxx', res)
    // })
  }

  componentDidUpdate() {

  }
  render() {
    return <View><Text>

      Recommend11
    </Text>
      <Button
        title={"点击122"}
        onPress={this.fetchData}
      >
        ssss
      </Button>
    </View>
  }
}

export default Recommend;