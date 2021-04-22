import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(name, params = {}) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function reset(name, params) {
  navigationRef.current?.reset(name, params);
}

// https://reactnavigation.org/docs/navigating-without-navigation-prop
// RootNavigation.js
