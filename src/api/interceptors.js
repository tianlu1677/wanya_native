import Taro from '@tarojs/taro';

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NO_PERMISSION: 410,
};

export const REFRESH_STATUS = {
  NORMAL: 0,
  REFRESHING: 1,
  NO_MORE_DATA: 2,
};

/*获取当前页url*/
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  let url = currentPage.route;
  return url;
};

function showError(message, show = true) {
  // show &&
  // Taro.showToast({
  //   title: message || "请求出差了， 请稍后重试",
  //   icon: "none"
  // });
  return Promise.reject(message);
}

const customInterceptor = function (chain) {
  const requestParams = chain.requestParams;
  const {showToast} = requestParams;
  return chain
    .proceed(requestParams)
    .catch(res => {
      // 这个catch需要放到前面才能捕获request本身的错误，因为showError返回的也是Promise.reject
      return showError(res.error, showToast);
    })
    .then(res => {
      // 只要请求成功，不管返回什么状态码，都走这个回调
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return showError('请求资源不存在', showToast);
      } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return showError('服务端出现了问题', showToast);
      } else if (res.statusCode === HTTP_STATUS.NO_PERMISSION) {
        return showError(res.data.msg, showToast);
      } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        Taro.clearStorageSync('token');
        Taro.clearStorageSync('account_id');
        Taro.clearStorageSync('account_nickname');
        let path = getCurrentPageUrl();
        if (path !== '/pages/login/login') {
          Taro.navigateTo({
            url: '/pages/login/login',
          });
          return;
        }
        return showError('正在登录中', showToast);
      } else if (res.statusCode >= 400) {
        let errorMsg = res.data && res.data.message;
        errorMsg = errorMsg || res.error;
        return showError(errorMsg, showToast);
      } else {
        return res;
      }
    });
};

// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

const interceptors = [customInterceptor];

export default interceptors;
