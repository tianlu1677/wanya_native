import request from './request';

export const getProductsPost = async params => {
  const res = await request({
    url: '/api/v1/products',
    method: 'GET',
    params,
  });
  return res;
};

export const getProducts = async id => {
  const res = await request({
    url: `/api/v1/products/${id}`,
    method: 'GET',
  });
  return res;
};
