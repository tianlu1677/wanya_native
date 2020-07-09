import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

class Tmp extends Component {
  static defaultProps = {
    tips: "",
    data: {}
  };
  _onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress(true);
    }
  };
  render() {
    const { } = this.props

    return (
      <TouchableOpacity activeOpacity={0.8}>

      </TouchableOpacity>
    );
  }
}

export default Tmp;