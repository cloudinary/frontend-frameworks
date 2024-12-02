import { Effect } from '../transformationTypes/effect';

export const parseEffects = (effects: Effect[]): string => {
  return effects
    .map((effect) => {
      switch (effect.type) {
        case 'sepia':
          return `e_sepia${effect.level ? `:${effect.level}` : ''}`;
        case 'backgroundRemoval':
          return effect.mode === 'fineEdges' ? 'e_background_removal:fineedges_y' : 'e_background_removal';
        case 'fade':
          return `e_fade:${effect.duration}`;
        case 'gamma':
          return `e_gamma:${effect.duration}`;
        case 'grayscale':
          return 'e_grayscale';
        case 'light':
          return `e_light${effect.intensity ? `:shadowintensity_${effect.intensity}` : ''}`;
      }
    })
    .join('');
};
