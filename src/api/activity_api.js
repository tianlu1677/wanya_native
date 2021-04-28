import request from './request';

// 活动列表
export const getActivityList = async params => {
  const res = await request({
    url: '/api/v1/activities',
    method: 'GET',
    params,
  });
  return res;
};

// 活动详情
export const getActivityDetail = async id => {
  const res = await request({
    url: `/api/v1/activities/${id}`,
    method: 'GET',
  });
  return res;
};

// 参与活动
export const joinActivity = async id => {
  const res = await request({
    url: `/api/v1/activities/${id}/joined`,
    method: 'POST',
  });
  return res;
};

// 退出活动
export const exitActivity = async id => {
  const res = await request({
    url: `/api/v1/activities/${id}/exit`,
    method: 'POST',
  });
  return res;
};

// 参与活动列表
export const joinAccountsActivity = async params => {
  const res = await request({
    url: `/api/v1/activities/${params.id}/join_accounts`,
    method: 'GET',
    params,
  });
  return res;
};

// 创建活动
export async function createActivity(data = {}) {
  const res = await request({
    url: '/api/v1/activities',
    method: 'POST',
    data,
  });
  return res.data;
}

// 修改活动
export async function editActivity(id, data) {
  const res = await request({
    url: `/api/v1/activities/${id}`,
    method: 'PUT',
    data,
  });
  return res.data;
}
