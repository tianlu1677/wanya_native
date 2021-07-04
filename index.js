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

import CustomView1 from '@/pages/sessions/login-templates/customView1';
import CustomView2 from '@/pages/sessions/login-templates/customView2';
import CustomView3 from '@/pages/sessions/login-templates/customView3';


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

AppRegistry.registerComponent('customView1', () => CustomView1);
// AppRegistry.registerComponent('customView2', () => CustomView2);
// AppRegistry.registerComponent('customView3', () => CustomView3);