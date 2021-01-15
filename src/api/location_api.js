import request from './request';

// 获取位置详情
export const getLocations = async id => {
  const res = await request({
    url: `/api/v1/locations/${id}`,
    method: 'GET',
  });
  return res;
};

// 获具体位置id帖子
export const getLocationsPosts = async params => {
  const res = await request({
    url: `/api/v1/locations/${params.id}/posts`,
    method: 'GET',
  });
  return res;
};

// 创建位置
export const createLocations = async params => {
  const res = await request({
    url: '/api/v1/locations',
    method: 'POST',
    data: params,
  });
  return res;
};

// 位置搜索
export const getLocationsList = async params => {
  const res = await request({
    url: '/api/v1/locations/suggestion',
    method: 'GET',
    params,
  });
  return res;
};
