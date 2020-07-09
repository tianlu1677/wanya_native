import request from './request'

// 课时列表
export async function getLessons(course_id) {
  const res = await request({
    url: `/api/v1/courses/${course_id}/lessons`,
    method: 'GET'
  })
  return res.data
}

export async function getLessonList(params = {}, queryUrl = '') {
  const res = await request({
    url: `/api/v1/lessons?${queryUrl}`,
    method: "GET",
    data: params
  });
  return res;
}

// 课时详情
export async function getLesson(lesson_id) {
  const res = await request({
    url: `/api/v1/lessons/${lesson_id}`,
    method: 'GET'
  })
  return res.data
}

// 课时下所有帖子
export async function getLessonTopics(id, params = {}) {
  const res = await request({
    url: '/api/v1/lessons/' + id + '/topics',
    method: 'GET',
    params: params
  })
  return res
}

// 课时基本信息
export async function getLessonBase(lesson_id) {
  const res = await request({
    url: `/api/v1/lessons/${lesson_id}/base`,
    method: 'GET'
  })
  return res.data
}

// 点赞，收藏, 分享, 查看
// type(praise, star, share, view)
export async function createLessonAction(id, type) {
  const res = await request({
    url: `/api/v1/lessons/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type
    }

  })
  return res.data
}

// 取消点赞,收藏, type: praise, star, share, view
export async function destroyLessonAction(id, type) {
  const res = await request({
    url: `/api/v1/lessons/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type
    }
  })
  return res.data
}
