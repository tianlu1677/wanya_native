import React, {Component, PropTypes} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

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
      <Text>
        {post.item.plain_content}
      </Text>
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
    height: 80,
  },
});


export default BaseTopic;