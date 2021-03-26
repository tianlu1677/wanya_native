import request from './request';
import Helper from '@/utils/helper';
import {Platform} from 'react-native';

// 保存用户的devicetoken列表
export async function syncDeviceToken(data = {platform: '', register_token: ''}) {
  const register_token = await Helper.getData('registerId');
  if (!register_token) {
    return 'no register_token';
  }
  const platform = Platform.OS;
  data = {...data, register_token: register_token, platform: platform};
  const res = await request({
    url: '/api/v1/app_devices',
    method: 'POST',
    data: data,
  });

  return res.data;
}

// 返回发送的消息内容具体是啥
export async function callbackNotification(data = {}) {
  const res = await request({
    url: '/api/v1/app_devices/record_open_message',
    method: 'POST',
    params: data,
  });
  return res.data;
}
