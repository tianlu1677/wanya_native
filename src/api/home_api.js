import request from './request';

// 未登录热门推荐
export const getUnLoginHotPosts = async (params = {}) => {
  const res = await request({
    url: '/api/v1/recommend/hot_posts',
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

// 关注的帖子
export const getFollowedTopics = async (params = {}) => {
  const res = await request({
    url: '/api/v1/home/followed_topics',
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

export function getFollowedPosts(params = {}) {
  const res = request({
    url: '/api/v1/recommend/followed_posts',
    method: 'GET',
    params: params,
  });
  return res;
}

// export async function getUnLoginHotPosts(params = {}) {
//   const res = await request({
//     url: '/api/v1/recommend/hot_posts',
//     method: 'GET',
//     params: params,
//   });
//   return res;
// }

// 随机推荐的帖子

export async function getRecommendVideoListPosts(params = {}) {
  const res = await request({
    url: '/api/v1/recommend/video_list',
    method: 'GET',
    params: params,
  });
  return res;
}

// 置顶的帖子
export async function getRecommendTopPosts(params = {}) {
  const res = await request({
    url: '/api/v1/recommend/top_posts',
    method: 'GET',
    params: params,
  });
  return res;
}
