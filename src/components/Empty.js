import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class EmptyData extends Component {
  static defaultProps = {
    tips: '暂无数据',
  };
  _onPress = () => {
    const {onPress} = this.props;
    if (onPress) {
      onPress(true);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} activeOpacity={0.8}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>ssss</Text>
          <Text>{this.props.tips}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default EmptyData;
