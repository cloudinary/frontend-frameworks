import { parseEffects as ParseEffects } from './parseEffects';
import { RemoveBackground } from '../transformationTypes/removeBackground';

export const parseRemoveBackground = (parseEffects: typeof ParseEffects) => (removeBackground: RemoveBackground) => {
  if (!removeBackground) {
    return '';
  }

  return parseEffects([
    removeBackground === 'fineEdges' ? {
      type: 'backgroundRemoval',
      mode: 'fineEdges'
    } : { type: 'backgroundRemoval' }])
}
