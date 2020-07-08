import React, {Component} from 'react';
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


class EmptyData extends Component {
  static defaultProps = {
    tips: "暂无数据",
  };
  _onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress(true);
    }
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onPress} activeOpacity={0.8}>
        <View style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Image
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: 120,
              height: 120,
              resizeMode: "contain"
            }}
            // source={require("../../img/pic_empty_data.png")}
          />
          <Text>{this.props.tips}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
