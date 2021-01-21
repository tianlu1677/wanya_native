import {WANYA_VERSION} from '@/utils/config';
import DeviceInfo from 'react-native-device-info';
const deviceId = DeviceInfo.getSystemVersion();
const systemName = DeviceInfo.getSystemName();

export default {
  deviceInfo: {
    deviceId: deviceId,
    systemName: systemName,
    Version: WANYA_VERSION,
  },
}