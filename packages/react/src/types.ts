type RequireAtLeastOneProperty<
  Obj extends Record<any, any>,
  Keys extends keyof Obj = keyof Obj
> = Keys extends infer A extends string
  ? {
      [K in Exclude<keyof Obj, A>]?: Obj[K];
    } & { [K in A]: Obj[A] }
  : never;

// type RequireAtLeastTwoProperties<
//   Obj extends Record<any, any>,
//   Keys extends keyof Obj = keyof Obj
// > = Keys extends infer FirstKey extends string
//   ? Exclude<keyof Obj, FirstKey> extends infer LimitedKeys extends string
//     ? LimitedKeys extends infer SecondKey extends string
//       ? {
//           [K in FirstKey | SecondKey]: Obj[K];
//         } & Partial<Obj>
//       : never
//     : never
//   : never;

export type Quality =
  | 'auto'
  | 'auto:good'
  | 'auto:eco'
  | 'auto:low'
  | 'auto:best'
  | 'jpegmini'
  | 'jpegmini:0'
  | 'jpegmini:1'
  | 'jpegmini:2'
  | 'low'
  | 'eco'
  | 'medium'
  | 'good'
  | 'high'
  | 'best';

export type ImageFormat =
  | 'auto'
  | 'jpg'
  | 'png'
  | 'gif'
  | 'webp'
  | 'bmp'
  | 'ico'
  | 'pdf'
  | 'tiff'
  | 'eps'
  | 'jpc'
  | 'jp2'
  | 'psd'
  | 'svg'
  | 'avif'
  | 'heic'
  | 'heif';

export type VideoFormat = 'webm' | 'mp4' | 'mkv' | 'flv' | 'mov' | '3gp' | 'avi' | 'wmv';

export type WidthOption = 'auto' | 'initial-width' | number;

export type HeightOption = 'auto' | 'initial-height' | number;

export type BackgroundOption =
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

export type CloudinaryRemoveBackgroundOption = boolean | 'fineEdges';

type SepiaEffect = {
  type: 'sepia';
  level?: number;
};

type BackgroundRemovalEffect = {
  type: 'backgroundRemoval';
  mode?: 'fineEdges';
};

export type Effect = SepiaEffect | BackgroundRemovalEffect;

// FIXME add custom gravity support
export type Gravity =
  | 'north'
  | 'north_west'
  | 'north_east'
  | 'south'
  | 'south_west'
  | 'south_east'
  | 'west'
  | 'east'
  | 'center'
  | 'face'
  | 'faces'
  | 'auto'
  | 'adv_face'
  | 'adv_faces'
  | 'custom'
  | 'custom:face'
  | 'custom:faces'
  | 'custom:auto'
  | 'custom:adv_face'
  | 'custom:adv_faces'
  | 'ocr_text'
  | 'body'
  | 'liquid'
  | 'auto:subject';

interface AspectRatio {
  aspectRatio: `${number}:${number}` | number;
}

interface SizeOptions {
  width: number;
  height: number;
}

interface ScaleResizeOptions {
  type: 'scale';
  aspectRatio?: AspectRatio;
}

interface FitResizeOptions {
  type: 'fit';
  aspectRatio?: AspectRatio;
}

interface LimitResizeOptions {
  type: 'limit';
  aspectRatio?: AspectRatio;
}

interface MfitResizeOptions {
  type: 'mfit';
  aspectRatio?: AspectRatio;
}

interface FillResizeOptions {
  type: 'fill';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
}

interface LfillResizeOptions {
  type: 'lfill';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
}

interface PadResizeOptions {
  type: 'pad';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: string;
}

interface LpadResizeOptions {
  type: 'lpad';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: string;
}

// FIXME TwoOfTheFollowing type required
interface MpadResizeOptions {
  type: 'mpad';
  gravity?: Gravity;
  background?: string;
}

interface CropResizeOptions {
  type: 'crop';
  gravity?: Gravity;
  x?: number;
  y?: number;
  zoom?: number;
  aspectRatio?: AspectRatio;
}

// FIXME TwoOfTheFollowing type required
interface ThumbResizeOptions {
  type: 'thumb';
  gravity: Gravity;
}

// DONE
type ImaggaCropResizeOptions = {
  type: 'imagga_crop';
  aspectRatio?: AspectRatio;
} & RequireAtLeastOneProperty<SizeOptions>;

// DONE
type ImaggaScaleResizeOptions = {
  type: 'imagga_scale';
} & RequireAtLeastOneProperty<SizeOptions & AspectRatio>;

// FIXME finish the ResizeOption type
export type ResizeOption =
  | ScaleResizeOptions
  | FitResizeOptions
  | LimitResizeOptions
  | MfitResizeOptions
  | FillResizeOptions
  | LfillResizeOptions
  | PadResizeOptions
  | LpadResizeOptions
  | MpadResizeOptions
  | CropResizeOptions
  | ThumbResizeOptions
  | ImaggaCropResizeOptions
  | ImaggaScaleResizeOptions;

type ResizeProps =
  | {
      height?: HeightOption;
      width?: WidthOption;
    }
  | {
      resize?: ResizeOption;
    };

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

export type TransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: CloudinaryRemoveBackgroundOption;
  effects?: Effect[];
  background?: BackgroundOption;
} & ResizeProps;

type TransformationsWithNonStandardHandling = 'removeBackground';

export type ParseTransformationProps = Partial<UnionToIntersection<TransformationProps>>;

export type TransformationPropsKeyToParser = {
  [Key in Exclude<keyof ParseTransformationProps, TransformationsWithNonStandardHandling>]-?: (
    value: Required<ParseTransformationProps>[Key]
  ) => string;
};
