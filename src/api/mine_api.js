import request from './request';

// 获取当前用户信息
export async function getCurrentAccount(token = '') {
  const res = await request({
    url: '/api/v1/mine/accounts/info',
    method: 'GET',
  });
  return res.data;
}

// 更新用户信息
export async function syncAccountInfo(data = {}) {
  const res = await request({
    url: '/api/v1/mine/accounts/' + data['id'],
    method: 'PUT',
    data: data,
  });

  return res.data;
}

// 输入验证码
export async function verifyInviteCode(data = {code: ''}) {
  const res = await request({
    url: '/api/v1/mine/accounts/verify_invite_code',
    method: 'POST',
    data: data,
  });
  return res.data;
}

//关注任意东西
export async function followItem(followable_type, followable_id) {
  const res = await request({
    url: `/api/v1/mine/accounts/follow`,
    method: 'POST',
    data: {
      followable_type: followable_type,
      followable_id: followable_id,
    },
  });
  return res.data;
}

//取消关注任意东西
export async function unfollowItem(followable_type, followable_id) {
  const res = await request({
    url: `/api/v1/mine/accounts/unfollow`,
    method: 'POST',
    data: {
      followable_type: followable_type,
      followable_id: followable_id,
    },
  });
  return res.data;
}

// 已坚持打卡多少天
export async function learningRecords() {
  const res = await request({
    url: `/api/v1/learnings/learning_records`,
    method: 'GET',
  });
  return res.data;
}

// 获取手机号
export async function fetchPhone(data = {}) {
  const res = await request({
    url: `/api/v1/mine/accounts/fetch_phone`,
    method: 'POST',
    data: data,
  });
  return res.data;
}

// 推荐关注用户
export async function recommendAccounts(params) {
  const res = await request({
    url: `/api/v1/mine/accounts/recommend_accounts`,
    method: 'GET',
    data: params,
  });
  return res;
}

// 用户权限
export async function accountsPermissions() {
  const res = await request({
    url: `/api/v1/mine/accounts/permissions`,
    method: 'GET',
  });
  return res.data;
}
