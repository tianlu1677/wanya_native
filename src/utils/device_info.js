import {WANYA_VERSION} from '@/utils/config';
import DeviceInfo from 'react-native-device-info';

const deviceId = DeviceInfo.getSystemVersion();
const systemName = DeviceInfo.getSystemName();

export const getDeviceInfo = async () => {
  const user_agent = await DeviceInfo.getUserAgent();

  return {
    deviceId: deviceId,
    systemName: systemName,
    Version: WANYA_VERSION,
    system_name: systemName,
    device_id: deviceId,
    user_agent: user_agent,
  };
};

export default {
  deviceInfo: {
    deviceId: deviceId,
    systemName: systemName,
    Version: WANYA_VERSION,
  },
};