import request from './request';

// store列表
export const getShopStores = async (query, params) => {
  const res = await request({
    url: `/api/v1/shop_stores?${query}`,
    method: 'GET',
    params,
  });
  return res;
};

// store详情
export const getShopStoreDetail = async id => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}`,
    method: 'GET',
  });
  return res;
};

// store 取消收藏
export const shopStoreExit = async id => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/exit`,
    method: 'POST',
  });
  return res;
};

// store 收藏
export const shopStoreJoined = async id => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/joined`,
    method: 'POST',
  });
  return res;
};

// store 收藏人员
export const getShopStoreJoinAccounts = async (id, params) => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/joined_accounts`,
    method: 'GET',
    params,
  });
  return res;
};

// export async function getShopStoreJoinAccounts(id) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}/joined_accounts`,
//     method: 'GET',
//   });
//   return res;
// }

// export async function getShopStoreDetail(id) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}`,
//     method: 'GET',
//   });
//   return res.data;
// }

// export async function getShopStores(params, paginate, query) {
//   const res = await request({
//     url: `/api/v1/shop_stores?${query}`,
//     method: 'GET',
//     params: {
//       ...params,
//       ...paginate
//     }
//   })
//   return res
// }

// store详情
// export async function getShopStoreDetail(id) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}`,
//     method: 'GET',
//   });
//   return res.data;
// }

// store参与人员
// export async function getShopStoreJoinAccounts(id, params) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}/joined_accounts`,
//     method: 'GET',
//     params,
//   });
//   return res;
// }

// store参与
// export async function getShopStoreJoined(id, params) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}/joined`,
//     method: 'POST',
//     params,
//   });
//   return res;
// }

// store参与
// export async function getShopStoreExit(id, params) {
//   const res = await request({
//     url: `/api/v1/shop_stores/${id}/exit`,
//     method: 'POST',
//     params,
//   });
//   return res;
// }

// 动态
export async function getShopStorePosts(id, params = {}) {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/posts`,
    method: 'GET',
    params,
  });
  return res;
}

//帖子
export async function getShopStoreTopics(id, params = {}) {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/topics`,
    method: 'GET',
    params,
  });
  return res;
}

//文章
export async function getShopStoreArticles(id, params = {}) {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/articles`,
    method: 'GET',
    params,
  });
  return res;
}
