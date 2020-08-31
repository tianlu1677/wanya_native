import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import goPage from '../../utils/page_path';
import AccountFollow from './components/account-follow';
import SafeAreaPlus from '../../components/SafeAreaPlus';
class FollowNotify extends Component {
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
      <SafeAreaPlus style={{backgroundColor: 'white', height: '100%'}}>
        {[1, 2, 3].map(item => {
          return <AccountFollow account={{}} actionText={'你好'} time={'1小时前'} key={item} />;
        })}
      </SafeAreaPlus>
    );
  }
}

export default FollowNotify;
