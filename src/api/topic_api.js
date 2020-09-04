import request from './request';

// 帖子列表
export const getTopicList = async params => {
  const res = await request({
    url: `/api/v1/topics?${params.id}`,
    method: 'GET',
    params,
  });
  return res.data;
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

export const getTopic = async id => {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'GET',
  });
  return res;
};

// 获取帖子详情
// export async function getTopic(id) {
//   const res = await request({
//     url: `/api/v1/topics/${id}`,
//     method: 'GET'
//   })

//   return res.data
// }

// 获取帖子详情
// export async function getTopic(id) {
//   const res = await request({
//     url: `/api/v1/topics/${id}`,
//     method: 'GET',
//   });

//   return res.data;
// }

//帖子列表
// export async function getTopicList(params, queryUrl = '') {
//   const res = await request({
//     url: `/api/v1/topics?${queryUrl}`,
//     method: 'GET',
//     params: params,
//   });

//   return res;
// }

//话题列表
export async function getNodeTopicList(params, queryUrl = '') {
  const res = await request({
    url: `/api/v1/nodes/${queryUrl}/hashtags`,
    method: 'GET',
    params: params,
  });

  return res;
}

// 点赞，收藏, 分享, 查看
// action_type(praise, star, share, view)
export async function createTopicAction(id, type) {
  const res = await request({
    url: `/api/v1/topics/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
}

// 取消点赞,收藏
export async function destroyTopicAction(id, type) {
  const res = await request({
    url: `/api/v1/topics/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
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

// 创建帖子
// export async function createTopic(data = {}) {
//   const res = await request({
//     url: '/api/v1/topics',
//     method: 'POST',
//     data: data,
//   });
//   return res.data;
// }

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
