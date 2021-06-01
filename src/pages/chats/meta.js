export const translate = item => {
  const newItem = {
    id: item.id.toString(),
    type: item.category,
    content: item.content,
    targetId: item.creator.id.toString(),
    chatInfo: {
      avatar: item.creator.avatar_url,
      id: item.creator.id.toString(),
      nickName: item.creator.nickname,
    },
    renderTime: true,
    sendStatus: 1,
    time: new Date(item.send_at).getTime(),
  };
  return newItem;
};
