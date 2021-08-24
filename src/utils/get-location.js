import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import * as action from '@/redux/constants';
import {check, openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Geolocation as GeolocationAndroid1} from 'react-native-amap-geolocation';
import {getLocation} from '@/api/space_api';
import {createLocations} from '@/api/location_api';

// 圈子获取权限
// 社区 本地tab

const Permission =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

export const checkPermission = async () => {
  const result = await check(Permission);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('This feature is not available (on this device / in this context)');
      return false;
    case RESULTS.DENIED:
      return false;
    case RESULTS.GRANTED:
      //拥有此权限
      console.log('The permission is granted');
      return true;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      return false;
  }
};

export const getLocationInfo = async handleClick => {
  const answer = await checkPermission();

  if (answer === 'WAIT') {
    console.log('等待授权中');
  }

  if (answer === false) {
    console.log('没权限');
    await openSettings();
  }

  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        handleClick && handleClick({position});
      },
      error => {
        console.log(error.code, error.message);
        handleClick(false);
      },
      {enableHighAccuracy: false, timeout: 3000, maximumAge: 10000, distanceFilter: 100}
    );
  } else {
    const ret = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    if (ret['"android.permission.ACCESS_FINE_LOCATION"'] === 'never_ask_again') {
      return false;
    }

    GeolocationAndroid1.getCurrentPosition(position => {
      handleClick({position: position});
    });
  }
};

export const loadLocation = dispatch => {
  getLocationInfo(async result => {
    if (result) {
      const {latitude, longitude} = result.position.coords;
      const res = await getLocation({latitude, longitude});
      const ret = await createLocations({location: {name: res.data.city}});

      dispatch({
        type: action.GET_LOCATION,
        value: {
          ...result.position.coords,
          positionCity: res.data.city,
          chooseCity: res.data.city,
          createLocation: ret.data.location,
        },
      });
    }
  });
};
