import React, {useState} from 'react';
import {StyleSheet, Platform, PermissionsAndroid, Alert, Text, View, Pressable, Modal} from 'react-native';
import GeolocationIOS from 'react-native-geolocation-service';
import {check, request, addLocationListener, PERMISSIONS, RESULTS, openSettings} from 'react-native-permissions';

import { init, Geolocation } from "react-native-amap-geolocation";



const GetLocation = ({children, handleClick, style}) => {
  const [visible, setVisible] = useState(false);
  const iosLocationPermission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const getLocation = async () => {
    // await init({
    //   ios: "6da6626cf6588fb6e3052deff1e8d4e9",
    //   android: "648f6e4ce8f5b83b30e2eabcac060eee"
    // });

    const answer = await checkPermission();

    if (answer === 'WAIT') {
      console.log('等待授权中');
      return;
    }

    if (!answer) {
      console.log('没权限');
      Alert.alert('授权后才能设置场地位置', '', [
        {
          text: '取消',
          onPress: () => onCancel(),
        },

        {text: '去设置', onPress: () => onOpenSetting()},
      ]);
      return;
    }

    if(Platform.OS === 'ios') {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position => ', position);
          handleClick && handleClick({position: position});
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          handleClick(false);
        },
        {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
      );
    } else {
      // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      const re = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      // console.log('re', re)
      // addLocationListener(location => console.log(location));
      Geolocation.getCurrentPosition(
        position => {
          // alert(JSON.stringify(position))
          console.log('position => ', position);
          handleClick && handleClick({position: position});
        },
        error => {
          // See error code charts below.
          alert(JSON.stringify(error))
          console.log(error.code, error.message);
          handleClick(false);
        },
        {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
      );
    }

    // position {"coords": {"accuracy": 65, "altitude": 84.75999954223632, "altitudeAccuracy": 6.575991892838178, "heading": -1, "latitude": 39.90715934323369, "longitude": 116.4694786466312, "speed": -1}, "timestamp": 1599203461710.297}
    // Geolocation.getCurrentPosition(
    //   position => {
    //     console.log('position => ', position);
    //     handleClick && handleClick({position: position});
    //   },
    //   error => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //     handleClick(false);
    //   },
    //   {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
    // );
  };

  const checkPermission = async () => {
    const result = await check(iosLocationPermission);
    let Permission = false;
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        // 还是可以再次请求
        console.log('The permission has not been requested / is denied but requestable');
        request(iosLocationPermission).then(result => {
          console.log('result', result);
          getLocation();
        });
        return 'WAIT';
      case RESULTS.GRANTED:
        //拥有此权限
        console.log('The permission is granted');
        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
    return Permission;
  };

  const onOpenSetting = () => {
    setVisible(false);
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const onCancel = () => {
    setVisible(false);
    console.log('没有权限');
    handleClick && handleClick(false);
  };

  return (
    <>
      <Pressable
        style={style}
        onPress={() => {
          getLocation();
        }}>
        {children}
      </Pressable>
      <Modal transparent={visible} statusBarTranslucent visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>授权后才能设置场地位置</Text>
            <View style={styles.modalBtnWrap}>
              <Text style={styles.modalBtn} onPress={onCancel}>
                取消
              </Text>
              <Text style={styles.modalBtn} onPress={onOpenSetting}>
                去设置
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  modalBtn: {
    width: 70,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GetLocation;
