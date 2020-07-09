import request from './request'

export async function createFeedback(data = {}) {
  const res = await request({
    url: '/api/v1/feedbacks',
    method: 'POST',
    data: data
  })
  return res.data
}
