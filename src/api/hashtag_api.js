import request from './request';

// 发布帖子话题列表
export const getHashtagList = async params => {
  const res = await request({
    url: '/api/v1/hashtags',
    method: 'GET',
    params,
  });
  return res;
};

// export async function getHashtagList(hashtag = "") {
//   const res = await request({
//     url: `/api/v1/hashtags`,
//     method: 'get',
//   })
//   return res.data
// }

export async function hashTagDetail(hashtag = '') {
  const res = await request({
    url: `/api/v1/hashtags/${hashtag}`,
    method: 'GET',
  });
  return res.data;
}

export async function getHashtagPosts(params) {
  const res = await request({
    url: '/api/v1/hashtags/posts',
    method: 'GET',
    params: params,
  });
  return res;
}
