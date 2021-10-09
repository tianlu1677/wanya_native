import {Platform} from 'react-native';
// API 的相关配置
export const BaseProApi = 'https://meirixinxue.com/'; //'https://meirixinxue.com/';
// export const BaseProApi = 'https://xinxue.meirixinxue.com/'; //'https://meirixinxue.com/';
// export const BaseDevApi = 'https://xinxue.meirixinxue.com/';
// export const BaseDevApi = 'http://tl-test.ce04.com/';
export const BaseDevApi = 'https://meirixinxue.com/';

export const BaseApiUrl = __DEV__ ? BaseDevApi : BaseProApi;

//标识当前版本
export const WANYA_VERSION = '0.0.30';
// sentry 错误收集
export const BaseDevSentryURL = 'https://4a1adfee8b7e49dc91f3a0de7dfcde82@sentry.meirixinxue.com/5';
const BaseProSentryIOSURL = 'https://51fe408bc69c413989f6c84304eb13db@sentry.meirixinxue.com/6';
const BaseProSentryAndroidURL = 'http://a15165bfa1514bcfbfc94e2ad5b9b956@sentry.meirixinxue.com/7';
const BaseProSentryURL = Platform.OS === 'ios' ? BaseProSentryIOSURL : BaseProSentryAndroidURL;
export const BaseSentryURL = __DEV__ ? BaseDevSentryURL : BaseProSentryURL;

// 统计的key
const BASE_DEV_POSTHOG_KEY = 'phc_7oa7WciZKsaihLOfxD9TfxUnp3naK6E3YOkp277Ogx4';
const BASE_PRO_POSTHOG_KEY = 'phc_7oa7WciZKsaihLOfxD9TfxUnp3naK6E3YOkp277Ogx4';
export const BasePosthogKey = __DEV__ ? BASE_DEV_POSTHOG_KEY : BASE_PRO_POSTHOG_KEY;
// 高德定位的key
export const IOS_LOCATION_KEY = '6da6626cf6588fb6e3052deff1e8d4e9';
export const ANDROID_LOCATION_KEY = '648f6e4ce8f5b83b30e2eabcac060eee';

export const consumerWsUrl = auth_token => {
  const wsURL = BaseApiUrl.replace('https://', 'wss://');
  const wssUrl = `${wsURL}/cable?auth_token=${auth_token}`;
  return wssUrl;
};
