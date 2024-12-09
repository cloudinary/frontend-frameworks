import { RemoveBackground } from '../transformationTypes/removeBackground';

export const parseRemoveBackground = <Value extends RemoveBackground>(removeBackground: Value): Value extends false ? '' : `e_${string}` => {
  if (!removeBackground) {
    return '' as Value extends false ? '' : `e_${string}`;
  }

  return (removeBackground === 'fineEdges' ? 'e_background_removal:fineedges_y' : 'e_background_removal') as Value extends false ? '' : `e_${string}`;
}
