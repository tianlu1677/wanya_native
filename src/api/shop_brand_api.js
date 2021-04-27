import request from './request';

// 品牌列表
export const getShopBrands = async (params, apiPath) => {
  console.log(apiPath);
  const res = await request({
    url: `/api/v1/shop_brands?${apiPath}`,
    method: 'GET',
    params,
  });
  return res;
};

// 品牌详情
export const getShopBrandDetail = async id => {
  const res = await request({
    url: `/api/v1/shop_brands/${id}`,
    method: 'GET',
  });
  return res;
};

// 品牌收藏
export const getShopBrandJoined = async id => {
  const res = await request({
    url: `/api/v1/shop_brands/${id}/joined`,
    method: 'POST',
  });
  return res;
};

// 品牌取消收藏
export const getShopBrandExit = async id => {
  const res = await request({
    url: `/api/v1/shop_brands/${id}/exit`,
    method: 'POST',
  });
  return res;
};

// 品牌收藏用户
export const getShopBrandJoinAccounts = async params => {
  const res = await request({
    url: `/api/v1/shop_brands/${params.id}/joined_accounts`,
    method: 'GET',
    params,
  });
  return res;
};

// 品牌详情动态
export const getShopBrandPosts = async params => {
  const res = await request({
    url: `/api/v1/shop_brands/${params.id}/posts`,
    method: 'GET',
    params,
  });
  return res;
};

// 品牌详情帖子
export const getShopBrandTopics = async params => {
  const res = await request({
    url: `/api/v1/shop_brands/${params.id}/topics`,
    method: 'GET',
    params,
  });
  return res;
};

// 品牌详情文章
export const getShopBrandArticles = async params => {
  const res = await request({
    url: `/api/v1/shop_brands/${params.id}/articles`,
    method: 'GET',
    params,
  });
  return res;
};
