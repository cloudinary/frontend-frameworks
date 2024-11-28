import { Effect } from '../types';

export const parseEffects = (effects: Effect[]): string => {
  return effects
    .map((effect) => {
      switch (effect.type) {
        case 'sepia':
          return `e_sepia${effect.level ? `:${effect.level}` : ''}`;
        case 'backgroundRemoval':
          return effect.mode === 'fineEdges' ? 'e_background_removal:fineedges_y' : 'e_background_removal';
      }
    })
    .join('');
};
