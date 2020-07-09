import request from "./request";

export async function uploadFormId(data = {form_ids: [] }) {
  const res = await request({
    url: `/api/v1/notify_records`,
    method: "POST",
    data: data
  });
  return res.data;
}

export async function uploadSubscribeNotice(data = {notice: {} }) {
  const res = await request({
    url: `/api/v1/notify_records/subscribe_notice`,
    method: "POST",
    data: data
  });
  return res.data;
}


export async function readNotifyRecord(notify_record_id, data = {}) {
  const res = await request({
    url: `/api/v1/notify_records/${notify_record_id}`,
    method: "PUT",
    data: data
  });
  return res.data;
}
