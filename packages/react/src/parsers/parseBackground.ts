import { BackgroundOption } from '../types';

export const parseBackground = (background: BackgroundOption) => {
  if (background === 'auto') {
    return 'b_auto';
  }

  switch (background.type) {
    case 'auto':
      return 'b_auto';
    case 'color':
      return `b_${background.color}`;
    case 'blurred':
      if ('intensity' in background) {
        return `b_blurred:${background.intensity}${background.brightness ? `:${background.brightness}` : ''}`;
      }
      return 'b_blurred';
    case 'generativeAiFill': {
      return `b_gen_fill${background.prompt ? `:prompt_${background.prompt}` : ''}${background.seed ? `:seed_${background.seed}` : ''}`;
    }
  }
};
