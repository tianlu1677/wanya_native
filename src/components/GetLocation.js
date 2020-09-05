import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';
// import Helper from '../../utils/helper';

const GetLocation = ({children, handleClick}) => {
  // const [hadPermission, setHadPermission] = useState(false);
  const dispatch = useDispatch();
  const iosLocationPermission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const getLocation = async () => {
    const answer = await checkPermission();
    // console.log('xxxxxxxxx', hadPermission)
    if (!answer) {
      console.log('没权限');
      handleClick && handleClick({error: '没有权限'})
      return;
    }

    // position {"coords": {"accuracy": 65, "altitude": 84.75999954223632, "altitudeAccuracy": 6.575991892838178, "heading": -1, "latitude": 39.90715934323369, "longitude": 116.4694786466312, "speed": -1}, "timestamp": 1599203461710.297}
    Geolocation.getCurrentPosition(
      // console.log('getting position')
      position => {
        console.log('position => ', position)
        handleClick && handleClick({position: position})
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        handleClick({error: error.message})
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000, distanceFilter: 100}
    );

    // 传递回父组件经纬度以及城市 props.handleClick({})
  };

  const checkPermission = async () => {
    const result = await check(iosLocationPermission);
    let Permission = false
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        // 还是可以再次请求
        console.log('The permission has not been requested / is denied but requestable');
        request(iosLocationPermission).then(result => {
          console.log('result', result);
        });
        break;
      case RESULTS.GRANTED:
        //拥有此权限
        console.log('The permission is granted');
        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        // 主动打开设置
        openSettings().catch(() => console.warn('cannot open settings'));
        break;
    }
    return Permission
  };

  return (
    <TouchableOpacity
      onPress={() => {
        getLocation();
      }}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //底部默认样式
  phoneContainer: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 30,
    letterSpacing: 1,
  },
});


export default GetLocation;
