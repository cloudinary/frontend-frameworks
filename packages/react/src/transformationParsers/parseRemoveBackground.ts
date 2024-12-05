import { RemoveBackground } from '../transformationTypes/removeBackground';

export const parseRemoveBackground = (removeBackground: RemoveBackground) => {
  if (!removeBackground) {
    return '';
  }

  return removeBackground === 'fineEdges' ? 'e_background_removal:fineedges_y' : 'e_background_removal';
}
