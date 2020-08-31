import request from './request'

// 登录
export async function phoneSignIn(data = { phone: "", password: "" }) {
  const res = await request({
    url: '/api/sign_in.json',
    method: 'POST',
    data: data
  })
  return res.data
}


export async function appWechatSignIn(data = {code: '', app_id: '', source: ''}) {
  const res = await request({
    url: '/api/sessions/app_wechat_login.json',
    method: 'POST',
    data: data
  })
  return res.data
}
