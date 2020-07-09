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
    this.topic_id = this.props.route.params.topic_id
  }
  componentDidMount() {
    getTopic(this.topic_id).then((res) => {
      this.setState({
        topicDetail: res.topic
      })
    })
  }

  render() {
    const { topicDetail } = this.state
    return <View>
      <Text>{topicDetail.plain_content}</Text>
    </View>
  }
}

export default TopicDetail;