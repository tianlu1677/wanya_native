// API 的相关配置
// export const BaseProApi = 'https://meirixinxue.com/';//'https://meirixinxue.com/';
export const BaseProApi = 'https://xinxue.meirixinxue.com/';//'https://meirixinxue.com/';
// export const BaseDevApi = 'https://meirixinxue.com/';
export const BaseDevApi = 'https://xinxue.meirixinxue.com';

export const BaseApiUrl = __DEV__ ? BaseDevApi : BaseProApi;
