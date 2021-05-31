export const translate = item => {
  const newItem = {
    id: item.id,
    type: item.category,
    content: item.content,
    targetId: item.creator.id,
    chatInfo: {
      avatar: item.target_account.avatar_url,
      id: item.target_account.id,
      nickName: item.target_account.nickname,
    },
    renderTime: true,
    sendStatus: 1,
    time: new Date(item.send_at).getTime(),
  };
  return newItem;
};
