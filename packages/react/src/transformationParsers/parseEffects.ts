import { Effect } from '../transformationTypes/effect';
import { parseRemoveBackground as ParseRemoveBackground } from './parseRemoveBackground';

export const parseEffects = (parseRemoveBackground: typeof ParseRemoveBackground) => (effects: Effect[]): string => {
  return effects
    .map((effect):`e_${string}` => {
      switch (effect.type) {
        case 'sepia':
          return `e_sepia${effect.level ? `:${effect.level}` : ''}`;
        case 'backgroundRemoval':
          return parseRemoveBackground(effect.mode ?? true);
        case 'fade':
          return `e_fade:${effect.duration}`;
        case 'gamma':
          return `e_gamma:${effect.duration}`;
        case 'grayscale':
          return 'e_grayscale';
        case 'light':
          return `e_light${effect.intensity ? `:shadowintensity_${effect.intensity}` : ''}`;
        case 'negate':
          return 'e_negate';
        case 'noise':
          return `e_noise${effect.level ? `:${effect.level}` : ''}`;
        case 'pixelate':
          return `e_pixelate${effect.squareSize ? `:${effect.squareSize}` : ''}`;
        case 'blur':
          return `e_blur${effect.strength ? `:${effect.strength}` : ''}`
        case 'blurFaces':
          return `e_blur_faces${effect.strength ? `:${effect.strength}` : ''}`;
        case 'autoBrightness':
          return `e_auto_brightness${effect.blendPercentage ? `:${effect.blendPercentage}` : ''}`;
        case 'autoColor':
          return `e_auto_color${effect.blendPercentage ? `:${effect.blendPercentage}` : ''}`;
        case 'autoContrast':
          return `e_auto_contrast${effect.blendPercentage ? `:${effect.blendPercentage}` : ''}`;
      }
    })
    .join('/');
};
