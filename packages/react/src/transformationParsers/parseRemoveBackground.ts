import { ImageTransformationProps } from '../types';
import { parseEffects as ParseEffects } from './parseEffects';

export const parseRemoveBackground = (parseEffects: typeof ParseEffects) => (removeBackground: Exclude<ImageTransformationProps['removeBackground'], undefined>) => {
  if (!removeBackground) {
    return '';
  }

  return parseEffects([
    removeBackground === 'fineEdges' ? {
      type: 'backgroundRemoval',
      mode: 'fineEdges'
    } : { type: 'backgroundRemoval' }])
}
