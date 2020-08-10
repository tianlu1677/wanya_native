import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

// https://github.com/DylanVann/react-native-fast-image

import FastImage from 'react-native-fast-image';

class FastImgComponent extends Component {
  static defaultProps = {
    source: {}
  };
  _onPress = () => {
    const {onPress} = this.props;
    if (onPress) {
      onPress(true);
    }
  };
  render() {
    return (
      <FastImage
        style={{width: 200, height: 200}}
        source={this.props.source}
        {...this.props}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  }
}

export default FastImgComponent;
