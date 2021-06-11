import {VWValue} from '@/utils/response-fontsize';

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

export const scaleFixedWidth = (media, innerWidth) => {
  const defaultWidth = media.width;
  const defaultHeight = media.height;

  const width = innerWidth ? innerWidth : VWValue(104);
  const height = (defaultHeight * width) / defaultWidth;

  return {width: Math.ceil(width), height: Math.ceil(height)};
};

export const calculateImg = (width, height) => {
  let newWidth = 500;
  let newHeight = 500;
  let x = (width / height).toFixed(2);
  let attr = {};
  if (x > 0 && x <= 0.33) {
    newHeight = 420;
    newWidth = newHeight / 3;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 0.33 && x <= 1) {
    newHeight = 420;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 1 && x <= 2) {
    newWidth = 480;
    newHeight = (height * newWidth) / width;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2 && x <= 2.89) {
    newHeight = 240;
    newWidth = newHeight * x;
    attr = {width: newWidth, height: newHeight};
  } else if (x > 2.89) {
    newHeight = 240;
    newWidth = newHeight * 2.89;
    attr = {width: newWidth, height: newHeight};
  }
  return {...attr, x: x};
};

// 0.33 1/3
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
