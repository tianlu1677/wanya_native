import request from './request';

// 首页频道信息流
export const getChannels = async () => {
  const res = await request({
    url: '/api/v1/channels',
    method: 'GET',
  });
  return res;
};

export const getChannelPosts = async (params = {}) => {
  const res = await request({
    url: '/api/v1/recommend/channel_posts',
    method: 'GET',
    params,
  });
  return res;
};

// 推荐帖子
export const getRecommendPosts = async (params = {}) => {
  const res = await request({
    url: '/api/v1/recommend/recommend_posts',
    method: 'GET',
    params,
  });
  return res;
};

// 关注帖子
export const getFollowedPosts = async (params = {}) => {
  console.log('params', params);
  const res = request({
    url: '/api/v1/recommend/followed_posts',
    method: 'GET',
    params: params,
  });
  return res;
};

// 附近帖子
// 会在最外层有一个距离 ( distance )如果 distance = -1 不显示
export const getNearbyPosts = async (params = {}) => {
  const res = request({
    url: '/api/v1/recommend/nearby_posts',
    method: 'GET',
    params: params,
  });
  return res;
};

// 最新的帖子
export const getRecommendLatestPosts = async (params = {}) => {
  const res = await request({
    url: '/api/v1/recommend/latest_posts',
    method: 'GET',
    params,
  });
  return res;
};

// 帖子详情
export const getTopic = async id => {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'GET',
  });
  return res;
};

// 帖子评论
export const getTopicCommentList = async id => {
  const res = await request({
    url: `/api/v1/topics/${id}/comments`,
    method: 'GET',
  });
  return res;
};

// 创建评论
export const createComment = async (data = {}) => {
  const res = await request({
    url: '/api/v1/comments',
    method: 'POST',
    data,
  });
  return res;
};

// 关注的帖子
export const getFollowedTopics = async (params = {}) => {
  const res = await request({
    url: '/api/v1/home/followed_topics',
    method: 'GET',
    params,
  });
  return res;
};

// 关注圈子帖子
export const getFollowedNodePosts = async (params = {}) => {
  const res = await request({
    url: '/api/v1/recommend/followed_node_posts',
    method: 'GET',
    params,
  });
  return res;
};

// 向用户推荐关注的人
export const getRecommendAccounts = async params => {
  const res = await request({
    url: '/api/v1/recommend/recommend_accounts',
    method: 'GET',
    params,
  });
  return res;
};

// export async function createComment(data = {}) {
//   const res = await request({
//     url: `/api/v1/comments`,
//     method: 'POST',
//     data: data
//   })

//   return res.data
// }

// 推荐的分类
export async function getRecommendCategories() {
  const res = await request({
    url: '/api/v1/home/recommend_categories',
    method: 'GET',
  });
  return res.data;
}

//首页设置课程
export async function getCategoryRanks(category_id) {
  const res = await request({
    url: '/api/v1/home/recommend_ranks',
    method: 'GET',
    params: {category_id: category_id},
  });
  return res.data;
}

// 分类下推荐的课程
export async function getRecommendCourses(category_id, params = {}) {
  const res = await request({
    url: '/api/v1/home/recommend_courses?category_id=' + category_id,
    method: 'GET',
    params: params,
  });
  return res;
}

//首页推荐课程
export async function getFollowCategories() {
  const res = await request({
    url: '/api/v1/home/follow_categories',
    method: 'GET',
  });
  return res.data;
}

export async function getDailyCourses() {
  const res = await request({
    url: '/api/v1/home/daily_courses',
    method: 'GET',
  });
  return res.data;
}

// // 推荐的帖子
// export async function getRecommendTopics(params = {}) {
//   const res = await request({
//     url: '/api/v1/home/recommend_topics',
//     method: 'GET',
//     params: params
//   })
//   return res
// }
//
// // 关注的帖子
// export async function getFollowedTopics(params = {}) {
//   const res = await request({
//     url: '/api/v1/home/followed_topics',
//     method: 'GET',
//     params: params
//   })
//   return res
// }

// 首页排序的帖子
export async function getHotTopics(params = {}) {
  const res = await request({
    url: '/api/v1/home/hot_topics',
    method: 'POST',
    params: params,
  });
  return res;
}

// export function getFollowedPosts(params = {}) {
//   const res = request({
//     url: '/api/v1/recommend/followed_posts',
//     method: 'GET',
//     params: params,
//   });
//   return res;
// }

// export async function getUnLoginHotPosts(params = {}) {
//   const res = await request({
//     url: '/api/v1/recommend/hot_posts',
//     method: 'GET',
//     params: params,
//   });
//   return res;
// }

// 随机推荐的帖子

// export async function getRecommendVideoListPosts(params = {}) {
//   const res = await request({
//     url: '/api/v1/recommend/video_list',
//     method: 'GET',
//     params: params,
//   });
//   return res;
// }

// 置顶的帖子
export async function getRecommendTopPosts(params = {}) {
  const res = await request({
    url: '/api/v1/recommend/top_posts',
    method: 'GET',
    params: params,
  });
  return res;
}
