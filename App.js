import React, {Component} from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/stores/store';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import Navigation from './src/navigator/index';
import Helper from './src/utils/helper'
import {Image} from 'react-native';
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
    this.loginAdmin()
  }


  loginAdmin = () => {
    Helper.clearAllData()
    if (!Helper.getData('auth_token')) {
      setTimeout(() => {
        this.props.navigation.navigate('AdminPhoneLogin');
      }, 1000)   
      
    }

    
    // if (React.$Store.getStore('auth_token')) {
    //   this.props.navigation.navigate('AdminPhoneLogin')
    // }
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
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>

      </>
    );
  }
}

export default App;
