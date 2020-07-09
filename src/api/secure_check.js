import request from './request'

// 搜索课程
export async function secureCheck(type, content) {
  const res = await request({
    url: '/api/secure_checks',
    method: 'POST',
    data: {
      type: type,
      content: content
    }
  })
  return res.data
}
