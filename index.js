/**
 * @format
 */

// import './logbox'

import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as Sentry from '@sentry/react-native';
import {BaseSentryURL} from '@/utils/config';

AppRegistry.registerComponent(appName, () => App);

import Store from './src/utils/export_storage';
import Helper from './src/utils/helper';

Sentry.init({
  dsn: BaseSentryURL,
  enableNative: false,
});
React.$Store = Store;
React.$Helper = Helper;

// React.$lodash = require('lodash');
