import request from './request.js';

export const getChatGroups = async params => {
  const res = await request({
    url: '/api/v1/chat_groups',
    method: 'GET',
    params,
  });
  return res;
};

export const getChatGroupsDetail = async params => {
  const res = await request({
    url: '/api/v1/chat_groups/detail',
    method: 'GET',
    params,
  });
  return res;
};

export const getChatGroupsConversations = async params => {
  const res = await request({
    url: '/api/v1/chat_groups/conversations',
    method: 'GET',
    params,
  });
  return res;
};

export const getChatGroupsSendMessage = async data => {
  const res = await request({
    url: '/api/v1/chat_groups/send_message',
    method: 'POST',
    data,
  });
  return res;
};

// 消息已读
export const readSingleChatGroupMessage = async data => {
  const res = await request({
    url: '/api/v1/chat_groups/read',
    method: 'POST',
    data,
  });
  return res;
};
