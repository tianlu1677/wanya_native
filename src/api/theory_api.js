import request from './request';

// 创建玩法
export const createTheory = async data => {
  const res = await request({
    url: '/api/v1/theories',
    method: 'POST',
    data,
  });
  return res.data;
};

//玩法详情
export const getTheoriy = async id => {
  const res = await request({
    url: `/api/v1/theories/${id}`,
    method: 'GET',
  });
  return res.data;
};
