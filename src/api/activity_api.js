import request from './request'

// 活动列表
export async function getActivityList(data) {
  const res = await request({
    url: `/api/v1/activities`,
    method: 'GET',
    params: data
  })
  return res.data
}

// 创建活动
export async function createActivity(data = {}) {
  const res = await request({
    url: '/api/v1/activities',
    method: 'POST',
    data
  })
  return res.data
}
// 修改活动
export async function editActivity(id, data) {
  const res = await request({
    url: `/api/v1/activities/${id}`,
    method: 'PUT',
    data
  })
  return res.data
}

// 活动详情
export async function getActivity(id) {
  const res = await request({
    url: `/api/v1/activities/${id}`,
    method: 'GET'
  })
  return res.data
}

// 参与活动
export async function joinActivity(id, data) {
  const res = await request({
    url: `/api/v1/activities/${id}/joined`,
    method: 'POST',
    data: data
  })
  return res.data
}

// 退出活动
export async function exitActivity(id, data) {
  const res = await request({
    url: `/api/v1/activities/${id}/exit`,
    method: 'POST',
    data: data
  })
  return res.data
}

// 参与活动列表
export async function joinAccountsActivity(id) {
  const res = await request({
    url: `/api/v1/activities/${id}/join_accounts`,
    method: 'GET'
  })
  return res.data
}
