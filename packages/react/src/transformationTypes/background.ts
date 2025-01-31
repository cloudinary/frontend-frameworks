export type Background =
  | 'auto'
  | {
      type: 'color';
      color: string;
    }
  | {
      type: 'auto';
      mode?: 'border' | 'predominant' | 'border-contrast' | 'predominant-contrast';
    }
  | {
      type: 'auto';
      mode: 'predominant-gradient' | 'predominant-gradient-contrast' | 'border-gradient' | 'border-gradient-contrast';
      amountOfPredominantColorsToUse?: 2 | 4;
      direction?: 'horizontal' | 'vertical' | 'diagonal-descending' | 'diagonal-ascending';
      borderPalette?: string[];
    }
  | {
      type: 'blurred';
    }
  | {
      type: 'blurred';
      intensity: number;
      brightness?: number;
    }
  | {
      type: 'generativeAiFill';
      prompt?: string;
      seed?: number;
    };
