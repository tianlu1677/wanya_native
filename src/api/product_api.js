import request from './request';

export const getProductsItemDetail = async params => {
  const res = await request({url: '/api/v1/products/item_detail', method: 'GET', params});
  return res;
};

export const createProducts = async data => {
  const res = await request({url: '/api/v1/products', method: 'POST', data});
  return res;
};

export const getProductsList = async params => {
  const res = await request({url: '/api/v1/products', method: 'GET', params});
  return res;
};

export const getProducts = async id => {
  const res = await request({url: `/api/v1/products/${id}`, method: 'GET'});
  return res;
};

export const getProductsPost = async id => {
  const res = await request({url: `/api/v1/products/post`, method: 'GET'});
  return res;
};
