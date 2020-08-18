import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import {
  connect,
  useSelector
} from 'react-redux';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {
  dispathCurrentAccount,
  dispathBaseCurrentAccount,
  dispathEmptyAccountDetail,
} from '@/redux/actions';

@connect(state => state.account, {
  dispathCurrentAccount,
  dispathBaseCurrentAccount,
  dispathEmptyAccountDetail,
})

class PraiseNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.dispathCurrentAccount()
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {}

  render() {
    return (
      <View>
        <SafeAreaView>
          <Text>sss</Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default PraiseNotify;
