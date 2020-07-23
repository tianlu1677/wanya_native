import axios from 'axios';
import qs from 'querystring';
import { getData } from '../utils/storage'

const VERSION = '1.0.0'
const BASE_URL = 'https://xinxue.niubibeta.com'

axios.defaults.baseURL = BASE_URL;

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
  config.headers.common.Token = await getData('auth_token')
  config.headers.common.version = VERSION
  return config;
}, function (error) {
  console.log('error', error)
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('response', response)
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('request error', error)
  switch (error) {
    case 200:
      // storeData('lock_user', false);
      break;
    case 422:
      // Toast.show(Object.values(error.response.data)[0], {
      //   containerStyle: {
      //     width: 200,
      //   },
      //   duration: Toast.durations.SHORT,
      //   position: 0,
      //   shadow: false,
      //   animation: true,
      //   hideOnPress: true,
      //   delay: 0,
      // });
      break;
    case 400:
      console.log('error', error)
      break;
    case 401:
      // if (error.response.data.error === 'Your account is locked.') {
      //   storeData('lock_user', true);
      // }
      break;
    default:
      break;
  }

  return Promise.reject(error);
});

export default  function requestHttp(options, url = null) {
  let data = {}
  let params = {}
  if (options.method === 'GET') {
    params = {...options.data, ...options.params}
  } else {
    data = options.data
  }
  let contentType = 'application/json'
  contentType = options.contentType || contentType
  url = url || options.url
  let request_options = {
    url: url,
    params: params,
    method: options.method || 'GET',
    headers: {
      'content-type': contentType,
    },
    responseType: 'json',
  }
  if(options.method !== 'GET') {
    request_options = {request_options, data: data}
  }
  console.log(request_options)
  return axios(request_options)
}
