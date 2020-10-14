import request from './request'

// 上传文件
export async function createAsset(data = {}) {
  const res = await request({
    url: '/api/v1/assets',
    method: 'POST',
    data: data
  })
  return res.data
}

export async function uploadWechatMedia(data = {media_id: ''}) {
  const res = await request({
    url: '/api/v1/assets/wx_download',
    method: 'POST',
    data: data
  })
  return res.data
}



// 上传base64文件
export async function uploadBase64File(data = {file: ''}) {
  const res = await request({
    url: '/api/v1/assets/upload_base64',
    method: 'POST',
    data: data
  })
  return res.data
}

