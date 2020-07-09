import request from './request'

// 圈子列表
export async function getNodeIndex(params = {}) {
  const res = await request({
    url: '/api/v1/nodes',
    method: 'GET',
    data: params
  })
  return res.data.nodes
}

// 推荐页圈子列表
export async function getRecommendNodeList(params = {}) {
  const res = await request({
    url: '/api/v1/nodes/list',
    method: 'GET',
    data: params
  })
  return res.data.nodes
}

// 我关注的圈子列表
export async function getFollowNodeIndex(params = {account_id: '' }) {
  const res = await request({
    url: '/api/v1/nodes/followed',
    method: 'GET',
    data: params
  })
  return res.data.nodes
}

// 圈子详情

export async function getNodeDetail(node_id, params = {}) {
  const res = await request({
    url: '/api/v1/nodes/' + node_id,
    method: 'GET',
    params: params
  })
  return res.data
}

// 动态
// 圈子动态
// 个人中心发布的内容
export async function getPosts(params = {}, queryUrl = '') {
  const res = await request({
    url: `/api/v1/posts?${queryUrl}`,
    method: 'GET',
    data: params
  })
  return res
}

// 圈子用户
export async function getRecentAccounts(node_id, params = {}) {
  const res = await request({
    url: `/api/v1/nodes/${node_id}/recent_accounts`,
    method: "GET",
    params: params
  })
  return res
}