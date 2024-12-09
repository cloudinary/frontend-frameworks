import { Rotate } from '../transformationTypes/rotate';

export const parseRotate = (rotate: Rotate): `a_${string}` => {
  if (typeof rotate === 'number') {
    return `a_${rotate}`;
  }

  switch (rotate.mode) {
    case 'auto-left':
      return `a_auto_left.${rotate.angle}`;
    case 'auto-right':
      return `a_auto_left.${rotate.angle}`;
    case 'horizontal-flip':
      return `a_hflip.${rotate.angle}`;
    case 'vertical-flip':
      return `a_vflip.${rotate.angle}`;
    case 'ignore-exif-data':
      return `a_ignore.${rotate.angle}`;
  }
};
