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
