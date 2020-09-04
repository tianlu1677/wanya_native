import request from './request';

// 获取文章详情
export const getArticle = async id => {
  const res = await request({
    url: `/api/v1/articles/${id}`,
    method: 'GET',
  });
  return res;
};

// export async function getArticle(id) {
//   const res = await request({
//     url: `/api/v1/articles/${id}`,
//     method: 'GET'
//   })

//   return res.data
// }

//文章列表
export async function getArticleList(params, queryUrl = '') {
  const res = await request({
    url: `/api/v1/articles?${queryUrl}`,
    method: 'GET',
    params: params,
  });
  return res;
}

// 点赞，收藏, 分享, 查看
// action_type(praise, star, share, view)
export async function createArticleAction(id, type) {
  const res = await request({
    url: `/api/v1/articles/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
}

// 取消点赞,收藏
export async function destroyArticleAction(id, type) {
  const res = await request({
    url: `/api/v1/articles/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
}
