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

// 发布玩法
export const publishTheory = async (id, data) => {
  const res = await request({
    url: `/api/v1/theories/${id}/publish`,
    method: 'POST',
    data,
  });
  return res.data;
};

// 删除玩法
export const deleteTheory = async id => {
  const res = await request({
    url: `/api/v1/theories/${id}`,
    method: 'DELETE',
  });
  return res.data;
};

// 编辑玩法
export const refreshTheory = async (id, data) => {
  const res = await request({
    url: `/api/v1/theories/${id}`,
    method: 'PUT',
    data,
  });
  return res.data;
};

// 创建步骤
export const addTheoryBody = async id => {
  const res = await request({
    url: `/api/v1/theories/${id}/add_theory_body`,
    method: 'POST',
  });
  return res.data;
};

// 编辑步骤
export const refreshTheoryBody = async (id, data) => {
  const res = await request({
    url: `/api/v1/theories/${id}/update_theory_body`,
    method: 'POST',
    data,
  });
  return res.data;
};

// 删除步骤
export const deleteTheoryBody = async (id, data) => {
  const res = await request({
    url: `/api/v1/theories/${id}/delete_theory_body`,
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
  return res;
};
