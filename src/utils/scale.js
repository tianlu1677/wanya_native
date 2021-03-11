export const scaleSize = (media, innerWidth) => {
  const defaultScale = 3 / 4;

  const defaultWidth = media.width || innerWidth;
  const defaultHeight = media.height || innerWidth;

  const scale = defaultWidth / defaultHeight;

  const scaleHeight = (innerWidth * 4) / 3;
  const originalScaleHeight = (defaultHeight * innerWidth) / defaultWidth;

  const height = scale > defaultScale ? originalScaleHeight : scaleHeight;
  const width = innerWidth;

  return {width, height};
};
