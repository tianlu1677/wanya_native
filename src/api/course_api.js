import request from './request';

// 课程详情页
export async function getCourse(id) {
  const res = await request({
    url: '/api/v1/courses/' + id,
    method: 'GET',
  });
  return res.data;
}

// 课程列表页
export async function getCourseList(url, params = {}) {
  const res = await request({
    url: '/api/v1/courses?' + url,
    method: 'GET',
    data: params,
  });
  return res;
}
// 课程基本信息页
export async function getCourseBase(id) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/base',
    method: 'GET',
  });
  return res.data;
}

// 学习记录
export async function createLearning(lesson_id = '') {
  const res = await request({
    url: '/api/v1/learnings',
    method: 'POST',
    data: {lesson_id: lesson_id},,
  });
  return res.data;
}

// //获取学习记录
export async function getLearningStatus(id) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/learning',
    method: 'GET',
  });
  return res.data;
}

// 参与课程
export async function createEnrollment(data = {course_id: ''}) {
  const res = await request({
    url: '/api/v1/enrollments',
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 用户有没有参与该课程
export async function getCourseEnrollmentDetail(params = {course_id: ''}) {
  const res = await request({
    url: '/api/v1/enrollments/detail',
    method: 'GET',
    params: params,
  });
  return res.data;
}

// 课程下所有帖子
export async function getCourseTopics(id, params = {}) {
  const res = await request({
    url: '/api/v1/courses/' + id + '/topics',
    method: 'GET',
    params: params,
  });
  return res;
}

// 点赞，收藏, 分享, 查看
// type(praise, star, share, view)
export async function courseCreateAction(id, type) {
  const res = await request({
    url: `/api/v1/courses/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
}

// 取消点赞,收藏, type: praise, star, share, view
export async function courseDestroyAction(id, type) {
  const res = await request({
    url: `/api/v1/courses/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type,
    },
  });
  return res.data;
}

// 课程列表
export async function getCoursesList(queryUrl, paginate) {
  const res = await request({
    url: `/api/v1/courses?${queryUrl}`,
    method: 'GET',
    params: paginate,
  });
  return res;
}
