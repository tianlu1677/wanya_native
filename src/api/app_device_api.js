import request from './request';

// 保存用户的devicetoken列表
export async function syncDeviceToken(
  data = {platform: '', device_token: '', app_system_info: ''}
) {
  const res = await request({
    url: `/api/v1/app_devices`,
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 返回发送的消息内容具体是啥
export async function callbackNotification(data = {}) {
  const res = await request({
    url: `/api/v1/app_devices/record_open_message`,
    method: 'POST',
    params: data,
  });
  return res.data;
}
