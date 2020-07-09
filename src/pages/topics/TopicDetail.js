import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import {getTopic} from "../../api/topic_api"

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.topic_id = ''
    this.state = {
      topicDetail: {}
    }
  }

  componentWillMount() {
    this.topic_id = this.props.route.params
  }
  componentDidMount() {
    console.log('this.roiter', this.topic_id )
    getTopic(this.topic_id).then((res) => {
      this.setState({
        topicDetail: res.topic
      })
    })
  }

  render() {
    return <View>
      <Text>TopicDetail</Text>
    </View>
  }
}

export default TopicDetail;