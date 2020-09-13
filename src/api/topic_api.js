import request from './request';

// 帖子列表
export const getTopicList = async params => {
  const res = await request({
    url: `/api/v1/topics?${params.queryUrl}`,
    method: 'GET',
    params,
  });
  return res;
};

// 创建帖子
export const createTopic = async data => {
  const res = await request({
    url: '/api/v1/topics',
    method: 'POST',
    data,
  });
  return res.data;
};

// 获取帖子详情
export const getTopic = async id => {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'GET',
  });
  return res;
};

// 点赞
export const createTopicAction = async params => {
  const res = await request({
    url: `/api/v1/topics/${params.id}/create_actions`,
    method: 'POST',
    data: {type: params.type},
  });
  return res;
};

// 取消点赞
export const destroyTopicAction = async params => {
  const res = await request({
    url: `/api/v1/topics/${params.id}/destroy_actions`,
    method: 'POST',
    data: {type: params.type},
  });
  return res;
};

//话题列表
export async function getNodeTopicList(params) {
  const res = await request({
    url: `/api/v1/nodes/${params.id}/hashtags`,
    method: 'GET',
    params,
  });
  return res;
}

// 帖子预设标签
export async function getTopicTags(params) {
  const res = await request({
    url: '/api/v1/tags',
    method: 'GET',
    params,
  });
  return res.data;
}

// 修改帖子
export async function updateTopic(id, data = {}) {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'PUT',
    data: data,
  });
  return res.data;
}

// 删除帖子
export async function deleteTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'DELETE',
  });
  return res.data;
}

// 添加外链
export async function addTopicLink(data) {
  const res = await request({
    url: '/api/v1/topics/add_topic_link.json',
    method: 'POST',
    data: data,
  });
  return res.data;
}
