import {VWValue} from '@/utils/response-fontsize';

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

  if (scale > 0.66 && scale <= 1) {
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
  return {width: Math.ceil(scaleWidth / 2), height: Math.ceil(scaleWidth / 2)};
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
