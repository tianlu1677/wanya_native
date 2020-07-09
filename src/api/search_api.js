import request from './request'

// 搜索课程
export async function searchApi(name = '', type = 'course', params = {}) {
  const res = await request({
    url: '/api/v1/search',
    method: 'GET',
    params: {
      name: name,
      type: type,
      ...params
    }
  })
  return res
}
