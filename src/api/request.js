import axios from 'axios';
import qs from 'querystring';

axios.interceptors.request.use(
  async config => {
    // 在发送请求之前做些什么
    const {url} = config;
    // if (url.indexOf('sign_in') < 0) {
    //   let token = await AsyncStorage.getItem('rrs_token');
    //   // console.log('请求url', url);
    //   // console.log('请求token', token);
    //   config.headers.common.Authorization = token;
    //   config.headers.common.version = '1_0_0';
    //   config.headers.common.app_name = 'rrs';
    // }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
//
axios.interceptors.response.use(
  config => {
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    // switch (error.response.status) {
    //   case 200:
    //     storeData('lock_user', false);
    //     break;
    //   case 422:
    //     Toast.show(Object.values(error.response.data)[0], {
    //       containerStyle: {
    //         width: 200,
    //       },
    //       duration: Toast.durations.SHORT,
    //       position: 0,
    //       shadow: false,
    //       animation: true,
    //       hideOnPress: true,
    //       delay: 0,
    //     });
    //     break;
    //   case 401:
    //     if (error.response.data.error === 'Your account is locked.') {
    //       storeData('lock_user', true);
    //     }
    //     break;
    //   default:
    //     break;
    // }

    return Promise.reject(error);
  },
);

const BASE_URL = 'https://xinxue.niubibeta.com'
// const BASE_URL = 'https://meirixinxue.com'


export default async function request(options, url = null) {
  let data = {}
  const token = 'xxxx'
  if (options.method === 'GET') {
    data = { ...options.data, ...options.params }
  } else {
    data = options.data
  }
  let contentType = 'application/json'
  contentType = options.contentType || contentType
  url = url || options.url
  const request_options = {
    url: url,
    baseURL: BASE_URL,
    data: data,
    method: options.method || 'GET',
    headers: {
      'content-type': contentType,
      Token: token
    },
    responseType: 'json',
  }
  console.log(request_options)

  return new Promise(async (resolve, reject) => {
    const res = await axios(request_options);
    resolve(res)
  })


  // return Taro.request(request_options)
}

