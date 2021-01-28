import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {check, request, openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Geolocation as GeolocationAndroid1} from 'react-native-amap-geolocation';

const iosLocationPermission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export const getLocation = async (open, handleClick) => {
  const answer = await checkPermission();

  if (answer === 'WAIT') {
    console.log('等待授权中');
  }

  if (!answer) {
    console.log('没权限');
    if (open) {
      openSettings().catch(() => console.warn('cannot open settings'));
    } else {
      handleClick && handleClick(false);
    }
  }

  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition(
      position => {
        handleClick && handleClick({position});
      },
      error => {
        console.log(error.code, error.message);
        handleClick(false);
      },
      {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
    );
  } else {
    const re = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    console.log('res', re);
    GeolocationAndroid1.getCurrentPosition((position) => {
        console.log('position => ', position);
        handleClick && handleClick({position: position});
      },
      error => {
        console.log(error.code, error.message);
        handleClick(false);
      },
      {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
    );
  }
};

export const checkPermission = async () => {
  const result = await check(iosLocationPermission);
  let Permission = false;
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('This feature is not available (on this device / in this context)');
      break;
    case RESULTS.DENIED:
      // 还是可以再次请求
      request(iosLocationPermission).then(res => {
        console.log('result', res);
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
