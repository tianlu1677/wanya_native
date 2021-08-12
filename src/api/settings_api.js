import request from './request';

export const getVersionUpgrades = async data => {
  const res = await request({
    url: '/api/v1/version_upgrades',
    method: 'GET',
    data,
  });
  return res.data;
};

export const getLabelList = async () => {
  const res = await request({
    url: '/api/v1/settings/total_label_list',
    method: 'GET',
  });
  return res;
};

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

export async function saveVideoToAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets/direct_video_upload',
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 音频文件
export async function saveAudioToAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets/direct_audio_upload',
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
        system_detail: system_detail.toString(),
      },
    },
  });
  return res.data;
}

export async function recordDeviceInfo(params) {
  const res = await request({
    url: '/api/v1/records/record_device_info',
    method: 'POST',
    data: params,
  });
  return res.data;
}

// 记录用户行为信息
export async function ahoyTrackVisit(params) {
  const res = await request({
    url: '/api/v1/ahoy/visits',
    method: 'POST',
    data: params,
  });
  return res.data;
}
export async function ahoyTrackEvents(params) {
  const res = await request({
    url: '/api/v1/records/track_events',
    method: 'POST',
    data: params,
  });
  return res.data;
}
