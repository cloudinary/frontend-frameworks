export type Rotate =
  | number
  | {
      // FIXME supposedly auto modes only work with crop, but there is no error when using it without
      mode: 'vertical-flip' | 'horizontal-flip' | 'auto-left' | 'auto-right' | 'ignore-exif-data';
      angle: number;
    };
