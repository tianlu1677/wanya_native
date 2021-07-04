import request from './request.js';

// 用户登录
export async function loginSystem(params = {code: ''}) {
  const res = await request({
    url: '/api/sessions/get_session_key',
    method: 'POST',
    data: params,
  });
  return res.data;
}

// 最新用户登录
export async function buildAccount(params = {code: ''}) {
  const res = await request({
    url: '/api/sessions/build_account',
    method: 'POST',
    data: params,
  });
  return res.data;
}

// 获取当前用户信息
export async function getCurrentAccount() {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
  });
  return res.data;
}

// 更新用户头像昵称等数据
export async function syncAccountInfo(data = {}) {
  console.log('data ai', data);
  const res = await request({
    url: '/api/v1/mine/accounts/' + data.id,
    method: 'PUT',
    data,
  });
  console.log('reere', res);
  return res.data;
}

// 获取微信中的用户信息
export async function updateAccountInfo(
  data = {session_key: '', encrypted_data: '', iv: '', raw_data: ''}
) {
  const res = await request({
    url: '/api/sessions/update_account',
    method: 'POST',
    data: data,
  });
  return res.data;
}

//用户的详情页
export const getAccount = async id => {
  const res = await request({
    url: `/api/v1/accounts/${id}`,
    method: 'GET',
  });
  return res;
};

//用户的基本信息
export const getAccountBaseInfo = async params => {
  const res = await request({
    url: '/api/v1/accounts/base_info',
    method: 'GET',
    params,
  });
  return res;
};

// 发布的帖子 收藏，喜欢的帖子
// type= publish, praise, star
export const getAccountArticles = async params => {
  const res = await request({
    url: `/api/v1/accounts/${params.id}/articles`,
    method: 'GET',
    params,
  });
  return res;
};

// export async function getAccountBaseInfo(nickname) {
//   const res = await request({
//     url: '/api/v1/accounts/base_info',
//     method: 'GET',
//     params: {name: nickname},
//   });
//   return res.data.account;
// }

// 发布的帖子 收藏，喜欢的帖子
// type= publish, praise, star
export async function getAccountTopics(id, type, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/topics`,
    method: 'GET',
    params: {
      type: type,
      ...params,
    },
  });
  return res;
}

// 收藏，喜欢的动态
// type= publish, praise, star
// export async function getAccountPosts(id, type, params = {}) {
//   const res = await request({
//     url: `/api/v1/accounts/${id}/posts`,
//     method: 'GET',
//     params: {
//       type: type,
//       ...params,
//     },
//   });
//   return res;
// }

// 发布的帖子 收藏，喜欢的帖子
// type= publish, praise, star
// export async function getAccountArticles(id, type, params = {}) {
//   const res = await request({
//     url: `/api/v1/accounts/${id}/articles`,
//     method: 'GET',
//     params: {
//       type: type,
//       ...params,
//     },
//   });
//   return res;
// }

// 发布的课程, 学过的课程， 收藏的课程
// type: publish, learn, star, praise, view
export async function getAccountCourses(id, type = 'publish', params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/courses`,
    method: 'GET',
    params: {
      type: type,
      ...params,
    },
  });
  return res;
}

