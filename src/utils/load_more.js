// import Taro from "@tarojs/taro/types/index"

export function pagination (headers = {}){
  // console.log('xxxxxxx', headers)
  const currentPage = parseInt(headers['x-current-page']);
  const perPage = parseInt(headers['x-per-page'] || headers['X-Page-Items']);
  const total = parseInt(headers['x-total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return { hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total}
}
