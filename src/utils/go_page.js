import React, {useState, useEffect, useLayoutEffect, useReducer} from 'react';
import { Platform } from 'react-native'
import * as RootNavigation from '@/navigator/root-navigation';

export default class GoPage {
  static goAccountList(params = {accountId: ''}) {
    RootNavigation.push('FollowAccounts', params);
  }
}
