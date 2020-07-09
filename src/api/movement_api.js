import request from './request'

export async function getMovementDetail(id, params = {}) {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'GET',
    params: params
  })
  return res.data
}

export async function getMovementLessons(id, params = {}) {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'GET',
    params: params
  })
  return res.data
}

export async function getMovementTopics(id, params = {}) {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'GET',
    params: params
  })
  return res.data
}

// 动作列表
export async function getMovementList(queryUrl, paginate) {
  const res = await request({
    url: `/api/v1/movements?${queryUrl}`,
    method: 'GET',
    params: paginate
  })
  return res
}

//Get 动作
export async function getMovementJoin(id) {
  const res = await request({
    url: `/api/v1/movements/${id}/joined`,
    method: 'POST'
  })
  return res.data
}

//退出
export async function getMovementExit(id, params) {
  const res = await request({
    url: `/api/v1/movements/${id}/exit`,
    method: 'POST',
    params
  })
  return res
}

//Get 最近参与
export async function getMovementJoinAccounts(id, params) {
  const res = await request({
    url: `/api/v1/movements/${id}/joined_accounts`,
    method: 'GET',
    params
  })
  return res
}

//创建顽招的分类
export async function getMovementJoinCategory() {
  const res = await request({
    url: `/api/v1/movements/movement_category`,
    method: 'GET'
  })
  return res.data
}

//创建顽招
export async function createMovements(data) {
  const res = await request({
    url: `/api/v1/movements`,
    method: 'POST',
    data
  })
  return res.data
}

//编辑顽招
export async function editMovements(id, data) {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'PUT',
    data
  })
  return res.data
}

//顽招帖子
export async function getPosts(id, params = {}) {
  const res = await request({
    url: `/api/v1/movements/${id}/posts`,
    method: 'GET',
    params
  })
  return res
}
