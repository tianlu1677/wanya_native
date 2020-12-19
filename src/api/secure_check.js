import request from './request';

// 搜索课程
export async function secureCheck(type, content) {
  const res = await request({
    url: '/api/secure_checks',
    method: 'POST',
    data: {
      type: type,
      content: content,
    },
  });
  return res.data;
}

//投诉
export async function reportContent(
  data = {report_item_id: '', report_item_type: '', reason: '', more_reason: ''}
) {
  const res = await request({
    url: '/api/v1/reports',
    method: 'POST',
    data: data,
  });
  return res.data;
}
