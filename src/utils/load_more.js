// import Taro from "@tarojs/taro/types/index"

export function pagination (headers = {}){
  const currentPage = parseInt(headers['X-Current-Page']);
  const perPage = parseInt(headers['X-Per-Page'] || headers['X-Page-Items']);
  const total = parseInt(headers['X-Total']);
  const hasMore = currentPage * perPage < total;
  const nextPage = hasMore ? currentPage + 1 : currentPage;
  return { hasMore: hasMore, nextPage: nextPage, page: currentPage, total: total}
}
