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

//remove
// const data = {id: theory.id, theory_body_id: 2};
// await deleteTheoryBody(theory.id, data);

export const deleteTheoryBody = async (id, data) => {
  const res = await request({
    url: `/api/v1/theories/${id}/delete_theory_body`,
    method: 'POST',
    data,
  });
  return res.data;
};

// 是否存在最新的草稿顽法
export const draftTheory = async () => {
  const res = await request({
    url: '/api/v1/theories/draft',
    method: 'GET',
  });
  return res.data;
};

// 取消保存顽法
export const wastedTheory = async id => {
  const res = await request({
    url: `/api/v1/theories/${id}/wasted`,
    method: 'POST',
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
