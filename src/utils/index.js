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

export const ScaleDistance = (distance = '') => {
  return distance ? (distance > 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`) : '';
};

export const FilterScore = value => {
  return value ? (value > 10000 ? `${Math.round((value / 10000) * 10) / 10}w` : value) : '';
};
