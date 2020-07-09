import React, {Component, PropTypes} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import FastImgComponent from './FastImage'
// const navigation = useNavigation();

class BaseTopic extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    // baseTopic: PropTypes.object,
  }

  static defaultProps = {
    topic: {account: {}, medias: []},
    currentAccountId: '',
    type: '',
    showCourse: true,
  }

  render() {

    const {post} = this.props
    return <View style={styles.container}>
      <Text onPress={() => this.props.navigation.navigate('TopicDetail', {topic_id: post.item.id}) }>
        {post.item.plain_content}
      </Text>

      <FastImgComponent
        style={{height: 100, width: 200}}
        source={{
          uri: post.item.single_cover.cover_url
        }}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  //底部默认样式
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    // height: 80,
  },
});


export default BaseTopic;