// 课时, 喜欢收藏的课时
// type: star, praise, view
export async function getAccountLessons(id, type, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/lessons`,
    method: 'GET',
    params: {
      type: type,
      ...params,
    },
  });
  return res;
}

// 获取课时相关的统计数据
// types = "praise_lessons,star_lessons"
export async function getAccountCounts(id, opts = {types: ''}) {
  const res = await request({
    url: `/api/v1/accounts/${id}/counts`,
    method: 'GET',
    params: {
      types: opts.types,
    },
  });
  return res.data;
}

// 关注用户
// export async function followAccount(id) {
//   const res = await request({
//     url: `/api/v1/accounts/${id}/follow`,
//     method: 'POST',
//   });
//   return res.data;
// }

// // 取消关注用户
// export async function unfollowAccount(id) {
//   const res = await request({
//     url: `/api/v1/accounts/${id}/unfollow`,
//     method: 'POST',
//   });
//   return res.data;
// }

// 我的评论
export async function getReplyComments(params = {}) {
  const res = await request({
    url: '/api/v1/mine/comments',
    method: 'GET',
    params: params,
  });

  return res;
}

// 我的赞
export async function getInsideNotifies(params = {}) {
  const res = await request({
    url: '/api/v1/mine/inside_notifies',
    method: 'GET',
    params: params,
  });

  return res;
}

export async function getPraiseNotifies(params = {}) {
  const res = await request({
    url: '/api/v1/mine/inside_notifies/praise_notices',
    method: 'GET',
    params: params,
  });

  return res;
}

export async function getMentionAccountNotifies(params = {}) {
  const res = await request({
    url: '/api/v1/mine/inside_notifies/mention_account_notices',
    method: 'GET',
    params: params,
  });

  return res;
}

export async function getSystemNotifies(params = {}) {
  const res = await request({
    url: '/api/v1/mine/inside_notifies/system_notices',
    method: 'GET',
    params: params,
  });

  return res;
}

// 阅读信息
export async function readMessages() {
  const res = await request({
    url: '/api/v1/mine/accounts/read_messages',
    method: 'POST',
  });

  return res.data;
}

// 是否学习过课程

export async function isLearnCourse(account_id) {
  const res = await request({
    url: `/api/v1/accounts/${account_id}/is_learned_course`,
    method: 'GET',
  });

  return res.data;
}

// // 用户的粉丝列表
// export async function getAccountFollowers(account_id, params = {}) {
//   const res = await request({
//     url: `/api/v1/accounts/${account_id}/followers`,
//     method: 'GET',
//     params: params,
//   });

//   return res;
// }

// 用户的粉丝列表

// export async function getAccountFollowings(account_id, params = {}) {
//   const res = await request({
//     url: `/api/v1/accounts/${account_id}/followings`,
//     method: 'GET',
//     params: params,
//   });

//   return res;
// }

export async function getAccountRecentFollowers(params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${params.id}/recent_followers`,
    method: 'GET',
    params: params,
  });

  return res;
}

export async function createAccountSystemInfo(data = {}) {
  const res = await request({
    url: '/api/v1/records/record_system_info',
    method: 'POST',
    data: data,
  });

  return res;
}

export async function createAccountRecordWatchVideoPost(data = {}) {
  const res = await request({
    url: '/api/v1/records/record_watched_video_post_ids',
    method: 'POST',
    data: data,
  });

  return res;
}

export async function getAccountActivities(account_id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${account_id}/activities`,
    method: 'GET',
    params: params,
  });

  return res;
}

// 用户顽招
export async function getAccountMovements(account_id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${account_id}/movements`,
    method: 'GET',
    params: params,
  });
  return res;
}

// 用户场地
export async function getAccountSpaces(account_id, params = {}) {
  const res = await request({
    url: `/api/v1/accounts/${account_id}/spaces`,
    method: 'GET',
    params: params,
  });
  return res;
}

//用户填写邀请码
export async function writeInviteCode(invite_code = '') {
  const res = await request({
    url: '/api/v1/invites',
    method: 'POST',
    data: {invite_code: invite_code},
  });
  return res.data;
}

// 用户自己的邀请码以及邀请页面
export async function getInviteCode() {
  const res = await request({
    url: '/api/v1/invites/generate_code',
    method: 'POST',
  });
  return res.data;
}

export async function getAccountInviteList(data = {}) {
  const res = await request({
    url: '/api/v1/invites/invite_accounts',
    method: 'GET',
    params: {},
  });
  return res.data;
}

// 用户的粉丝列表
// export const getAccountFollowers = async params => {
//   const res = await request({
//     url: `/api/v1/accounts/${params.id}/followers`,
//     method: 'GET',
//     params,
//   });
//   return res;
// };

// 主页 动态publish 喜欢praise 视频publish_video
export const getAccountPosts = async params => {
  const res = await request({
    url: `/api/v1/accounts/${params.id}/posts`,
    method: 'GET',
    params,
  });
  return res;
};

// 关注用户
export const followAccount = async id => {
  const res = await request({
    url: `/api/v1/accounts/${id}/follow`,
    method: 'POST',
  });
  return res;
};

// 取消关注用户
export const unfollowAccount = async id => {
  const res = await request({
    url: `/api/v1/accounts/${id}/unfollow`,
    method: 'POST',
  });
  return res;
};

// 用户关注列表
export const getAccountFollowings = async params => {
  const res = await request({
    url: `/api/v1/accounts/${params.id}/followings`,
    method: 'GET',
    params,
  });
  return res;
};

// 用户粉丝列表
export const getAccountFollowers = async params => {
  const res = await request({
    url: `/api/v1/accounts/${params.id}/followers`,
    method: 'GET',
    params,
  });
  return res;
};

// export async function getAccountFollowers(params) {
//   const res = await request({
//     url: `/api/v1/accounts/${account_id}/followers`,
//     method: 'GET',
//     params
//   })
//   return res
// }
// export async function getAccountFollowings(account_id, params = {}) {
//   const res = await request({
//     url: `/api/v1/accounts/${account_id}/followings`,
//     method: 'GET',
//     params: params,
//   });

//   return res;
// }
