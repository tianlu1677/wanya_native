import request from './request'

//获取位置
export async function getLocation(params) {
  const res = await request({
    url: '/api/v1/map/location',
    method: 'GET',
    params
  })
  return res.data
}
// 场地列表
export async function getSpacesList(params) {
  const res = await request({
    url: '/api/v1/spaces/list',
    method: 'GET',
    params
  })
  return res.data
}
// 热门场地
export async function getRecommend(params) {
  const res = await request({
    url: '/api/v1/spaces/recommend',
    method: 'GET',
    params
  })
  return res.data
}
//场地类型
export async function getCategories() {
  const res = await request({
    url: '/api/v1/categories/list',
    method: 'GET'
  })
  return res.data
}

// 创建场地
export async function createSpaces(data = {}) {
  const res = await request({
    url: '/api/v1/spaces',
    method: 'POST',
    data
  })
  return res.data
}

// 编辑场地
export async function editSpaces(id, data = {}) {
  const res = await request({
    url: `/api/v1/spaces/${id}`,
    method: 'PUT',
    data
  })
  return res.data
}

// 城市名称
export async function getCities(data = {}) {
  const res = await request({
    url: '/api/v1/general/cities',
    method: 'GET',
    data
  })
  return res.data
}

// 场地详情
export async function getSpaceDetail(params = {}) {
  const res = await request({
    url: `/api/v1/spaces/${params.id}`,
    method: 'GET'
  })
  return res.data
}

// 场地动态
export async function getPosts(id, params = {}) {
  const res = await request({
    url: `/api/v1/spaces/${id}/posts`,
    method: 'GET',
    params
  })
  return res
}

export async function getSpaces(params, paginate) {
  const res = await request({
    url: '/api/v1/spaces',
    method: 'GET',
    params: {
      ...params,
      ...paginate
    }
  })
  return res
}

// 点亮的人
export async function getSpacesJoinAccounts(id, params) {
  const res = await request({
    url: `/api/v1/spaces/${id}/joined_accounts`,
    method: 'GET',
    params
  })
  return res
}

// 点亮
export async function getSpacesJoin(id) {
  const res = await request({
    url: `/api/v1/spaces/${id}/joined`,
    method: 'POST'
  })
  return res.data
}
