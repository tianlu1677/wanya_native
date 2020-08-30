import request from './request';

// 发布帖子话题列表
export const getHashtagList = async () => {
  const res = await request({
    url: '/api/v1/hashtags',
    method: 'get',
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
    method: 'get',
  });
  return res.data;
}

export async function getHashtagPosts(hashtag = '', type = 'published', params) {
  const res = await request({
    url: '/api/v1/hashtags/posts',
    method: 'get',
    data: {
      hashtag_name: hashtag,
      type: type,
      ...params,
    },
  });
  return res;
}
