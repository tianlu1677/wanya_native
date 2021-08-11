import request from './request'

// 上传文件
export async function createAction(data = {type: '', target_id: '', target_type: ''}) {
  const res = await request({
    url: '/api/v1/actions',
    method: 'POST',
    data: data
  })
  return res
}


//取消某个动作
export async function cancelAction(data = {type: '', target_id: '', target_type: ''}) {
  const res = await request({
    url: '/api/v1/actions/delete',
    method: 'POST',
    data: data
  })
  return res
}
