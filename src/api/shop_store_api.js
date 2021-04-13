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

// store收藏
export const getShopStoreJoined = async id => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/joined`,
    method: 'POST',
  });
  return res;
};

// store取消收藏
export const getShopStoreExit = async id => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/exit`,
    method: 'POST',
  });
  return res;
};

// store收藏用户
export const getShopStoreJoinAccounts = async (id, params) => {
  const res = await request({
    url: `/api/v1/shop_stores/${id}/joined_accounts`,
    method: 'GET',
  });
  return res;
};

// store详情动态
export const getShopStorePosts = async params => {
  const res = await request({
    url: `/api/v1/shop_stores/${params.id}/posts`,
    method: 'GET',
    params,
  });
  return res;
};

// store详情帖子
export const getShopStoreTopics = async params => {
  const res = await request({
    url: `/api/v1/shop_stores/${params.id}/topics`,
    method: 'GET',
    params,
  });
  return res;
};

// store详情文章
export const getShopStoreArticles = async params => {
  const res = await request({
    url: `/api/v1/shop_stores/${params.id}/articles`,
    method: 'GET',
    params,
  });
  return res;
};
