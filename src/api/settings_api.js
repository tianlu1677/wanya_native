import request from './request';

export async function getSettings(params = {}) {
  const res = await request({
    url: '/api/v1/settings',
    method: 'GET',
    data: params,
  });
  return res.data;
}

export async function getUploadFileToken(params = {}) {
  const res = await request({
    url: '/api/v1/upload_files/generate_token',
    method: 'POST',
    data: params,
  });
  return res.data;
}

export async function saveToAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets/direct_video_upload',
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 基础的配置信息
export async function prosettings(data = {}) {
  const res = await request({
    url: '/api/v1/settings/prosettings',
    method: 'GET',
    data: data,
  });
  return res.data;
}

// 记录系统信息b
export async function uploadSystemInfo(system_detail = '') {

  const res = await request({
    url: '/api/v1/records/record_system_info',
    method: 'POST',
    data: {
      account_system_info: {
        system_detail: system_detail.toString()
      },
    },
  });
  return res.data;
}

export async function recordDeviceInfo(params) {
  const res = await request({
    url: '/api/v1/records/record_device_info',
    method: 'POST',
    data: params
  });
  return res.data;
}