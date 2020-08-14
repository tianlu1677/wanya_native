import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
// import goPage from '../../utils/page_path';

class SystemNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  render() {
    return (
      <View>
        <SafeAreaView>SystemNotify</SafeAreaView>
      </View>
    );
  }
}

export default SystemNotify;
