import request from './request'

// 兴趣广场页
export async function getCategories() {
  const res = await request({
    url: '/api/v1/categories',
    method: 'GET'
  })
  return res.data
}

export async function getCategoryList() {
  const res = await request({
    url: '/api/v1/categories/list',
    method: 'GET'
  })
  return res.data.categories
}

export async function getCategory(id) {
  const res = await request({
    url: `/api/v1/categories/${id}`,
    method: 'GET'
  })
  return res.data
}

export async function getCategoryTopics(id, queryUrl, params) {
  const res = await request({
    url: `/api/v1/categories/${id}/topics?${queryUrl}`,
    method: 'GET',
    params: params
  })
  return res
}

// // 获取分类下的热门课程
// export async function getCategoryHotCourses(id) {
//   const res = await request({
//     url: `/api/v1/categories/${id}/hot_courses`,
//     method: 'GET',
//   })
//   return res.data
// }
//
// // 获取分类下的每日推荐
// export async function getCategoryDailyCourses(id, params = {}) {
//   const res = await request({
//     url: `/api/v1/categories/${id}/courses`,
//     method: 'GET',
//     params: params
//   })
//   return res
// }

export async function getCategorySubsetDetail(id, params = {}) {
  const res = await request({
    url: `/api/v1/category_subsets/${id}`,
    method: "GET",
    params: params
  });
  return res.data;
}

export async function getCategoryMovements(id, params = {}) {
  const res = await request({
    url: `/api/v1/categories/${id}/movements`,
    method: "GET",
    params: params
  });
  return res.data;
}

export async function getCategoryProfile(id) {
  const res = await request({
    url: `/api/v1/categories/${id}/profile`,
    method: "GET",
  });
  return res.data;
}