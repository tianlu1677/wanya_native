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

// export function getCurrentPage() {
//   return {
//     name: navigationRef.current.getCurrentRoute().name,
//     params: navigationRef.current.getCurrentRoute().params,
//     title: navigationRef.current.getCurrentOptions().title
//   }
// }

export function getCurrentPage() {
  return {
    name: navigationRef?.current?.getCurrentRoute().name,
    params: navigationRef?.current?.getCurrentRoute().params,
    title: navigationRef?.current?.getCurrentOptions().title,
  };
}

// https://reactnavigation.org/docs/navigating-without-navigation-prop
// RootNavigation.js
