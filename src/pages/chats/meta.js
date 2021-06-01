export const translate = item => {
  const newItem = {
    id: item.id.toString(),
    type: item.category,
    content: item.content,
    targetId: item.creator.id.toString(),
    chatInfo: {
      avatar: item.target_account.avatar_url,
      id: item.target_account.id.toString(),
      nickName: item.target_account.nickname,
    },
    renderTime: true,
    sendStatus: 1,
    time: new Date(item.send_at).getTime(),
  };
  return newItem;
};
