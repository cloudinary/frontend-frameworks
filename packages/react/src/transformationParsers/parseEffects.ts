import { Effect } from '../types';

export const parseEffects = (effects: Effect[]): string => {
  return effects
    .map((effect) => {
      switch (effect.type) {
        case 'sepia':
          return `e_sepia${effect.level ? `:${effect.level}` : ''}`;
      }
    })
    .join('');
};
