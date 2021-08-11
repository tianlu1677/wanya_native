export const TransFormType = item => {
  const {type, content_style, is_long_video} = item;
  switch (type) {
    case 'topic':
      return content_style === 'video' && is_long_video ? '长视频' : '帖子';
    case 'article':
      return '文章';
    case 'Theory':
      return '顽法';
    default:
      return '';
  }
};
