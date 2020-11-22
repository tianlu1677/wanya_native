import request from './request';

export async function wechatLogin(data = {form_ids: []}) {
  const res = await request({
    url: '/api/v1/notify_records',
    method: 'POST',
    data: data,
  });
  return res.data;
}

export async function sendPhoneCode(data = {phone: '', secret: '', timestamp: ''}) {
  const res = await request({
    url: '/api/v1/phones/send_phone_code',
    method: 'POST',
    data: data,
  });
  return res.data;
}

export async function verifyPhoneCode(data = {phone: '', phone_code: ''}) {
  const res = await request({
    url: '/api/v1/phones/verify_phone_code',
    method: 'POST',
    data: data,
  });
  return res.data;
}

export async function verifyInviteCode(data = {invite_code: ''}) {
  const res = await request({
    url: '/api/v1/invites',
    method: 'POST',
    data: data,
  });
  return res.data;
}

//验证码登录
export async function phonePasswordLogin(data = {phone: '', phone_code: ''}) {
  const res = await request({
    url: '/api/v1/phones/phone_login',
    method: 'POST',
    data: data,
  });
  return res.data;
}
