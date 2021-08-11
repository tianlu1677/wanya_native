import {Dimensions} from 'react-native';
import {VWValue} from '@/utils/response-fontsize';
const {width: screenWidth} = Dimensions.get('window');

// 顽法图片视频显示宽高比
export const scaleSize = (media, innerWidth) => {
  const defaultScale = 3 / 4;

  const defaultWidth = media.width || innerWidth;
  const defaultHeight = media.height || innerWidth;

  const scale = defaultWidth / defaultHeight;

  const scaleHeight = (innerWidth * 4) / 3;
  const originalScaleHeight = (defaultHeight * innerWidth) / defaultWidth;

  const height = scale > defaultScale ? originalScaleHeight : scaleHeight;
  const width = innerWidth;

  return {width: Math.ceil(width), height: Math.ceil(height)};
};

// 活动显示宽高比
export const scaleFixedWidth = (media, innerWidth) => {
  const defaultWidth = media.width;
  const defaultHeight = media.height;

  const width = innerWidth ? innerWidth : VWValue(104);
  const height = (defaultHeight * width) / defaultWidth;

  return {width: Math.ceil(width), height: Math.ceil(height)};
};

// 单排列表图片视频显示宽高比
export const calculateImg = (width, height) => {
  const scale = (width / height).toFixed(2);
  let scaleWidth = 500;
  let scaleHeight = 500;

  if (scale > 0 && scale < 0.66) {
    scaleWidth = 420;
    scaleHeight = 560;
  }

  if (scale >= 0.66 && scale <= 1) {
    scaleWidth = 420;
    scaleHeight = scaleWidth / scale;
  }

  if (scale > 1 && scale <= 2) {
    scaleWidth = 480;
    scaleHeight = (height * scaleWidth) / width;
  }

  if (scale > 2 && scale <= 2.89) {
    scaleHeight = 240;
    scaleWidth = scaleHeight * scale;
  }

  if (scale > 2.89) {
    scaleHeight = 240;
    scaleWidth = scaleHeight * 2.89;
  }

  return {width: Math.ceil(scaleWidth / 2), height: Math.ceil(scaleHeight / 2)};
};

//帖子详情图片显示
export const scaleDetailImage = images => {
  const scale = 3 / 4;
  images = images.map((image, index) => {
    const scaleImages = images.map(item => item.width / item.height);
    const minScale = Math.min.apply(null, scaleImages);
    const minIndex = scaleImages.findIndex(item => item === minScale);
    if (minScale <= scale) {
      const height = Math.ceil((screenWidth * 4) / 3);
      return {
        ...image,
        width: screenWidth,
        height,
        mode: index === minIndex ? 'cover' : 'contain',
      };
    } else {
      const height = Math.ceil((screenWidth * image.height) / image.width);
      return {
        ...image,
        width: screenWidth,
        height,
        mode: index === minIndex ? 'cover' : 'contain',
      };
    }
  });

  return images;
};

//帖子详情视频显示
export const scaleDetailVideo = (width = screenWidth, height = screenWidth) => {
  const scale = 3 / 4;
  const videoScale = width / height;

  if (videoScale <= scale) {
    const scaleHeight = Math.ceil((screenWidth * 4) / 3);
    return {width: screenWidth, height: scaleHeight};
  } else {
    const scaleHeight = Math.ceil((screenWidth * height) / width);
    return {width: screenWidth, height: scaleHeight};
  }
};

// 聊天列表图片视频显示宽高比   0.33 1/3
export const scaleChatSize = media => {
  const defaultSize = VWValue(140);
  const mediaWidth = media.width || defaultSize;
  const mediaHeight = media.height || defaultSize;
  const scale = mediaWidth / mediaHeight;

  let width = null;
  let height = null;

  if (scale === 1) {
    width = defaultSize;
    height = defaultSize;
  }

  if (scale > 1) {
    width = defaultSize;
    height = (defaultSize * mediaHeight) / mediaWidth;
  }

  if (scale < 0.33) {
    width = VWValue(70);
    height = (VWValue(70) * 210) / 70;
  }

  if (scale < 1 && scale >= 0.33) {
    width = (VWValue(210) * mediaWidth) / mediaHeight;
    height = VWValue(210);
  }

  return {width: Math.ceil(width), height: Math.ceil(height)};
};
