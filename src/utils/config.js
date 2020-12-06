// API 的相关配置
export const BaseProApi = 'https://meirixinxue.com/';//'https://meirixinxue.com/';
// export const BaseProApi = 'https://xinxue.meirixinxue.com/';//'https://meirixinxue.com/';
// export const BaseDevApi = 'https://meirixinxue.com/';
export const BaseDevApi = 'https://xinxue.meirixinxue.com';

export const BaseApiUrl = __DEV__ ? BaseDevApi : BaseProApi;

// sentry 错误收集
export const BaseDevSentryURL = 'https://4a1adfee8b7e49dc91f3a0de7dfcde82@sentry.meirixinxue.com/5';
export const BaseProSentryURL = 'https://51fe408bc69c413989f6c84304eb13db@sentry.meirixinxue.com/6';
export const BaseSentryURL = __DEV__ ? BaseDevSentryURL : BaseProSentryURL
