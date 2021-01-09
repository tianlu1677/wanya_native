import React, {Component} from 'react';
import axios from 'axios';
import qs from 'querystring';
import Helper from '../utils/helper';
import Toast from '@/components/Toast';
import * as RootNavigation from '@/navigator/root-navigation';
import {BaseApiUrl, WANYA_VERSION} from '@/utils/config';

axios.defaults.baseURL = `${BaseApiUrl}`;
axios.defaults.timeout = 20000;

// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    config.headers.common.version = WANYA_VERSION;
    // let token = await Helper.getData('auth_token');
    // config.headers.common.Token = token
    return config;
  },
  function (error) {
    console.log('error', error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response', response)
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response error', error.response);

    switch (error.response.status) {
      case 200:
        break;
      case 422:
        Toast.showError(Object.values(error.response.data)[0]);
        break;
      case 400:
        // debugger
        console.log('error', error.response.data.error);
        if (error.response.data && error.response.data.error) {
          Toast.showError(error.response.data.error);
        }
        return;
      case 401:
        Toast.showError('请重新登录');
        Helper.clearAllData();
        RootNavigation.reset({
          index: 0,
          routes: [{name: 'SocialLogin'}],
        });
        break;
      // return Promise.reject(error);
      // console.log('401, 未登录')
      // if (error.response.data.error === 'Your account is locked.') {
      //   storeData('lock_user', true);
      // }

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default async function requestHttp(options, url = null) {
  let data = {};
  let params = {};
  const auth_token = await Helper.getData('auth_token');

  if (options.method === 'GET') {
    params = {...options.data, ...options.params};
  } else {
    data = options.data;
  }
  let contentType = 'application/json';
  contentType = options.contentType || contentType;
  url = url || options.url;
  let request_options = {
    url: url,
    params: params,
    method: options.method || 'GET',
    headers: {
      'content-type': contentType,
      Token: auth_token,
    },
    responseType: 'json',
  };
  if (options.method !== 'GET') {
    request_options = {...request_options, data: data};
  }
  // console.log('requestHttp token', request_options)
  return axios(request_options);
}
