import request from './request';

export const getAppCardList = async () => {
  const res = await request({
    url: '/api/v1/discovery/app_card_list.json',
    method: 'GET',
  });
  return res;
};

export async function getAppBanners(data = {}) {
  const res = await request({
    url: '/api/v1/discovery/app_banners',
    method: 'GET',
    data: data,
  });
  return res.data;
}

export async function getDiscoveryCards(data = {}) {
  const res = await request({
    url: '/api/v1/discovery/cards',
    method: 'GET',
    data: data,
  });
  return res.data;
}

export async function getHotHashtags(data = {}) {
  const res = await request({
    url: '/api/v1/discovery/hot_hashtags',
    method: 'GET',
    data: data,
  });
  return res.data;
}
