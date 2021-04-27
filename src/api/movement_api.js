import request from './request';

// 顽招列表
export const getMovements = async (params, apiPath) => {
  const res = await request({
    url: `/api/v1/movements?${apiPath}`,
    method: 'GET',
    params,
  });
  return res;
};

// 顽招详情
export const getMovementDetail = async id => {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'GET',
  });
  return res;
};

// 顽招Get
export const getMovementJoined = async id => {
  const res = await request({
    url: `/api/v1/movements/${id}/joined`,
    method: 'POST',
  });
  return res;
};

// 顽招取消Get
export const getMovementExit = async id => {
  const res = await request({
    url: `/api/v1/movements/${id}/exit`,
    method: 'POST',
  });
  return res;
};

// 顽招收藏用户
export const getMovementJoinAccounts = async (id, params) => {
  const res = await request({
    url: `/api/v1/movements/${id}/joined_accounts`,
    method: 'GET',
    params,
  });
  return res;
};

// 顽招帖子
export const getMovementsPosts = async params => {
  const res = await request({
    url: `/api/v1/movements/${params.id}/posts`,
    method: 'GET',
    params,
  });
  return res;
};

//顽招详情教程
export const getMovementLessons = async params => {
  const res = await request({
    url: `/api/v1/movements/${params.id}`,
    method: 'GET',
    params,
  });
  return res;
};

// 顽招创建
export const createMovements = async data => {
  const res = await request({
    url: '/api/v1/movements',
    method: 'POST',
    data,
  });
  return res;
};

// 顽招编辑
export const editMovements = async (id, data) => {
  const res = await request({
    url: `/api/v1/movements/${id}`,
    method: 'POST',
    data,
  });
  return res;
};

//创建顽招的分类
export async function getMovementJoinCategory() {
  const res = await request({
    url: '/api/v1/movements/movement_category',
    method: 'GET',
  });
  return res.data;
}
