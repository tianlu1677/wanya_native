import request from './request';

//删除文件
export const deleteAssets = async id => {
  const res = await request({
    url: `/api/v1/assets/${id}`,
    method: 'DELETE',
  });
  return res.data;
};

// 上传文件
export async function createAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets',
    method: 'POST',
    data: data,
  });
  return res.data;
}

export async function uploadWechatMedia(data = {media_id: ''}) {
  const res = await request({
    url: '/api/v1/assets/wx_download',
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 上传base64文件
export async function uploadBase64File(data = {file: ''}) {
  const res = await request({
    url: '/api/v1/assets/upload_base64',
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 获取到已分享过的url地址
export async function getShareUrl(data = {item_id: '', item_type: ''}) {
  const res = await request({
    url: '/api/v1/share_pages/share_url',
    method: 'GET',
    data: data,
  });
  return res.data;
}

// 获取到已分享过的详细信息
export async function getShareContent(data = {item_type: '', item_id: ''}) {
  console.log('item_type', data);
  const res = await request({
    url: '/api/v1/share_pages/share',
    method: 'GET',
    data: data,
  });
  console.log('res', res);
  return res.data.share_content;
}
