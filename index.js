/**
 * @format
 */

// import './logbox'

import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NetworkProvider } from 'react-native-offline';

const Root = () => (
  <NetworkProvider pingServerUrl={'https://baidu.com'} pingInterval={3000} pingTimeout={100000}>
    <App />
  </NetworkProvider>
);

AppRegistry.registerComponent(appName, () => Root);

import Store from './src/utils/export_storage';
import Helper from './src/utils/helper';

React.$Store = Store;
React.$Helper = Helper;

// React.$lodash = require('lodash');
