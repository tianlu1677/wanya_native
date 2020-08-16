import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import {
  Header,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';

import Navigation from './src/navigator/index';

import {Image} from 'react-native';
import {Card, ListItem, Icon, Button} from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';

import Config from 'react-native-config';

// Config.API_URL; // 'https://myapi.com'
// Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
//
// https://github.com/react-native-community/react-native-device-info#installation
import DeviceInfo from 'react-native-device-info';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadNetworkInfo();
    this.loadDeviceInfo();
  }

  loadNetworkInfo = () => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Connection ", state);
    //   console.log("Is connected?", state.isConnected);
    // });
    // NetInfo.fetch().then(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
  };

  loadDeviceInfo = () => {
    DeviceInfo.getApiLevel().then(apiLevel => {
      // console.log('apiLevel', apiLevel);
      // iOS: ?
      // Android: 25
      // Windows: ?
    });

    let bundleId = DeviceInfo.getBundleId();
    // console.log('bundleId', bundleId)
  };

  render() {
    return (
      <>
        <Navigation />
      </>
    );
  }
}

export default App;
