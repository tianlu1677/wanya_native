import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import {connect, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import {
  dispathCurrentAccount,
  dispathBaseCurrentAccount,
  dispathEmptyAccountDetail,
  dispathGetList,
} from '@/redux/actions';

@connect(state => state.home, {
  dispathCurrentAccount,
  dispathBaseCurrentAccount,
  dispathEmptyAccountDetail,
  dispathGetList,
})
class PraiseNotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.dispathGetList(310);
  }

  componentDidUpdate() {
    // 接收新的state
    console.log(this.props.listData);
  }

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
